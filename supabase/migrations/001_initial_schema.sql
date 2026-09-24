-- ==============================================================================
-- MIGRATION: 001_initial_schema.sql
-- PROJECT: Trạm Yêu Thương - SSG105
-- DESCRIPTION: Khởi tạo các bảng dữ liệu cho phiên bản MVP:
--              1. wishes (lưu lời chúc gửi tới các bé)
--              2. rescue_centers (danh sách trạm/đội cứu hộ)
--              3. scenarios (tình huống trắc nghiệm cứu hộ thực tế)
--              4. project_stats (tiến độ chiến dịch gây quỹ SSG105)
-- ==============================================================================

-- Bật extension pgcrypto (đã có sẵn trên Supabase) để dùng gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ------------------------------------------------------------------------------
-- 1. BẢNG WISHES (DATA-001)
-- Lưu lời chúc của người dùng gửi cho chó/mèo.
-- Mặc định status là 'pending' để kiểm duyệt, chỉ 'approved' mới hiển thị công khai.
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.wishes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    animal_type VARCHAR(10) NOT NULL CHECK (animal_type IN ('dog', 'cat')),
    animal_id VARCHAR(50) NOT NULL,
    message VARCHAR(200) NOT NULL CHECK (char_length(trim(message)) >= 2 AND char_length(trim(message)) <= 200),
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index phục vụ query lấy danh sách lời chúc đã duyệt ở Trạm Yêu Thương (FR-030)
CREATE INDEX IF NOT EXISTS idx_wishes_status_created_at ON public.wishes (status, created_at DESC);

-- ------------------------------------------------------------------------------
-- 2. BẢNG RESCUE_CENTERS (DATA-002)
-- Lưu thông tin danh bạ các trạm cứu hộ động vật được xác minh.
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.rescue_centers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    district VARCHAR(100),
    phone VARCHAR(50),
    facebook_url TEXT,
    website_url TEXT,
    description TEXT,
    last_verified_at DATE,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index phục vụ query filter theo khu vực (FR-051)
CREATE INDEX IF NOT EXISTS idx_rescue_centers_city_active ON public.rescue_centers (city, is_active);

-- ------------------------------------------------------------------------------
-- 3. BẢNG SCENARIOS (DATA-003)
-- Lưu các tình huống giáo dục xử lý khi gặp chó mèo cần cứu trợ.
-- Options lưu dưới dạng jsonb: [{"id": "a", "text": "..."}, {"id": "b", "text": "..."}]
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.scenarios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    options JSONB NOT NULL,
    recommended_answer VARCHAR(50) NOT NULL,
    explanation TEXT NOT NULL,
    display_order INT NOT NULL DEFAULT 1,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index phục vụ query tình huống đang active theo thứ tự hiển thị (FR-040, FR-041)
CREATE INDEX IF NOT EXISTS idx_scenarios_order ON public.scenarios (display_order) WHERE is_active = true;

-- ------------------------------------------------------------------------------
-- 4. BẢNG PROJECT_STATS (DATA-004)
-- Lưu số liệu tiến độ của chiến dịch SSG105 (chỉ cần 1 bản ghi active cho MVP).
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.project_stats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    products_sold INT DEFAULT 0 CHECK (products_sold >= 0),
    revenue NUMERIC(15, 2) DEFAULT 0 CHECK (revenue >= 0),
    fund_raised NUMERIC(15, 2) DEFAULT 0 CHECK (fund_raised >= 0),
    amount_donated NUMERIC(15, 2) DEFAULT 0 CHECK (amount_donated >= 0),
    participants INT DEFAULT 0 CHECK (participants >= 0),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
