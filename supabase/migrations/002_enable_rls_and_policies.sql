-- ==============================================================================
-- MIGRATION: 002_enable_rls_and_policies.sql
-- PROJECT: Trạm Yêu Thương - SSG105
-- DESCRIPTION: Thiết lập Row Level Security (RLS) và Policies bảo mật (SEC-001 -> SEC-004)
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. BẬT RLS CHO TẤT CẢ CÁC BẢNG (SEC-001)
-- ------------------------------------------------------------------------------
ALTER TABLE public.wishes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rescue_centers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scenarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_stats ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------------------------
-- 2. POLICIES CHO BẢNG WISHES (SEC-002, SEC-003, SEC-004)
-- ------------------------------------------------------------------------------

-- Public / Anonymous chỉ được phép xem các lời chúc đã được Admin duyệt (approved)
CREATE POLICY "Public can view approved wishes"
    ON public.wishes
    FOR SELECT
    USING (status = 'approved');

-- Anonymous visitor được phép gửi lời chúc mới, nhưng BẮT BUỘC status phải là 'pending'
-- và nội dung phải thỏa mãn độ dài 2-200 ký tự (chống spam/tự approve)
CREATE POLICY "Anonymous can insert pending wishes"
    ON public.wishes
    FOR INSERT
    WITH CHECK (
        status = 'pending'
        AND char_length(trim(message)) >= 2
        AND char_length(trim(message)) <= 200
        AND animal_type IN ('dog', 'cat')
    );

-- Không tạo policy UPDATE/DELETE cho anon => Mặc định Supabase sẽ CHẶN toàn bộ
-- thao tác sửa hoặc xóa lời chúc từ phía client.

-- ------------------------------------------------------------------------------
-- 3. POLICIES CHO BẢNG RESCUE_CENTERS (SEC-002, SEC-004)
-- ------------------------------------------------------------------------------

-- Public được xem danh bạ cứu hộ đang hoạt động (is_active = true)
CREATE POLICY "Public can view active rescue centers"
    ON public.rescue_centers
    FOR SELECT
    USING (is_active = true);

-- ------------------------------------------------------------------------------
-- 4. POLICIES CHO BẢNG SCENARIOS (SEC-002, SEC-004)
-- ------------------------------------------------------------------------------

-- Public được xem các tình huống cứu hộ đang active
CREATE POLICY "Public can view active scenarios"
    ON public.scenarios
    FOR SELECT
    USING (is_active = true);

-- ------------------------------------------------------------------------------
-- 5. POLICIES CHO BẢNG PROJECT_STATS (SEC-002, SEC-004)
-- ------------------------------------------------------------------------------

-- Public được xem thông tin chỉ số tiến độ chiến dịch
CREATE POLICY "Public can view project stats"
    ON public.project_stats
    FOR SELECT
    USING (true);
