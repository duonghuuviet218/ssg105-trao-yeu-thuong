# HƯỚNG DẪN TRIỂN KHAI BACKEND (MVP) – TRẠM YÊU THƯƠNG (SSG105)

Tài liệu hướng dẫn chi tiết từng bước dành riêng cho **Backend Developer** dựa trên 3 tài liệu chính:
- `Technical Architecture - Trạm Yêu Thương.docx`
- `Detailed Requirements - Trạm Yêu Thương.docx`
- `Project Structure & Coding Guide - Trạm Yêu Thương.docx`

---

## 1. BẢN CHẤT KIẾN TRÚC BACKEND (MVP)

Theo tài liệu kiến trúc, dự án phục vụ chiến dịch cộng đồng SSG105, ưu tiên **làm nhanh, bảo mật, ổn định và không over-engineer**:
- **Không cần dựng server Node.js / Express riêng** (tránh tốn chi phí thuê VPS, cấu hình Docker, CI/CD phức tạp).
- Sử dụng **Supabase** (BaaS) chạy trên nền tảng **PostgreSQL**:
  - Tự động sinh Data API (RESTful) chuẩn hóa.
  - Sử dụng **Row Level Security (RLS)** làm "tầng ủy quyền & kiểm duyệt".
  - Frontend (`React + Vite`) giao tiếp trực tiếp với Supabase thông qua `@supabase/supabase-js`.
- **Trách nhiệm của Backend Dev trong MVP:**
  1. Thiết kế và khởi tạo Database Schema (4 bảng: `wishes`, `rescue_centers`, `scenarios`, `project_stats`).
  2. Viết và kiểm thử các chính sách bảo mật **Row Level Security (RLS)**.
  3. Cung cấp dữ liệu mẫu (`seed.sql`) cho các tình huống cứu hộ và trạm hỗ trợ.
  4. Cấp thông tin kết nối (`API URL`, `Anon Key`) và TypeScript Database Types cho team Frontend.
  5. Hướng dẫn team quản trị cách kiểm duyệt lời chúc trực tiếp trên Supabase Dashboard.

---

## 2. CÁC BẢNG DỮ LIỆU CẦN TẠO

### Bảng 1: `wishes` (DATA-001)
- **Mục đích:** Lưu lời chúc người dùng gửi cho các bé chó/mèo.
- **Quy tắc cốt lõi:** Mặc định lời chúc mới phải có `status = 'pending'`. Chỉ lời chúc `status = 'approved'` mới được hiển thị công khai ở Trạm Yêu Thương.

| Tên cột | Kiểu dữ liệu | Ràng buộc | Ý nghĩa |
|---|---|---|---|
| `id` | `UUID` | Primary Key, `default gen_random_uuid()` | Định danh lời chúc |
| `animal_type` | `VARCHAR(10)` | NOT NULL, CHECK in `('dog', 'cat')` | Loại động vật chọn |
| `animal_id` | `VARCHAR(50)` | NOT NULL | ID nhân vật (vd: `dog-1`, `cat-2`) |
| `message` | `VARCHAR(200)` | NOT NULL, từ 2 đến 200 ký tự | Nội dung lời chúc |
| `status` | `VARCHAR(20)` | NOT NULL, DEFAULT `'pending'`, CHECK in `('pending', 'approved', 'rejected')` | Trạng thái duyệt |
| `created_at` | `TIMESTAMPTZ` | NOT NULL, DEFAULT `now()` | Thời gian gửi |

### Bảng 2: `rescue_centers` (DATA-002)
- **Mục đích:** Danh bạ các trạm cứu hộ động vật được xác thực theo tỉnh/thành phố.

| Tên cột | Kiểu dữ liệu | Ràng buộc | Ý nghĩa |
|---|---|---|---|
| `id` | `UUID` | Primary Key, `default gen_random_uuid()` | Định danh trạm |
| `name` | `VARCHAR(255)` | NOT NULL | Tên trạm cứu hộ |
| `city` | `VARCHAR(100)` | NOT NULL | Tỉnh / Thành phố (Hà Nội, TP.HCM,...) |
| `district` | `VARCHAR(100)` | NULLABLE | Quận / Huyện |
| `phone` | `VARCHAR(50)` | NULLABLE | SĐT liên hệ khẩn cấp |
| `facebook_url` | `TEXT` | NULLABLE | Link Fanpage |
| `website_url` | `TEXT` | NULLABLE | Link Website |
| `description` | `TEXT` | NULLABLE | Mô tả hoạt động |
| `last_verified_at`| `DATE` | NULLABLE | Ngày gần nhất xác thực thông tin |
| `is_active` | `BOOLEAN` | NOT NULL, DEFAULT `true` | Đang hoạt động hay không |

### Bảng 3: `scenarios` (DATA-003)
- **Mục đích:** Lưu các câu hỏi tình huống tương tác hướng dẫn cách cứu hộ chó mèo bị bỏ rơi.

| Tên cột | Kiểu dữ liệu | Ràng buộc | Ý nghĩa |
|---|---|---|---|
| `id` | `UUID` | Primary Key, `default gen_random_uuid()` | Định danh câu hỏi |
| `title` | `VARCHAR(255)` | NOT NULL | Tiêu đề tình huống |
| `description` | `TEXT` | NOT NULL | Nội dung chi tiết tình huống |
| `options` | `JSONB` | NOT NULL | Danh sách đáp án: `[{"id":"a","text":"..."},...]` |
| `recommended_answer` | `VARCHAR(50)`| NOT NULL | ID đáp án khuyến nghị (`a`, `b`, `c`) |
| `explanation` | `TEXT` | NOT NULL | Lời giải thích khoa học, dễ hiểu |
| `display_order` | `INT` | NOT NULL, DEFAULT 1 | Thứ tự câu hỏi |
| `is_active` | `BOOLEAN` | NOT NULL, DEFAULT `true` | Trạng thái hiển thị |

### Bảng 4: `project_stats` (DATA-004)
- **Mục đích:** Lưu thông số chiến dịch gây quỹ SSG105 (MVP chỉ cần 1 record duy nhất).

| Tên cột | Kiểu dữ liệu | Ràng buộc | Ý nghĩa |
|---|---|---|---|
| `id` | `UUID` | Primary Key | Định danh bản ghi |
| `products_sold` | `INT` | DEFAULT 0 | Số sản phẩm đã bán |
| `revenue` | `NUMERIC(15,2)` | DEFAULT 0 | Doanh thu |
| `fund_raised` | `NUMERIC(15,2)` | DEFAULT 0 | Quỹ đã gây được |
| `amount_donated`| `NUMERIC(15,2)` | DEFAULT 0 | Số tiền đã chuyển đến trạm |
| `participants` | `INT` | DEFAULT 0 | Số người tham gia |
| `updated_at` | `TIMESTAMPTZ` | DEFAULT `now()` | Lần cập nhật cuối |

---

## 3. CÁC BƯỚC THỰC HIỆN CHI TIẾT (STEP-BY-STEP)

### BƯỚC 1: Tạo dự án trên Supabase (5 phút)
1. Đăng nhập [https://supabase.com](https://supabase.com).
2. Bấm **"New Project"**, chọn Organization của bạn.
3. Điền thông tin:
   - **Name:** `ssg105-tram-yeu-thuong`
   - **Database Password:** Tự đặt mật khẩu an toàn (lưu lại vào password manager).
   - **Region:** Chọn `Southeast Asia (Singapore)` để có tốc độ truy cập nhanh nhất tại Việt Nam.
4. Chờ 1–2 phút để Supabase khởi tạo database PostgreSQL.

---

### BƯỚC 2: Chạy Migrations và RLS Policies (1 chạm)
1. Trong menu bên trái của Supabase Dashboard, bấm vào biểu tượng **SQL Editor** (icon `>_`).
2. Bấm **"New query"**.
3. Mở file [001_initial_schema.sql](file:///d:/SSG/supabase/migrations/001_initial_schema.sql) và [002_enable_rls_and_policies.sql](file:///d:/SSG/supabase/migrations/002_enable_rls_and_policies.sql), copy toàn bộ nội dung dán vào SQL Editor.
4. Bấm **"Run"** (hoặc `Ctrl + Enter`).
5. Kết quả báo `Success. No rows returned` nghĩa là 4 bảng và các chính sách bảo mật RLS đã được tạo thành công!

---

### BƯỚC 3: Nạp dữ liệu mẫu (Seed Data)
1. Trong **SQL Editor**, bấm **"New query"**.
2. Mở file [seed.sql](file:///d:/SSG/supabase/seed.sql), copy nội dung dán vào.
3. Bấm **"Run"**.
4. Vào menu **Table Editor** (icon bảng tính), bấm vào từng bảng `wishes`, `rescue_centers`, `scenarios`, `project_stats` để kiểm tra dữ liệu đã hiện lên đầy đủ.

---

### BƯỚC 4: Lấy thông tin API gửi cho Frontend Developer
1. Trong Supabase Dashboard, bấm vào biểu tượng **Project Settings** (bánh răng ở góc dưới bên trái).
2. Chọn mục **API** (hoặc Data API).
3. Copy 2 giá trị sau:
   - **Project URL:** Dạng `https://abcdefghijklm.supabase.co`
   - **Project API Keys -> `anon` / `public`:** Chuỗi token JWT dài (đây là publishable key an toàn cho trình duyệt).
   > **CẢNH BÁO BẢO MẬT (SEC-005):** Tuyệt đối KHÔNG gửi key `service_role` (secret) cho Frontend.
4. Gửi 2 giá trị này cho Frontend dev để điền vào file `.env.local`:
   ```bash
   VITE_SUPABASE_URL=https://abcdefghijklm.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=eyJh......
   ```

---

## 4. HƯỚNG DẪN QUẢN TRỊ & KIỂM DUYỆT (ADMIN WORKFLOW)

Trong giai đoạn MVP, nhóm chưa cần code Admin Dashboard riêng để tiết kiệm thời gian. Bạn và team quản trị nội dung sẽ kiểm duyệt trực tiếp trên **Supabase Dashboard**:

1. Mở menu **Table Editor** -> chọn bảng **`wishes`**.
2. Bấm **Filter** -> thêm bộ lọc: `status` `eq` `'pending'`.
3. Đọc nội dung cột `message`:
   - Nếu lời chúc tích cực, phù hợp thuần phong mỹ tục: Click đúp vào ô `pending`, đổi thành **`approved`**. Ngay lập tức lời chúc sẽ xuất hiện trên màn hình Trạm Yêu Thương của người dùng!
   - Nếu lời chúc mang tính spam, thô tục, quảng cáo: Đổi thành **`rejected`**.

---

## 5. MẪU TRUY VẤN (SERVICES) HỖ TRỢ FRONTEND

Backend cung cấp sẵn file contract TypeScript [types_database.ts](file:///d:/SSG/supabase/types_database.ts). 
Dưới đây là các hàm query mẫu bằng `@supabase/supabase-js` để Frontend dev chỉ việc copy vào các file service:

### 1. `wishes.service.ts`
```typescript
import { supabase } from '@/lib/supabase';
import { Wish, CreateWishInput } from '@/supabase/types_database';

// 1. Gửi lời chúc mới (Mặc định RLS ép status = 'pending')
export async function createWish(input: CreateWishInput) {
  const { data, error } = await supabase
    .from('wishes')
    .insert([
      {
        animal_type: input.animal_type,
        animal_id: input.animal_id,
        message: input.message.trim(),
        status: 'pending',
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data as Wish;
}

// 2. Lấy danh sách lời chúc đã duyệt cho Trạm Yêu Thương (giới hạn 30 câu mới nhất)
export async function getApprovedWishes(limit = 30) {
  const { data, error } = await supabase
    .from('wishes')
    .select('*')
    .eq('status', 'approved')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data as Wish[];
}
```

### 2. `scenarios.service.ts`
```typescript
import { supabase } from '@/lib/supabase';
import { Scenario } from '@/supabase/types_database';

export async function getActiveScenarios() {
  const { data, error } = await supabase
    .from('scenarios')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  if (error) throw error;
  return data as Scenario[];
}
```

### 3. `rescueCenters.service.ts`
```typescript
import { supabase } from '@/lib/supabase';
import { RescueCenter } from '@/supabase/types_database';

export async function getRescueCenters(city?: string) {
  let query = supabase
    .from('rescue_centers')
    .select('*')
    .eq('is_active', true)
    .order('city', { ascending: true });

  if (city && city.trim() !== '') {
    query = query.eq('city', city.trim());
  }

  const { data, error } = await query;
  if (error) throw error;
  return data as RescueCenter[];
}
```

### 4. `projectStats.service.ts`
```typescript
import { supabase } from '@/lib/supabase';
import { ProjectStats } from '@/supabase/types_database';

export async function getProjectStats() {
  const { data, error } = await supabase
    .from('project_stats')
    .select('*')
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  return data as ProjectStats | null;
}
```
