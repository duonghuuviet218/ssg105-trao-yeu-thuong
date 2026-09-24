-- ==============================================================================
-- SEED DATA: seed.sql
-- PROJECT: Trạm Yêu Thương - SSG105
-- DESCRIPTION: Dữ liệu mẫu ban đầu phục vụ phát triển và kiểm thử (DB-002):
--              1. Lời chúc mẫu đã duyệt (wishes approved)
--              2. Tình huống giáo dục cứu hộ (scenarios)
--              3. Danh bạ trạm cứu hộ (rescue_centers)
--              4. Số liệu chiến dịch gây quỹ (project_stats)
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. LỜI CHÚC MẪU ĐÃ DUYỆT (WISHES - STATUS = 'APPROVED')
-- Phục vụ màn hình Trạm Yêu Thương (FR-030, FR-031)
-- ------------------------------------------------------------------------------
INSERT INTO public.wishes (animal_type, animal_id, message, status, created_at) VALUES
('dog', 'dog-1', 'Mong em sớm tìm được một người chủ thật ấm áp và yêu thương em suốt đời!', 'approved', now() - INTERVAL '2 days'),
('cat', 'cat-1', 'Chúc bé mèo luôn no bụng, không còn phải trốn chạy những ngày mưa lạnh nữa nha.', 'approved', now() - INTERVAL '1 day'),
('dog', 'dog-2', 'Cố gắng lên nhé bạn nhỏ, trạm cứu hộ sẽ chăm sóc bạn thật chu đáo!', 'approved', now() - INTERVAL '12 hours'),
('cat', 'cat-2', 'Gửi nghìn cái ôm ấm áp đến tất cả các bé mèo lang thang.', 'approved', now() - INTERVAL '6 hours'),
('dog', 'dog-3', 'Hãy luôn ngoan ngoãn và kiên cường chờ người đón em về nhà nhé!', 'approved', now() - INTERVAL '1 hour');

-- ------------------------------------------------------------------------------
-- 2. TÌNH HUỐNG GIÁO DỤC CỨU HỘ (SCENARIOS - FR-040 -> FR-045)
-- 4 tình huống thực tế giáo dục cộng đồng cách xử lý đúng đắn
-- ------------------------------------------------------------------------------
INSERT INTO public.scenarios (title, description, options, recommended_answer, explanation, display_order, is_active) VALUES
(
    'Gặp chó mèo con bị bỏ rơi trong thùng giấy',
    'Trên đường đi học về, bạn thấy một thùng carton bên lề đường, bên trong có 3 bé mèo con mới mở mắt đang run rẩy vì trời mưa lạnh. Bạn nên ưu tiên làm gì trước tiên?',
    '[
        {"id": "a", "text": "Mang ngay về nhà tắm nước ấm với sữa tắm thật sạch"},
        {"id": "b", "text": "Ủ ấm bằng khăn/áo khô mềm, đặt nơi kín gió và kiểm tra thân nhiệt"},
        {"id": "c", "text": "Cho uống thật nhiều sữa tươi có đường để hồi sức"}
    ]'::jsonb,
    'b',
    'Chó mèo con sơ sinh rất dễ tử vong do hạ thân nhiệt. Ưu tiên số 1 là ủ ấm nhẹ nhàng. Tuyệt đối không tắm ngay và không cho uống sữa bò/sữa có đường vì hệ tiêu hóa con non không tiêu hóa được lactose, dễ gây tiêu chảy cấp.',
    1,
    true
),
(
    'Bé mèo bị mắc kẹt và đang hoảng loạn',
    'Bạn phát hiện một bé mèo bị kẹt ở hốc tường gầm cầu thang, khi bạn đưa tay lại gần thì bé gầm gừ, xù lông và có dấu hiệu sẵn sàng cào cắn. Hành động an toàn nhất là gì?',
    '[
        {"id": "a", "text": "Dùng tay không nhanh chóng túm chặt gáy bé kéo mạnh ra"},
        {"id": "b", "text": "Dùng chổi hoặc gậy xua đuổi thật mạnh để bé tự nhảy ra"},
        {"id": "c", "text": "Dùng khăn dày hoặc áo khoác trùm nhẹ che mắt và quấn người để giữ an toàn"}
    ]'::jsonb,
    'c',
    'Động vật khi bị thương hoặc mắc kẹt thường phản xạ cắn cào để tự vệ vì quá sợ hãi. Dùng khăn dày trùm nhẹ giúp bé tối mắt bớt hoảng loạn, đồng thời bảo vệ bạn khỏi vết thương cắn/cào trước khi giải cứu.',
    2,
    true
),
(
    'Chó gặp nạn có dấu hiệu gãy xương bên đường',
    'Một chú chó lang thang vừa bị va quẹt xe máy, nằm im rên rỉ bên lề đường, chân sau có dấu hiệu gãy và sưng to. Bạn nên hỗ trợ như thế nào?',
    '[
        {"id": "a", "text": "Buộc mõm an toàn bằng dải vải mềm, dùng tấm bìa cứng làm cáng nâng bé"},
        {"id": "b", "text": "Bế xốc nách chú chó lên xe máy chạy thật nhanh"},
        {"id": "c", "text": "Cho ăn thức ăn và nước uống thật nhiều ngay tại chỗ"}
    ]'::jsonb,
    'a',
    'Cơn đau dữ dội có thể khiến chó hiền cắn theo bản năng. Cần cố định mõm nhẹ nhàng bằng vải mềm, đặt lên mặt phẳng cứng (bìa carton) để tránh tổn thương thêm cột sống hoặc xương gãy trong lúc vận chuyển tới thú y.',
    3,
    true
),
(
    'Chuẩn bị thông tin khi liên hệ trạm cứu hộ',
    'Khi cần gọi điện hỗ trợ khẩn cấp cho một ca động vật gặp nạn, bạn cần chuẩn bị những thông tin gì để trạm cứu hộ hỗ trợ nhanh nhất?',
    '[
        {"id": "a", "text": "Chỉ cần nói có chó mèo bị thương rồi ngắt máy chờ họ tới"},
        {"id": "b", "text": "Ghi nhận vị trí chính xác, quay video/ảnh rõ tình trạng và để lại SĐT của bạn"},
        {"id": "c", "text": "Đăng bài lên Facebook yêu cầu trạm cứu hộ phải đến ngay lập tức"}
    ]'::jsonb,
    'b',
    'Các trạm cứu hộ thường quá tải nhân lực. Định vị chính xác kèm hình ảnh/clip thực tế giúp họ đánh giá mức độ khẩn cấp, mang đúng dụng cụ y tế và tiết kiệm thời gian tìm kiếm.',
    4,
    true
);

-- ------------------------------------------------------------------------------
-- 3. DANH BẠ TRẠM CỨU HỘ ĐỘNG VẬT (RESCUE_CENTERS - FR-050 -> FR-053)
-- Thông tin mẫu các trạm tại Hà Nội, TP.HCM, Đà Nẵng
-- ------------------------------------------------------------------------------
INSERT INTO public.rescue_centers (name, city, district, phone, facebook_url, website_url, description, last_verified_at, is_active) VALUES
(
    'Trạm Cứu Hộ Động Vật Nông Nghiệp Hà Nội (NAR)',
    'Hà Nội',
    'Gia Lâm',
    '0834567890',
    'https://www.facebook.com/nongnghiepanimalrescue',
    'https://nar.vn',
    'Nhóm tình nguyện viên sinh viên và bác sĩ thú y hỗ trợ sơ cứu, chăm sóc chó mèo bị bỏ rơi, tai nạn tại khu vực Hà Nội.',
    '2026-09-01',
    true
),
(
    'Hanoi Pet Rescue (HPR)',
    'Hà Nội',
    'Ba Đình',
    '0912345678',
    'https://www.facebook.com/hanoipetrescue',
    NULL,
    'Tổ chức tình nguyện cứu hộ, điều trị và tìm mái ấm mới cho chó mèo lang thang tại Hà Nội.',
    '2026-08-20',
    true
),
(
    'Sân Nhà Nhiều Chó',
    'Hà Nội',
    'Đông Anh',
    '0908123456',
    'https://www.facebook.com/sannhanhieucho',
    NULL,
    'Mái ấm bảo trợ và nuôi dưỡng lâu dài các bé chó mèo già yếu, khuyết tật hoặc bị bỏ rơi.',
    '2026-09-10',
    true
),
(
    'Nhóm Cứu Trợ Động Vật SAR',
    'TP. Hồ Chí Minh',
    'Quận 7',
    '0987654321',
    'https://www.facebook.com/sarvietnam',
    'https://sar.vn',
    'Đội cứu hộ tình nguyện tiếp nhận các ca động vật gặp tai nạn khẩn cấp, bệnh nặng trong nội thành TP.HCM.',
    '2026-09-05',
    true
),
(
    'Mái Ấm Mèo Cát Mộc',
    'TP. Hồ Chí Minh',
    'Bình Thạnh',
    '0933112233',
    'https://www.facebook.com/catmocrescue',
    NULL,
    'Không gian cưu mang, điều trị và ghép chủ nuôi mới cho các bé mèo mồ côi, mèo bệnh.',
    '2026-08-25',
    true
),
(
    'Danang Pet Rescue',
    'Đà Nẵng',
    'Hải Châu',
    '0944556677',
    'https://www.facebook.com/danangpetrescue',
    NULL,
    'Mạng lưới tình nguyện viên cứu trợ chó mèo lang thang, kết nối y tế thú y tại Đà Nẵng và lân cận.',
    '2026-09-12',
    true
);

-- ------------------------------------------------------------------------------
-- 4. TIẾN ĐỘ CHIẾN DỊCH GÂY QUỸ SSG105 (PROJECT_STATS - FR-060, FR-061)
-- 1 bản ghi duy nhất cho chiến dịch MVP
-- ------------------------------------------------------------------------------
INSERT INTO public.project_stats (products_sold, revenue, fund_raised, amount_donated, participants, updated_at) VALUES
(
    148,
    7400000,
    3700000,
    2000000,
    185,
    now()
);
