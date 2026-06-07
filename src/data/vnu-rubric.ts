/** Bộ checklist Portfolio năng lực số VNU1001 — đối chiếu Rubric chính thức */

export interface RubricChecklistItem {
  id: string;
  label: string;
  description: string;
}

export interface RubricSection {
  id: string;
  title: string;
  levelLabel: string;
  focus: string;
  items: RubricChecklistItem[];
}

export const VNU_RUBRIC_TITLE = 'Bộ Checklist Portfolio Năng Lực Số (VNU1001)';

export const VNU_RUBRIC_SECTIONS: RubricSection[] = [
  {
    id: 's1',
    title: 'Thiết kế & Cấu trúc Portfolio',
    levelLabel: 'Mức 4 — 3 điểm',
    focus: 'Trọng tâm: Trải nghiệm người dùng (UX) và tính chuyên nghiệp.',
    items: [
      {
        id: 's1-1',
        label: 'Tính đầy đủ',
        description:
          'Có đủ trang giới thiệu (có ảnh chân dung/logo VNU-HSB), các trang nhiệm vụ (1–7) và trang tổng kết.',
      },
      {
        id: 's1-2',
        label: 'Điều hướng thông minh',
        description:
          'Tích hợp mục lục (Mini-ToC) ở đầu mỗi bài hoặc thanh tiến độ (Progress bar). Các liên kết Deep links hoạt động chính xác.',
      },
      {
        id: 's1-3',
        label: 'Đa phương tiện',
        description:
          'Tích hợp hài hòa video, infographic, biểu đồ và ảnh chụp minh họa (Lightbox).',
      },
      {
        id: 's1-4',
        label: 'UX/UI',
        description:
          'Màu sắc nhất quán, font chữ dễ đọc (Be Vietnam Pro / Times New Roman), giao diện tối ưu trên điện thoại và máy tính.',
      },
    ],
  },
  {
    id: 's2',
    title: 'Nhiệm vụ 1: Quản lý tệp và thư mục',
    levelLabel: 'Mức 4 — 1 điểm',
    focus: 'Trọng tâm: Tổ chức dữ liệu khoa học cho ngành Quản trị & Công nghệ.',
    items: [
      {
        id: 's2-1',
        label: 'Cấu trúc logic',
        description:
          'Ảnh chụp cây thư mục phân cấp rõ ràng (ví dụ: Nam_1 > Hoc_ky_2 > Duoc_ly > Bai_giang).',
      },
      {
        id: 's2-2',
        label: 'Quy tắc đặt tên',
        description:
          'Áp dụng công thức nhất quán: YYYY-MM-DD_[MaMon]_[Loai]_[NoiDung]_v[SoPhienBan].',
      },
      {
        id: 's2-3',
        label: 'Minh chứng sâu sắc',
        description:
          'Có phần mô tả giải thích tại sao cấu trúc này giúp quản lý hàng trăm tài liệu quản trị & công nghệ hiệu quả, tránh thất lạc và tối ưu hóa tra cứu.',
      },
    ],
  },
  {
    id: 's3',
    title: 'Nhiệm vụ 2: Tìm kiếm & Đánh giá thông tin',
    levelLabel: 'Mức 4 — 1 điểm',
    focus: 'Trọng tâm: Kỹ năng tra cứu PubMed và bộ tiêu chí CRAAP.',
    items: [
      {
        id: 's3-1',
        label: 'Toán tử nâng cao',
        description:
          'Minh chứng sử dụng linh hoạt trên 4 toán tử (ví dụ: site:gov.vn, filetype:pdf, dấu ngoặc kép, AROUND(n) hoặc - để lọc tin giả).',
      },
      {
        id: 's3-2',
        label: 'Nguồn học thuật',
        description:
          'Kết quả tìm kiếm từ các nguồn uy tín như Google Scholar, VNU-LIC hoặc các cơ sở dữ liệu học thuật lớn.',
      },
      {
        id: 's3-3',
        label: 'Phân tích CRAAP',
        description:
          'Phân tích sâu sắc về chiến lược tìm kiếm và thẩm định một bài báo khoa học & công nghệ cụ thể (tính cập nhật, độ chính xác…).',
      },
    ],
  },
  {
    id: 's4',
    title: 'Nhiệm vụ 3: Viết Prompt hiệu quả',
    levelLabel: 'Mức 4 — 1 điểm',
    focus: 'Trọng tâm: Kỹ thuật Prompt Engineering và so sánh cơ chế AI.',
    items: [
      {
        id: 's4-1',
        label: 'Framework chuyên nghiệp',
        description:
          'Sử dụng mô hình CLEAR (Bối cảnh — Vai trò — Chỉ dẫn — Đối tượng — Tinh chỉnh) cho các tác vụ quản lý & công nghệ.',
      },
      {
        id: 's4-2',
        label: 'Kỹ thuật nâng cao',
        description:
          'Có minh chứng áp dụng Chain-of-Thought (CoT) — yêu cầu AI suy luận từng bước cho một bài toán thuật toán hoặc quản trị.',
      },
      {
        id: 's4-3',
        label: 'So sánh cơ chế',
        description:
          'Phân tích sâu sắc sự khác biệt giữa các mô hình AI (như ChatGPT vs Perplexity) về khả năng trích dẫn học thuật khoa học và độ tin cậy.',
      },
    ],
  },
  {
    id: 's5',
    title: 'Nhiệm vụ 4: Hợp tác trực tuyến',
    levelLabel: 'Mức 4 — 1 điểm',
    focus: 'Trọng tâm: Tối ưu hóa quy trình làm việc nhóm.',
    items: [
      {
        id: 's5-1',
        label: 'Công cụ nâng cao',
        description: 'Sử dụng thành thạo Trello hoặc Notion để quản lý dự án nhóm.',
      },
      {
        id: 's5-2',
        label: 'Tối ưu quy trình',
        description:
          'Ảnh chụp bảng Kanban thể hiện rõ việc phân công, hạn chót và theo dõi tiến độ một cách khoa học.',
      },
      {
        id: 's5-3',
        label: 'Văn hóa số',
        description:
          'Mô tả cách nhóm áp dụng Netiquette và giải quyết xung đột trực tuyến khi cùng soạn thảo tài liệu (Google Docs / Teams).',
      },
    ],
  },
  {
    id: 's6',
    title: 'Nhiệm vụ 5: Sáng tạo nội dung với AI',
    levelLabel: 'Mức 4 — 1 điểm',
    focus: 'Trọng tâm: Sản phẩm chuyên nghiệp mang dấu ấn cá nhân.',
    items: [
      {
        id: 's6-1',
        label: 'Chất lượng sản phẩm',
        description:
          'Sản phẩm (Infographic truyền thông, Video tư vấn thuốc…) có thiết kế sáng tạo, chuyên nghiệp, không lỗi kỹ thuật.',
      },
      {
        id: 's6-2',
        label: 'Quy trình 6 bước',
        description: 'Mô tả chi tiết từ khâu lên ý tưởng đến đo lường hiệu quả (KPIs).',
      },
      {
        id: 's6-3',
        label: 'Tận dụng công cụ',
        description:
          'Thể hiện việc sử dụng AI để hỗ trợ (lên dàn ý, tạo ảnh) nhưng có sự biên tập, cá nhân hóa sâu sắc của bản thân.',
      },
    ],
  },
  {
    id: 's7',
    title: 'Nhiệm vụ 6: AI có trách nhiệm',
    levelLabel: 'Mức 4 — 1 điểm',
    focus: 'Trọng tâm: Liêm chính học thuật và đạo đức nghề nghiệp.',
    items: [
      {
        id: 's7-1',
        label: 'Bộ nguyên tắc cá nhân',
        description:
          '5–7 nguyên tắc chi tiết (ví dụ: luôn kiểm chứng tính chính xác của dữ liệu từ nguồn tin cậy sau khi dùng AI).',
      },
      {
        id: 's7-2',
        label: 'Tư duy phản biện',
        description:
          'Phân tích sâu sắc ranh giới giữa "Hỗ trợ" và "Gian lận" trong đào tạo quản trị & công nghệ.',
      },
      {
        id: 's7-3',
        label: 'Giải pháp đạo đức',
        description:
          'Đề xuất cách ứng phó với ảo giác AI và bảo vệ an toàn dữ liệu cá nhân theo Nghị định 13/2023/NĐ-CP.',
      },
    ],
  },
  {
    id: 's7_5',
    title: 'Nhiệm vụ 7: Tổng quan tài liệu bằng AI',
    levelLabel: 'Mức 4 — 1 điểm',
    focus: 'Trọng tâm: Kỹ năng tổng hợp tài liệu khoa học bằng công cụ Elicit & Consensus.',
    items: [
      {
        id: 's7_5-1',
        label: 'Truy vấn chuyên sâu',
        description: 'Xây dựng biểu thức tìm kiếm Boolean chuyên sâu và lọc các bài báo khoa học uy tín danh mục ISI/Scopus.',
      },
      {
        id: 's7_5-2',
        label: 'Trích xuất dữ liệu',
        description: 'Lập bảng so sánh đối chứng 5 bài báo khoa học về cực anode Graphene (vật liệu, phương pháp, thông số chính).',
      },
      {
        id: 's7_5-3',
        label: 'Nhận xét tổng quan',
        description: 'Phân tích sâu sắc về xu hướng cấu trúc Graphene, hiệu năng cải thiện và rào cản thương mại hóa.',
      },
    ],
  },
  {
    id: 's8',
    title: 'Tổng kết và đánh giá bản thân',
    levelLabel: 'Mức 4 — 1 điểm',
    focus: 'Trọng tâm: Sự trưởng thành và định hướng tương lai.',
    items: [
      {
        id: 's8-1',
        label: 'Phân tích chiều sâu',
        description:
          'Đánh giá trung thực về sự thay đổi của bản thân từ "người dùng thụ động" sang "người giám sát chiến lược" của AI.',
      },
      {
        id: 's8-2',
        label: 'Bài học kinh nghiệm',
        description:
          'Nêu rõ các thách thức kỹ thuật / đạo đức đã vượt qua trong suốt học phần.',
      },
      {
        id: 's8-3',
        label: 'Ứng dụng thực tiễn',
        description:
          'Mô tả kế hoạch cụ thể để áp dụng các kỹ năng số vào thực tập doanh nghiệp hoặc nghiên cứu quản trị & công nghệ sau này.',
      },
    ],
  },
];

/** Mục portfolio chung (mục 1) */
export const PORTFOLIO_RUBRIC_SECTION = VNU_RUBRIC_SECTIONS[0];

/** Mục nhiệm vụ theo chỉ số bài 0–6 → mục 2–8 */
export function getTaskRubricSection(lessonIndex: number): RubricSection | undefined {
  if (lessonIndex < 0 || lessonIndex > 6) return undefined;
  return VNU_RUBRIC_SECTIONS[lessonIndex + 1];
}

/** Chỉ tiêu chí nhiệm vụ — đặt checklist cùng minh chứng bài tập (construct validity). */
export function getLessonRubricSections(lessonIndex: number): RubricSection[] {
  const task = getTaskRubricSection(lessonIndex);
  return task ? [task] : [];
}

export const TOTAL_RUBRIC_ITEMS = countSectionItems(VNU_RUBRIC_SECTIONS);

export function countAllRubricChecked(checks: Record<string, boolean>): number {
  return countCheckedInSections(VNU_RUBRIC_SECTIONS, checks);
}

/** Số thứ tự mục Rubric (1–9) theo section id */
export function rubricSectionNumber(sectionId: string): number {
  const idx = VNU_RUBRIC_SECTIONS.findIndex((s) => s.id === sectionId);
  return idx >= 0 ? idx + 1 : 0;
}

export const SUMMARY_RUBRIC_SECTION = VNU_RUBRIC_SECTIONS[8];

export function countSectionItems(sections: RubricSection[]): number {
  return sections.reduce((n, s) => n + s.items.length, 0);
}

export function countCheckedInSections(
  sections: RubricSection[],
  checks: Record<string, boolean>,
): number {
  return sections.reduce(
    (n, s) => n + s.items.filter((item) => checks[item.id]).length,
    0,
  );
}

export const RUBRIC_STORAGE_KEY = 'portfolio-rubric-vnu1001-v2';

export function loadRubricChecks(): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(RUBRIC_STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Record<string, boolean>;
  } catch {
    return {};
  }
}

export function saveRubricChecks(checks: Record<string, boolean>): void {
  try {
    localStorage.setItem(RUBRIC_STORAGE_KEY, JSON.stringify(checks));
    window.dispatchEvent(new CustomEvent('rubric-checks-updated'));
  } catch {
    /* ignore quota */
  }
}
