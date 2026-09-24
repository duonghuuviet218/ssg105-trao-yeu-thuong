-- ==============================================================================
-- MIGRATION: 003_auto_approve_wishes.sql
-- PROJECT: Trạm Yêu Thương - SSG105
-- DESCRIPTION: Bỏ cơ chế duyệt thủ công: Lời chúc gửi lên sẽ tự động 'approved'
--              và hiển thị ngay lập tức lên Trạm Yêu Thương.
-- ==============================================================================

-- 1. Đổi giá trị mặc định của cột status sang 'approved'
ALTER TABLE public.wishes 
    ALTER COLUMN status SET DEFAULT 'approved';

-- 2. Cập nhật các lời chúc đang 'pending' trước đó thành 'approved'
UPDATE public.wishes 
SET status = 'approved' 
WHERE status = 'pending';

-- 3. Cập nhật lại RLS Policy INSERT cho bảng wishes:
-- Cho phép khách gửi lời chúc mới với status = 'approved'
DROP POLICY IF EXISTS "Anonymous can insert pending wishes" ON public.wishes;
DROP POLICY IF EXISTS "Anonymous can insert approved wishes" ON public.wishes;

CREATE POLICY "Anonymous can insert approved wishes"
    ON public.wishes
    FOR INSERT
    WITH CHECK (
        status = 'approved'
        AND char_length(trim(message)) >= 2
        AND char_length(trim(message)) <= 200
        AND animal_type IN ('dog', 'cat')
    );
