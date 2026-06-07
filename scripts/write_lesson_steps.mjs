import fs from 'fs';
import path from 'path';

const filePath = 'c:/Users/USER/Downloads/Portfolio hsb 1/src/data/lesson-steps.ts';

const fileContent = `/** Quy trình chi tiết từng bài — dùng cho accordion & điều hướng bước */
export interface LessonStep {
  text: string;
}

export const LESSON_STEPS: LessonStep[][] = [
  // ─── BÀI 1: Thao tác cơ bản với tệp tin và thư mục ───
  [
    { text: '1. Mở File Explorer: Nhấn tổ hợp phím Windows + E hoặc nhấp vào biểu tượng thư mục màu vàng trên thanh tác vụ.' },
    { text: '2. Truy cập ổ đĩa/thư mục: Ở cột bên trái, nhấp vào This PC, sau đó nhấp đúp vào một ổ đĩa không phải ổ hệ thống (ví dụ: ổ D: hoặc E:). Nếu chỉ có ổ C:, hãy vào thư mục Documents.' },
    { text: '3. Tạo thư mục mới: Nhấp chuột phải vào một khoảng trống -> chọn New -> Folder. Đặt tên thư mục là ThucHanh_DaoThiKhanhHuyen. Nhấn Enter.' },
    { text: '4. Vào thư mục vừa tạo: Nhấp đúp vào thư mục ThucHanh_DaoThiKhanhHuyen.' },
    { text: '5. Tạo tệp tin văn bản: Nhấp chuột phải vào khoảng trống -> New -> Text Document. Đặt tên là GhiChu.txt. Nhấn Enter.' },
    { text: '6. Đổi tên tệp tin: Nhấp chuột phải vào tệp GhiChu.txt -> chọn Rename. Đổi tên thành GhiChuQuanTrong.txt. Nhấn Enter.' },
    { text: '7. Tạo thư mục con: Trong thư mục ThucHanh_DaoThiKhanhHuyen, nhấp chuột phải -> New -> Folder. Đặt tên là TaiLieu.' },
    { text: '8. Sao chép tệp tin (Copy & Paste): Nhấp chuột phải vào tệp GhiChuQuanTrong.txt -> chọn Copy (hoặc chọn tệp rồi nhấn Ctrl + C). Nhấp đúp vào thư mục TaiLieu, nhấp chuột phải vào khoảng trống bên trong -> chọn Paste (hoặc nhấn Ctrl + V). Bây giờ bạn có một bản sao của tệp trong thư mục TaiLieu.' },
    { text: '9. Di chuyển tệp tin (Cut & Paste): Quay lại thư mục ThucHanh_DaoThiKhanhHuyen. Tạo một tệp mới tên là DiChuyen.txt. Nhấp chuột phải vào tệp DiChuyen.txt -> chọn Cut (hoặc chọn tệp rồi nhấn Ctrl + X). Nhấp đúp vào thư mục TaiLieu, nhấp chuột phải vào khoảng trống -> chọn Paste (hoặc nhấn Ctrl + V). Tệp gốc đã biến mất khỏi vị trí cũ và chỉ còn ở vị trí mới.' },
    { text: '10. Xóa tệp tin: Trong thư mục TaiLieu, nhấp chuột phải vào tệp GhiChuQuanTrong.txt -> chọn Delete. Tệp sẽ được chuyển vào Thùng rác (Recycle Bin).' },
    { text: '11. Xóa vĩnh viễn: Chọn tệp DiChuyen.txt, nhấn giữ phím Shift và nhấn phím Delete. Một cảnh báo sẽ hiện ra. Nếu đồng ý, tệp sẽ bị xóa vĩnh viễn mà không qua Thùng rác.' },
    { text: '12. Khôi phục từ Thùng rác (Tùy chọn): Tìm biểu tượng Recycle Bin trên màn hình nền, nhấp đúp để mở. Tìm tệp GhiChuQuanTrong.txt đã xóa, nhấp chuột phải vào nó và chọn Restore. Tệp sẽ quay trở lại vị trí ban đầu.' }
  ],

  // ─── BÀI 2: Đánh giá tài liệu nghiên cứu - AI trong Bảo trì dự đoán ───
  [
    { text: '1. Mở đầu và Giới thiệu chủ đề: Giới thiệu vai trò sống còn của sự ổn định dây chuyền sản xuất và xu hướng chuyển dịch sang Bảo trì dự đoán (PdM) sử dụng AI & Machine Learning để phân tích dữ liệu cảm biến (nhiệt độ, rung động).' },
    { text: '2. Phương pháp thu thập thông tin: Xây dựng truy vấn chuyên sâu trên các cơ sở dữ liệu học thuật uy tín (Google Scholar, ScienceDirect, IEEE Xplore) và thu thập tài liệu từ sách chuyên khảo, báo cáo thực tiễn (McKinsey, Siemens).' },
    { text: '3. Tiêu chí đánh giá độ tin cậy: Áp dụng hệ thống chấm điểm độ tin cậy dựa trên 5 tiêu chí: Uy tín tác giả, Đơn vị xuất bản, Phương pháp nghiên cứu, Số lần trích dẫn và Tính cập nhật (thời gian 2017-2024).' },
    { text: '4. Bảng tổng hợp và đánh giá các nguồn thông tin: Thực hiện đánh giá chi tiết 11 nguồn tài liệu (gồm các bài báo Q1/Q2 từ Elsevier/IEEE và sách chuyên khảo), chấm điểm và phân loại khoa học.' },
    { text: '5. Kết luận & Tổng hợp xu hướng: Rút ra nhận định về sự bùng nổ của các mô hình Deep Learning trong PdM, sự cần thiết của việc kết hợp nghiên cứu hàn lâm với whitepaper thực tiễn để tối ưu hóa ứng dụng.' }
  ],

  // ─── BÀI 3: Kỹ năng Prompt Engineering - Blockchain ───
  [
    { text: '1. Xác định mục tiêu và tác vụ: Lựa chọn tác vụ giải thích khái niệm phức tạp "Công nghệ Blockchain" cho học sinh cấp 3 để so sánh hiệu quả viết prompt từ cơ bản đến nâng cao.' },
    { text: '2. Thiết kế các phiên bản prompt: Soạn thảo 3 phiên bản: Prompt cơ bản (Zero-shot), Prompt cải tiến (thêm bối cảnh và cấu trúc rõ ràng), và Prompt nâng cao (áp dụng Role Prompting, Few-shot và Chain-of-Thought).' },
    { text: '3. Thử nghiệm và so sánh kết quả: Cho chạy thử trên Google Gemini và đánh giá chất lượng phản hồi: Basic (quá học thuật, khó hiểu) -> Improved (bố cục rõ ràng, dễ đọc) -> Advanced (sử dụng ẩn dụ cuốn sổ tay lớp học sinh động, xuất sắc).' },
    { text: '4. Phân tích lý do hiệu quả: Phân tích các yếu tố giúp prompt nâng cao vượt trội như thiết lập vai trò giáo sư công nghệ, cung cấp ví dụ mẫu giải thích Điện toán đám mây (Few-shot) và chỉ dẫn luồng tư duy (CoT).' },
    { text: '5. Tổng hợp nguyên tắc viết prompt hiệu quả: Đúc kết các mẹo vàng như cung cấp nhân dạng (Role), xác định rõ đối tượng, đưa ví dụ (Few-shot), chia nhỏ bước tư duy (CoT) và định dạng đầu ra rõ ràng.' }
  ],

  // ─── BÀI 4: Thực hành công cụ hợp tác trực tuyến - Hệ thống Thư viện Mini ───
  [
    { text: '1. Lựa chọn và thiết lập công cụ: Thiết lập hệ thống 4 nhóm công cụ đồng bộ: Trello (quản lý Kanban), Google Docs (soạn thảo realtime), Google Drive (lưu trữ đa cấp), và MS Teams/Zalo (giao tiếp).' },
    { text: '2. Cá nhân hóa và tối ưu không gian: Hoàn thiện hồ sơ cá nhân trên các nền tảng và thiết lập hệ thống nhãn màu sắc trực quan (Tags/Labels) trên Trello để phân biệt trạng thái công việc.' },
    { text: '3. Quản lý tác vụ và tương tác cá nhân: Phụ trách vẽ biểu đồ Use Case và viết đặc tả yêu cầu, cập nhật tiến độ liên tục trên Trello (chuyển thẻ sang In Review, đính kèm link) và tích cực tương tác hỗ trợ nhóm.' },
    { text: '4. Quản lý tài nguyên và tệp tin: Thiết lập cấu trúc thư mục Google Drive đa tầng hợp lý và thống nhất quy chuẩn đặt tên tệp tin nghiêm ngặt để quản lý phiên bản (Version Control), phân quyền Editor/Viewer.' },
    { text: '5. Đánh giá, thách thức và giải pháp: Phân tích và giải quyết 3 thách thức thực tế gồm Xung đột dữ liệu khi sửa chung Docs (giải quyết bằng Suggesting/Comment), Quá tải thông báo (Mute channel, tag tên), và Theo dõi luồng phụ thuộc công việc (link thẻ Trello).' }
  ],

  // ─── BÀI 5: Sáng tạo nội dung số với AI - Sống Xanh ───
  [
    { text: '1. Xác định đề tài chiến dịch: Lên ý tưởng chiến dịch "Sống Xanh trong Kỷ nguyên Số" nhằm nâng cao nhận thức về dấu chân carbon của AI và rác thải công nghệ (e-waste).' },
    { text: '2. Lên dàn ý bài viết với Google Gemini: Soạn prompt CLEAR/CRAC yêu cầu Gemini lên dàn ý chi tiết bài viết, sau đó chỉnh sửa, kiểm chứng loại bỏ số liệu ảo và chèn tư duy phản biện cá nhân.' },
    { text: '3. Định hình câu chuyện & Tạo ảnh minh họa AI: Viết bài blog bằng phong cách storytelling gần gũi và sử dụng công cụ Nano Banana để thiết kế bức ảnh nghệ thuật "Futuristic workspace hài hòa thiên nhiên".' },
    { text: '4. Thiết kế Infographic trên Canva: Khởi tạo tệp thiết kế Infographic có bố cục dọc tối ưu trên Canva và áp dụng quy tắc phối màu chủ đạo xanh lá đậm - trắng.' },
    { text: '5. Tối ưu hóa tương phản & Trọng lượng thị giác: Điều chỉnh độ tương phản chữ hoa nổi bật trên các khối nền, phân chia bố cục 3 phần cân đối: Số liệu carbon AI -> Thực trạng e-waste VN -> Địa điểm thu gom rác điện tử miễn phí.' },
    { text: '6. Hoàn thiện và xuất bản sản phẩm số: Lồng ghép địa chỉ thu gom thực tế ở Hà Nội & TP.HCM, tải xuống Infographic chất lượng cao (PNG) từ Canva và phối hợp với bài viết blog để đăng tải truyền thông.' }
  ],

  // ─── BÀI 6: Sử dụng AI có trách nhiệm và đạo đức - Quick Sort ───
  [
    { text: '1. Nghiên cứu chính sách sử dụng AI của Đại học: Tìm hiểu quy định của VNU về sử dụng GenAI trong học tập (khuyến khích hỗ trợ gỡ lỗi code/lên ý tưởng, nghiêm cấm sao chép >30% bài nộp, bắt buộc trích dẫn).' },
    { text: '2. Thực hiện nhiệm vụ học tập với sự hỗ trợ của AI: Soạn prompt yêu cầu ChatGPT lập dàn ý thuyết trình Quick Sort trong C++ gồm 5 slide, tiến hành đánh giá logic, bổ sung thêm các cách chọn Pivot khác và viết code thực tế đối chiếu.' },
    { text: '3. Minh bạch sử dụng và trích dẫn AI: Trích dẫn rõ ràng việc sử dụng ChatGPT (phiên bản GPT-4o) kèm câu lệnh prompt và ngày truy cập theo đúng chuẩn học thuật trong tài liệu báo cáo.' },
    { text: '4. Phân tích các vấn đề đạo đức khi sử dụng AI: Nhận diện ranh giới giữa hỗ trợ hợp lý (giải thích lỗi code, tối ưu vòng lặp) và gian lận (sao chép cả đoạn code nộp mà không hiểu thuật toán), phân tích vấn đề bản quyền và bảo mật.' },
    { text: '5. Bộ 5 nguyên tắc cá nhân về sử dụng AI: Đúc kết bộ nguyên tắc vàng: Tư duy độc lập, Hoài nghi học thuật (kiểm chứng lỗi ảo giác), Minh bạch khai báo, Bảo mật dữ liệu, và Làm chủ bản thảo cuối cùng (Human-in-the-loop).' }
  ],

  // ─── BÀI 7: Báo cáo tổng quan tài liệu khoa học bằng công cụ AI - Graphene Anode ───
  [
    { text: '1. Chủ đề và Câu hỏi nghiên cứu: Xác định đề tài nghiên cứu ứng dụng cấu trúc Graphene để nâng cao hiệu suất cực anode trong pin Lithium-ion (sạc nhanh, dung lượng, tuổi thọ) so với graphite truyền thống.' },
    { text: '2. Quy trình tìm kiếm bằng công cụ AI: Sử dụng Elicit để trích xuất thông số kỹ thuật và Consensus để xác định mức độ đồng thuận, nhập các truy vấn Boolean y khoa và lọc 5 bài báo uy tín thuộc danh mục ISI/Scopus.' },
    { text: '3. Bảng so sánh kết quả trích xuất tự động: Xây dựng bảng so sánh 5 bài báo khoa học tiêu biểu (Mo et al., Lim et al., Hassoun et al., Zhao et al., Mypati et al.) về đối tượng nghiên cứu, phương pháp chế tạo và thông số chính.' },
    { text: '4. Nhận xét và Đánh giá tổng hợp: Đánh giá xu hướng công nghệ (hạt graphene xốp 3D, composite), hiệu quả cải thiện (động học khuếch tán ion Li+) và thách thức thương mại hóa do chi phí chế tạo quy mô lớn.' }
  ]
];
`;

fs.writeFileSync(filePath, fileContent);
console.log('Successfully wrote src/data/lesson-steps.ts');
