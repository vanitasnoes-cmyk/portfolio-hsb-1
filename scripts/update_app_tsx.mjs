import fs from 'fs';
import path from 'path';

const filePath = 'c:/Users/USER/Downloads/Portfolio hsb 1/src/App.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Define the new 7-project array
const newPortfolioProjects = `  const portfolioProjects = [
    {
      id: 'bt1',
      coverImage: '/images/cover_bt1.png',
      label: 'Bài 1: Hệ điều hành & Tệp tin',
      fullName: 'Bài tập 1 — Quản trị Hệ điều hành & Thao tác tệp tin trên Windows',
      objective: 'Làm chủ các thao tác cơ bản trên Windows File Explorer, tổ chức lưu trữ khoa học với cấu trúc thư mục học thuật chuẩn "ThucHanh_DaoThiKhanhHuyen" và quản lý vòng đời tệp tin.',
      process: 'Tạo thư mục ThucHanh_DaoThiKhanhHuyen, tạo file GhiChu.txt và đổi tên thành GhiChuQuanTrong.txt. Tạo thư mục con TaiLieu, thực hiện sao chép và di chuyển tệp tin. Quản lý xóa tệp qua Recycle Bin và xóa vĩnh viễn (Shift + Delete).',
      product: 'Thư mục học thuật "ThucHanh_DaoThiKhanhHuyen" có cấu trúc phân cấp chuẩn và ảnh chụp minh chứng.',
      fileUrl: '/files/Bai_1_DaoThiKhanhHuyen.pdf',
      fileName: 'Bai_1_DaoThiKhanhHuyen.pdf',
      fileType: 'pdf',
      skills: ['Windows 11', 'Quản lý tệp tin', 'Bảo mật hệ thống', 'Phân cấp dữ liệu'],
      images: ['/images/steps/bt1/01.png', '/images/steps/bt1/02.png'],
      imageDescriptions: [
        'Ảnh 1: Cấu trúc thư mục "ThucHanh_DaoThiKhanhHuyen" được phân cấp khoa học trên File Explorer.',
        'Ảnh 2: Quá trình thao tác tạo mới, sao chép và di chuyển tệp tin vào thư mục TaiLieu.'
      ],
      detailedSummary: 'Bài tập 1 tập trung rèn luyện các thao tác quản lý tệp tin và thư mục trên Windows. Em đã thiết lập thư mục học thuật chuẩn "ThucHanh_DaoThiKhanhHuyen" và các thư mục con để lưu trữ dữ liệu. Qua đó nắm vững các thao tác Copy, Cut, Paste, Recycle Bin và Shift+Delete.'
    },
    {
      id: 'bt2',
      coverImage: '/images/cover_bt2.png',
      label: 'Bài 2: Đánh giá tài liệu học thuật',
      fullName: 'Bài tập 2 — Báo cáo đánh giá độ tin cậy của tài liệu nghiên cứu AI',
      objective: 'Ứng dụng các công cụ tìm kiếm nâng cao (Google Scholar, ScienceDirect) kết hợp toán tử Boolean để thu thập và đánh giá độ tin cậy của 11 tài liệu về chủ đề "AI trong Bảo trì dự đoán".',
      process: 'Xây dựng biểu thức Boolean, tìm kiếm tài liệu trên Google Scholar, lập bảng Excel chấm điểm 11 tài liệu dựa trên 5 tiêu chí chuẩn hóa (Tác giả, Đơn vị xuất bản, Phương pháp, Số lần trích dẫn, Tính cập nhật).',
      product: 'Báo cáo đánh giá học thuật và Bảng Excel thẩm định độ tin cậy của 11 nguồn tài liệu.',
      fileUrl: '/files/Bai_2_DaoThiKhanhHuyen.pdf',
      fileName: 'Bai_2_DaoThiKhanhHuyen.pdf',
      fileType: 'pdf',
      skills: ['Google Scholar', 'Boolean Search', 'Thẩm định tài liệu', 'Excel'],
      images: [],
      imageDescriptions: [],
      detailedSummary: 'Bài tập 2 rèn luyện kỹ năng tìm kiếm và đánh giá tài liệu học thuật một cách khoa học. Em đã áp dụng các tiêu chí khắt khe để thẩm định 11 tài liệu về Bảo trì dự đoán, giúp nâng cao tư duy phản biện và sàng lọc thông tin chất lượng cao.'
    },
    {
      id: 'bt3',
      coverImage: '/images/cover_bt3.png',
      label: 'Bài 3: Kỹ nghệ Prompt Engineering',
      fullName: 'Bài tập 3 — Tối ưu hóa tương tác AI giải thích Blockchain',
      objective: 'So sánh hiệu quả của các kỹ thuật viết prompt từ cơ bản đến nâng cao (CLEAR/CRAC) để yêu cầu AI giải thích khái niệm phức tạp Blockchain cho học sinh cấp 3.',
      process: 'Thiết kế 3 cấp độ prompt: Cơ bản (Zero-shot), Cải tiến (thêm cấu trúc) và Nâng cao (Role, Few-shot, Chain-of-Thought). Chạy thử trên Google Gemini và lập bảng đối chiếu chất lượng phản hồi.',
      product: 'Báo cáo kỹ thuật Prompt Engineering và Bảng so sánh 3 cấp độ prompt trên Gemini.',
      fileUrl: '/files/Bai_3_DaoThiKhanhHuyen.pdf',
      fileName: 'Bai_3_DaoThiKhanhHuyen.pdf',
      fileType: 'pdf',
      skills: ['Prompt Engineering', 'CLEAR / CRAC', 'Few-shot Learning', 'Chain-of-Thought'],
      images: ['/images/steps/bt3/01.png', '/images/steps/bt3/02.png'],
      imageDescriptions: [
        'Ảnh 1: Thiết kế và thử nghiệm prompt nâng cao CLEAR/CRAC trên Google Gemini.',
        'Ảnh 2: Bảng so sánh hiệu quả và độ chi tiết của phản hồi giữa các cấp độ prompt.'
      ],
      detailedSummary: 'Bài tập 3 giúp em làm chủ kỹ năng Prompt Engineering. Bằng cách áp dụng các nguyên tắc nâng cao như gán vai trò, cung cấp ví dụ mẫu (Few-shot) và dẫn dắt tư duy (CoT), em đã giúp AI đưa ra cách giải thích Blockchain bằng ẩn dụ cuốn sổ lớp học cực kỳ trực quan và dễ nhớ.'
    },
    {
      id: 'bt4',
      coverImage: '/images/cover_bt4.png',
      label: 'Bài 4: Cộng tác đám mây & Kanban',
      fullName: 'Bài tập 4 — Cộng tác trực tuyến và điều phối dự án Thư viện Mini',
      objective: 'Ứng dụng các công cụ đám mây (Trello, Drive, Docs, Teams) để lên kế hoạch, phân công và phối hợp thực hiện dự án thiết kế hệ thống thư viện nhóm.',
      process: 'Cấu hình bảng Kanban trên Trello, thiết lập cấu trúc thư mục Google Drive đa tầng, cộng tác biên tập kịch bản Docs qua chế độ Suggesting/Comment, phân tích và giải quyết các thách thức cộng tác.',
      product: 'Không gian cộng tác Kanban Trello, thư mục Drive nhóm và báo cáo phân tích thách thức.',
      fileUrl: '/files/Bai_4_DaoThiKhanhHuyen.pdf',
      fileName: 'Bai_4_DaoThiKhanhHuyen.pdf',
      fileType: 'pdf',
      skills: ['Kanban Trello', 'Google Workspace', 'Cộng tác đám mây', 'Version Control'],
      images: ['/images/steps/bt4/01.png', '/images/steps/bt4/02.png'],
      imageDescriptions: [
        'Ảnh 1: Quản trị tiến độ công việc nhóm trực quan trên bảng Kanban Trello.',
        'Ảnh 2: Cấu trúc thư mục đa cấp và quy tắc đặt tên file đồng nhất trên Google Drive.'
      ],
      detailedSummary: 'Bài tập 4 giúp em nâng cao kỹ năng làm việc nhóm trực tuyến. Em đã học cách tổ chức tài nguyên khoa học trên Drive, điều phối tác vụ qua Trello và giải quyết các xung đột dữ liệu thực tế bằng các công cụ cộng tác thời gian thực.'
    },
    {
      id: 'bt5',
      coverImage: '/images/cover_bt5.png',
      label: 'Bài 5: Sáng tạo nội dung số với AI',
      fullName: 'Bài tập 5 — Thiết kế ấn phẩm truyền thông Sống Xanh với AI',
      objective: 'Sử dụng các công cụ AI tạo sinh (Gemini, Canva, Nano Banana) để thiết kế bài viết blog và Infographic truyền thông về chiến dịch dấu chân carbon của AI và e-waste.',
      process: 'Gemini lên ý tưởng và dàn ý blog. Nano Banana tạo ảnh nghệ thuật không gian tương lai. Canva thiết kế Infographic với quy tắc tương phản và trọng lượng thị giác xanh lá đậm - trắng.',
      product: 'Bài viết blog "Sống Xanh trong Kỷ nguyên Số" và Infographic truyền thông Canva.',
      fileUrl: '/files/Bai_5_DaoThiKhanhHuyen.pdf',
      fileName: 'Bai_5_DaoThiKhanhHuyen.pdf',
      fileType: 'pdf',
      skills: ['Canva AI', 'Google Gemini', 'Generative Art', 'Truyền thông số'],
      images: ['/images/steps/bt5/01.jpeg', '/images/steps/bt5/02.jpeg'],
      imageDescriptions: [
        'Ảnh 1: Bản thiết kế Infographic Sống Xanh tối ưu hóa bố cục dọc trên Canva.',
        'Ảnh 2: Hình ảnh nghệ thuật không gian làm việc tương lai do AI Nano Banana tạo lập.'
      ],
      detailedSummary: 'Bài tập 5 giúp em làm chủ quy trình sáng tạo nội dung số. Sự phối hợp giữa AI tạo chữ (Gemini), tạo ảnh (Nano Banana) và công cụ thiết kế (Canva) đã giúp em tạo ra chiến dịch truyền thông Sống Xanh trực quan và có tính tác động cao.'
    },
    {
      id: 'bt6',
      coverImage: '/images/cover_bt6.png',
      label: 'Bài 6: Đạo đức AI & Liêm chính',
      fullName: 'Bài tập 6 — Sử dụng AI có trách nhiệm trong học tập thuật toán',
      objective: 'Nghiên cứu chính sách AI của VNU và xây dựng bộ nguyên tắc cá nhân sử dụng AI có trách nhiệm qua thực hành lập dàn ý thuật toán Quick Sort.',
      process: 'Đối chiếu chính sách AI của VNU, sử dụng ChatGPT hỗ trợ lập dàn ý thuyết trình Quick Sort trong C++, thực hiện kiểm chứng loại bỏ lỗi ảo giác, và đúc kết bộ 5 nguyên tắc vàng.',
      product: 'Báo cáo liêm chính học thuật và Bộ 5 nguyên tắc cá nhân về sử dụng AI.',
      fileUrl: '/files/Bai_6_DaoThiKhanhHuyen.pdf',
      fileName: 'Bai_6_DaoThiKhanhHuyen.pdf',
      fileType: 'pdf',
      skills: ['AI Ethics', 'Liêm chính học thuật', 'Quick Sort', 'Fact-checking AI'],
      images: [],
      imageDescriptions: [],
      detailedSummary: 'Bài tập 6 định hình tư duy sử dụng AI có trách nhiệm. Qua việc thực hành giải thuật Quick Sort, em hiểu rằng AI chỉ là công cụ bổ trợ, giá trị cốt lõi nằm ở tư duy độc lập và sự minh bạch, liêm chính của bản thân.'
    },
    {
      id: 'bt7',
      coverImage: '/images/cover_bt7.png',
      label: 'Bài 7: Tổng quan tài liệu bằng AI',
      fullName: 'Bài tập 7 — Tổng quan tài liệu pin Lithium-ion bằng Elicit & Consensus',
      objective: 'Ứng dụng các công cụ AI học thuật (Elicit, Consensus) để tự động trích xuất và tổng hợp thông tin từ 5 bài báo khoa học về cực anode Graphene.',
      process: 'Nhập truy vấn Boolean học thuật, sử dụng Elicit để trích xuất phương pháp và thông số, dùng Consensus đánh giá mức độ đồng thuận, lập bảng so sánh và viết nhận xét tổng hợp.',
      product: 'Báo cáo tổng quan tài liệu khoa học Graphene pin Lithium-ion và bảng so sánh trích xuất.',
      fileUrl: '/files/Bai_7_DaoThiKhanhHuyen.pdf',
      fileName: 'Bai_7_DaoThiKhanhHuyen.pdf',
      fileType: 'pdf',
      skills: ['Elicit AI', 'Consensus AI', 'Tổng hợp tài liệu', 'Pin Lithium-ion'],
      images: ['/images/steps/bt7/01.jpeg', '/images/steps/bt7/02.jpeg'],
      imageDescriptions: [
        'Ảnh 1: Quy trình sử dụng Elicit trích xuất thông số kỹ thuật tự động.',
        'Ảnh 2: Bảng so sánh 5 bài báo khoa học về vật liệu Graphene cho cực anode pin Lithium-ion.'
      ],
      detailedSummary: 'Bài tập 7 giúp em tối ưu hóa thời gian nghiên cứu tài liệu khoa học. Các công cụ AI như Elicit và Consensus đã hỗ trợ đắc lực trong việc trích xuất tự động và tổng hợp chéo thông tin, giúp xây dựng báo cáo khoa học chính xác và chuyên sâu.'
    }
  ];`;

// 2. Locate the old portfolioProjects in App.tsx and replace it
const lines = content.split('\n');
let startIdx = -1;
let endIdx = -1;
let bracketCount = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.includes('const portfolioProjects = [')) {
    startIdx = i;
  }
  if (startIdx !== -1 && i >= startIdx) {
    for (let c = 0; c < line.length; c++) {
      if (line[c] === '[') bracketCount++;
      if (line[c] === ']') bracketCount--;
    }
    if (bracketCount === 0 && i > startIdx) {
      endIdx = i;
      break;
    }
  }
}

if (startIdx !== -1 && endIdx !== -1) {
  lines.splice(startIdx, endIdx - startIdx + 1, newPortfolioProjects);
  content = lines.join('\n');
  console.log('Replaced portfolioProjects definition successfully!');
} else {
  console.error('Could not find portfolioProjects in App.tsx');
  process.exit(1);
}

// 3. Replace student name, ID, email, school and major references
content = content
  .replace(/Nguyễn Tùng Dương/g, 'Đào Thị Khánh Huyền')
  .replace(/22100220@vnu.edu.vn/g, '25080652@vnu.edu.vn')
  .replace(/22100220/g, '25080652')
  .replace(/Trường Đại học Y Dược, ĐHQGHN/g, 'Trường Quản trị và Kinh doanh, ĐHQGHN')
  .replace(/Trường Đại học Y Dược, Đại học Quốc gia Hà Nội/g, 'Trường Quản trị và Kinh doanh, Đại học Quốc gia Hà Nội')
  .replace(/Dược Sĩ Số/g, 'Nhà Quản trị Số')
  .replace(/Dược sĩ số/g, 'Nhà quản trị số')
  .replace(/Dược học/g, 'Quản trị & Công nghệ')
  .replace(/y dược/g, 'quản trị & công nghệ')
  .replace(/y khoa/g, 'công nghệ số')
  .replace(/giáo trình VNU-UMP/gi, 'Giáo Trình VNU-HSB')
  .replace(/vnu-ump-logo\.png/g, 'hsb-logo.png')
  .replace(/alt="Logo VNU-UMP"/g, 'alt="Logo VNU-HSB"')
  .replace(/6 bài tập/g, '7 bài tập')
  .replace(/khám phá 6 bài tập/gi, 'Khám phá 7 bài tập')
  .replace(/hệ thống 6 bài tập/gi, 'Hệ thống 7 bài tập')
  .replace(/mẹo viết prompt/gi, 'mẹo viết prompt học thuật')
  .replace(/avatar_duong\.jpg/g, 'avatar_huyen.jpg')
  .replace(/Dược Sĩ Số VNU-UMP/g, 'Nhà Quản trị Số VNU-HSB')
  .replace(/Dược Sĩ Số Tương Lai/g, 'Nhà Quản trị Số Tương Lai')
  .replace(/Nguyễn Tùng Dương • Dược Sĩ Số Tương Lai/g, 'Đào Thị Khánh Huyền • Nhà Quản trị Số Tương Lai')
  .replace(/mọi báo cáo và hình ảnh đều được trích dẫn trực tiếp từ sản phẩm gốc của sinh viên Nguyễn Tùng Dương/gi, 'Mọi báo cáo và hình ảnh đều được trích dẫn trực tiếp từ sản phẩm gốc của sinh viên Đào Thị Khánh Huyền');

// 4. Migrate hardcoded colors (blue/sky to orange/tangerine)
content = content
  .replace(/#0284c7/g, '#ea580c')
  .replace(/#0ea5e9/g, '#f97316')
  .replace(/#bae6fd/g, '#fed7aa')
  .replace(/#f0f9ff/g, '#ffedd5')
  .replace(/#0369a1/g, '#c2410c')
  .replace(/text-sky-600/g, 'text-orange-600')
  .replace(/text-sky-700/g, 'text-orange-700')
  .replace(/dark:text-sky-300/g, 'dark:text-orange-300')
  .replace(/dark:text-sky-400/g, 'dark:text-orange-400')
  .replace(/dark:ring-\[#1e3a6e\]/g, 'dark:ring-[#451a03]')
  .replace(/border-sky-200/g, 'border-orange-200')
  .replace(/bg-sky-50/g, 'bg-orange-50')
  .replace(/border-sky-100/g, 'border-orange-100')
  .replace(/text-sky-600/g, 'text-orange-600')
  .replace(/badge-indigo/g, 'badge-orange') // just in case it maps badges
  .replace(/badge-teal/g, 'badge-amber');

fs.writeFileSync(filePath, content);
console.log('Successfully updated App.tsx with all details!');
