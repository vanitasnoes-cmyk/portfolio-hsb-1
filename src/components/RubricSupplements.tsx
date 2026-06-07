import type { ReactNode } from 'react';

/** Nội dung bổ sung đối chiếu checklist VNU1001 — gắn với từng nhiệm vụ */

function SupplementShell({
  title,
  rubricRef,
  children,
  titleClassName,
  rubricRefClassName,
}: {
  title: string;
  rubricRef: string;
  children: ReactNode;
  titleClassName?: string;
  rubricRefClassName?: string;
}) {
  return (
    <div className="mt-4 pt-4 border-t border-dashed border-orange-200/60 dark:border-indigo-800/40 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h6 className={titleClassName || "text-[10px] font-black text-teal-800 dark:text-teal-400 uppercase tracking-widest font-sans"}>{title}</h6>
        <span className={rubricRefClassName || "text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide"}>{rubricRef}</span>
      </div>
      {children}
    </div>
  );
}

function Task1Supplements() {
  return (
  <>
    <SupplementShell title="Lý do cấu trúc thư mục ngành Quản trị & Công nghệ" rubricRef="§2 · Minh chứng sâu">
      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed text-justify font-semibold">
        Với hàng trăm tài liệu môn học, slide bài giảng, tệp tin thực hành và báo cáo nghiên cứu mỗi học kỳ, phân cấp{' '}
        <code className="text-orange-700 dark:text-orange-300 bg-orange-50 dark:bg-orange-950/50 px-1 rounded text-[10px]">Chuong[Số]_Chủ đề</code> giúp tránh
        thất lạc dữ liệu, rút ngắn thời gian tra cứu trước thi, đồng thời
        đồng bộ với quy ước nộp bài <code className="text-orange-700 dark:text-orange-300 bg-orange-50 dark:bg-orange-950/50 px-1 rounded text-[10px]">BT*_Chuong*_DaoThiKhanhHuyen</code>{' '}
        của học phần VNU1001.
      </p>
    </SupplementShell>
    <SupplementShell title="Quy tắc đặt tên mở rộng (phiên bản & ngày)" rubricRef="§2 · Quy tắc đặt tên">
      <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 font-semibold list-disc pl-4">
        <li>
          <strong className="text-slate-800 dark:text-slate-100">Báo cáo nộp VNU:</strong>{' '}
          <code className="font-mono text-[10px] text-orange-600 dark:text-orange-300">BT[Số]_Chuong[Số]_DaoThiKhanhHuyen</code>
        </li>
        <li>
          <strong className="text-slate-800 dark:text-slate-100">Tài liệu học tập / nghiên cứu:</strong>{' '}
          <code className="font-mono text-[10px] text-orange-600 dark:text-orange-300">
            YYYY-MM-DD_VNU1001_[Loai]_[NoiDung]_v[So]
          </code>
          <span className="text-slate-500 dark:text-slate-400"> — ví dụ: </span>
          <code className="font-mono text-[10px] dark:text-slate-300">2026-03-15_VNU1001_BaoCao_QTCN_v2.pdf</code>
        </li>
        <li>
          <strong className="text-slate-800 dark:text-slate-100">Nhóm đám mây:</strong>{' '}
          <code className="font-mono text-[10px] dark:text-slate-300">Nhom3_Dac_Ta_He_Thong_v1.2.docx</code>,{' '}
          <code className="font-mono text-[10px] dark:text-slate-300">Slide_QuickSort_AI_v3.pptx</code>
        </li>
      </ul>
    </SupplementShell>
  </>
  );
}

function Task2Supplements() {
  return (
  <>
    <SupplementShell title="Nguồn học thuật: IEEE Xplore & VNU-LIC" rubricRef="§3 · Nguồn uy tín">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-semibold text-slate-600 dark:text-slate-300">
        <div className="p-3 rounded-xl bg-white dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/50">
          <span className="font-black text-orange-900 dark:text-orange-300 block mb-1">IEEE Xplore / ScienceDirect</span>
          Truy vấn: <em>&quot;Artificial Intelligence&quot;</em> + <em>&quot;Predictive Maintenance&quot;</em> — lọc bài Q1, full-text PDF.
        </div>
        <div className="p-3 rounded-xl bg-white dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/50">
          <span className="font-black text-orange-900 dark:text-orange-300 block mb-1">VNU-LIC</span>
          Tra cứu qua thư viện ĐHQG: tạp chí Elsevier, IEEE Transactions có license tổ chức — tránh paywall trái phép.
        </div>
      </div>
    </SupplementShell>
    <SupplementShell title="Toán tử tìm kiếm (≥4)" rubricRef="§3 · Toán tử nâng cao">
      <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60">
        <table className="w-full text-left text-[11px] font-sans">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-700/60 text-slate-700 dark:text-slate-200 font-bold border-b border-slate-200 dark:border-slate-700">
              <th className="p-2.5">Toán tử</th>
              <th className="p-2.5">Ví dụ áp dụng</th>
              <th className="p-2.5">Mục đích</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50 text-slate-600 dark:text-slate-300 font-semibold">
            <tr>
              <td className="p-2.5 font-mono text-orange-700 dark:text-orange-400">&quot;…&quot;</td>
              <td className="p-2.5">&quot;predictive maintenance&quot;</td>
              <td className="p-2.5">Cụm từ chính xác</td>
            </tr>
            <tr>
              <td className="p-2.5 font-mono text-orange-700 dark:text-orange-400">AND / OR</td>
              <td className="p-2.5">(AI OR &quot;machine learning&quot;) AND &quot;predictive maintenance&quot;</td>
              <td className="p-2.5">Boolean logic</td>
            </tr>
            <tr>
              <td className="p-2.5 font-mono text-orange-700 dark:text-orange-400">site:</td>
              <td className="p-2.5">site:ieee.org &quot;predictive maintenance&quot;</td>
              <td className="p-2.5">Giới hạn tổ chức công nghệ</td>
            </tr>
            <tr>
              <td className="p-2.5 font-mono text-orange-700 dark:text-orange-400">filetype:pdf</td>
              <td className="p-2.5">filetype:pdf &quot;predictive maintenance&quot; algorithms</td>
              <td className="p-2.5">Chỉ tài liệu PDF</td>
            </tr>
            <tr>
              <td className="p-2.5 font-mono text-orange-700 dark:text-orange-400">- (trừ)</td>
              <td className="p-2.5">&quot;predictive maintenance&quot; -aviation</td>
              <td className="p-2.5">Loại nhiễu / tin giả</td>
            </tr>
          </tbody>
        </table>
      </div>
    </SupplementShell>
    <SupplementShell title="Phân tích CRAAP — 1 bài báo khoa học" rubricRef="§3 · CRAAP">
      <div className="overflow-x-auto rounded-xl border border-emerald-100 dark:border-emerald-900/40 bg-emerald-50/30 dark:bg-emerald-950/20">
        <table className="w-full text-left text-[11px] font-sans">
          <thead>
            <tr className="bg-emerald-100/50 dark:bg-emerald-900/30 text-emerald-950 dark:text-emerald-300 font-bold">
              <th className="p-2.5">Tiêu chí</th>
              <th className="p-2.5">IEEE Access — Smith et al. (2022)</th>
            </tr>
          </thead>
          <tbody className="text-slate-700 dark:text-slate-300 font-semibold divide-y divide-emerald-100/50 dark:divide-emerald-900/30">
            <tr><td className="p-2.5 font-bold">Currency</td><td className="p-2.5">Còn giá trị tham chiếu cao; bổ sung các thuật toán cập nhật 2024-2026.</td></tr>
            <tr><td className="p-2.5 font-bold">Relevance</td><td className="p-2.5">Trực tiếp: AI trong bảo trì dự đoán — liên quan quản lý vận hành số.</td></tr>
            <tr><td className="p-2.5 font-bold">Authority</td><td className="p-2.5">IEEE, peer-reviewed, độ uy tín và số lượt trích dẫn cao.</td></tr>
            <tr><td className="p-2.5 font-bold">Accuracy</td><td className="p-2.5">Phương pháp học máy có số liệu thực nghiệm rõ ràng.</td></tr>
            <tr><td className="p-2.5 font-bold">Purpose</td><td className="p-2.5">Mục đích khoa học, không quảng cáo thương mại.</td></tr>
          </tbody>
        </table>
      </div>
    </SupplementShell>
  </>
  );
}

function Task3Supplements() {
  return (
  <>
    <SupplementShell title="Chain-of-Thought — Thuật toán & Quản trị" rubricRef="§4 · CoT thuật toán">
      <div className="bg-white dark:bg-slate-800/60 p-4 rounded-xl border border-slate-100 dark:border-slate-700/50 space-y-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
        <p className="italic text-orange-900/90 dark:text-orange-300 border-l-2 border-orange-400 pl-3">
          Prompt: &quot;Hãy giải thích thuật toán Quick Sort bằng phương pháp suy luận từng bước (CoT): (1) ý tưởng cốt lõi và phần tử chốt (pivot), (2) các bước phân đoạn (partition), (3) minh họa bằng dãy số cụ thể.&quot;
        </p>
        <p className="text-justify leading-relaxed">
          AI liệt kê theo bước; sinh viên <strong className="text-slate-800 dark:text-slate-100">bắt buộc đối chiếu</strong> tài liệu học tập chính thống trước khi ghi nhận kết luận — minh chứng Human-in-the-loop (Bài 6).
        </p>
      </div>
    </SupplementShell>
    <SupplementShell title="So sánh ChatGPT vs Perplexity (học thuật)" rubricRef="§4 · So sánh cơ chế">
      <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60">
        <table className="w-full text-left text-[11px] font-sans">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-700/60 font-bold text-slate-700 dark:text-slate-200 border-b border-slate-200 dark:border-slate-700">
              <th className="p-2.5">Tiêu chí</th>
              <th className="p-2.5">ChatGPT</th>
              <th className="p-2.5">Perplexity</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50 text-slate-600 dark:text-slate-300 font-semibold">
            <tr><td className="p-2.5">Trích dẫn</td><td className="p-2.5">Không ổn định; dễ thiếu PMID</td><td className="p-2.5">Gắn link nguồn, hỗ trợ CoT tra cứu</td></tr>
            <tr><td className="p-2.5">Ảo giác</td><td className="p-2.5">Cao nếu prompt mơ hồ</td><td className="p-2.5">Thấp hơn khi có bước đối soát</td></tr>
            <tr><td className="p-2.5">Tác vụ phù hợp</td><td className="p-2.5">Soạn đề cương, CLEAR/CRAC (Bài 3)</td><td className="p-2.5">Giải thuật, thuật toán (Bài 6)</td></tr>
          </tbody>
        </table>
      </div>
    </SupplementShell>
  </>
  );
}

function Task4Supplements() {
  return (
  <>
    <SupplementShell title="Netiquette & xử lý xung đột nhóm" rubricRef="§5 · Văn hóa số">
      <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-2 font-semibold list-disc pl-4 leading-relaxed">
        <li>
          <strong className="text-slate-800 dark:text-slate-100">Netiquette:</strong> Trả lời comment trong 24h; ghi rõ @tên thành viên;
          họp Zoom bật camera khi thảo luận tiến độ; không chỉnh sửa trực tiếp khi đang dùng Suggesting Mode.
        </li>
        <li>
          <strong className="text-slate-800 dark:text-slate-100">Xung đột nội dung:</strong> Khi hai ý kiến chuyên môn khác nhau trên Google
          Docs — trưởng nhóm tổ chức vote ngắn trên Trello, lưu Version History và chốt theo tài liệu uy tín.
        </li>
        <li>
          <strong className="text-slate-800 dark:text-slate-100">Minh chứng:</strong> Ảnh bước 7–8 (Suggesting, Version History) trong quy
          trình chi tiết Bài 4.
        </li>
      </ul>
    </SupplementShell>
  </>
  );
}

function Task5Supplements() {
  const steps = [
    { n: 1, label: 'Ý tưởng & khán giả', kpi: 'Chủ đề Sống xanh + SV HSB' },
    { n: 2, label: 'Nghiên cứu số liệu', kpi: '≥3 nguồn (Gemini blog, WHO, VN e-waste)' },
    { n: 3, label: 'Soạn thảo AI + hiệu đính', kpi: 'Blog ~1000 từ, 0 lỗi fact-check' },
    { n: 4, label: 'Thiết kế hình ảnh', kpi: 'Nano Banana + Canva palette xanh-trắng' },
    { n: 5, label: 'Infographic & CTA', kpi: '≥2 địa chỉ thu gom e-waste' },
    { n: 6, label: 'Đo lường', kpi: 'Lượt xem/chia sẻ lớp; phản hồi checklist rubric' },
  ];
  return (
    <SupplementShell title="Quy trình sáng tạo 6 bước & KPI" rubricRef="§6 · Quy trình 6 bước">
      <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60">
        <table className="w-full text-left text-[11px] font-sans">
          <thead>
            <tr className="bg-orange-50 dark:bg-orange-950/50 text-orange-950 dark:text-orange-300 font-bold border-b border-orange-100 dark:border-indigo-900/40">
              <th className="p-2.5 w-8">#</th>
              <th className="p-2.5">Bước</th>
              <th className="p-2.5">KPI / Minh chứng</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50 text-slate-600 dark:text-slate-300 font-semibold">
            {steps.map((s) => (
              <tr key={s.n}>
                <td className="p-2.5 font-black text-orange-600 dark:text-orange-400">{s.n}</td>
                <td className="p-2.5">{s.label}</td>
                <td className="p-2.5">{s.kpi}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-[10px] text-slate-500 dark:text-slate-400 italic font-semibold">
        AI hỗ trợ dàn ý/ảnh; sinh viên biên tập sâu nội dung sống xanh và kiểm chứng số liệu carbon (bước 2–3
        trong quy trình chi tiết).
      </p>
    </SupplementShell>
  );
}

function Task6Supplements() {
  return (
  <>
    <SupplementShell title="Nghị định 13/2023/NĐ-CP & An toàn dữ liệu" rubricRef="§7 · Giải pháp đạo đức">
      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed text-justify font-semibold">
        Khi tra cứu thông tin dự án bằng AI, <strong className="text-slate-800 dark:text-slate-100">không nhập</strong> họ tên, CCCD, thông tin nội bộ doanh nghiệp
        hay dữ liệu cá nhân chưa ẩn danh lên mô hình công cộng. Tuân thủ{' '}
        <strong className="text-slate-800 dark:text-slate-100">Nghị định 13/2023/NĐ-CP</strong> về bảo vệ dữ liệu cá nhân: chỉ dùng
        dữ liệu đã ẩn danh hóa; lưu trữ tài liệu nhóm trên Drive có 2FA; xóa log chat sau khi hoàn thành bài tập.
      </p>
    </SupplementShell>
    <SupplementShell title="Hỗ trợ vs Gian lận (đào tạo Quản trị & Công nghệ)" rubricRef="§7 · Tư duy phản biện">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-semibold">
        <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40 text-emerald-950 dark:text-emerald-300">
          <span className="font-black block mb-1 uppercase text-[10px] tracking-wide">Hỗ trợ ✓</span>
          Gợi ý cấu trúc báo cáo; tóm tắt giải thuật kèm trích dẫn; kiểm tra chính tả; tạo infographic sau khi đã có
          số liệu do sinh viên xác minh.
        </div>
        <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/40 text-rose-950 dark:text-rose-300">
          <span className="font-black block mb-1 uppercase text-[10px] tracking-wide">Gian lận ✗</span>
          Nộp nguyên văn thuật toán AI không đối chiếu tài liệu chuẩn; che giấu việc dùng AI; copy bài bạn; đưa dữ liệu
          cá nhân thật lên chatbot.
        </div>
      </div>
    </SupplementShell>
  </>
  );
}

export function LessonRubricSupplements({ tabIndex }: { tabIndex: number }) {
  switch (tabIndex) {
    case 0:
      return <Task1Supplements />;
    case 1:
      return <Task2Supplements />;
    case 2:
      return <Task3Supplements />;
    case 3:
      return <Task4Supplements />;
    case 4:
      return <Task5Supplements />;
    case 5:
      return <Task6Supplements />;
    default:
      return null;
  }
}

export function SummaryRubricSupplement() {
  return (
    <div className="mt-8 space-y-4 relative z-10">
      <div className="glass-panel rounded-2xl p-6 border border-orange-100/40 dark:border-indigo-900/30 space-y-3">
        <h4 className="text-xs font-black text-orange-900 dark:text-orange-300 uppercase tracking-widest font-sans">
          Đối chiếu Rubric §8 — Chiều sâu &amp; thực tập doanh nghiệp
        </h4>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed text-justify font-medium">
          Tôi chuyển từ <strong className="text-slate-800 dark:text-slate-100">người dùng AI thụ động</strong> (copy-paste câu trả lời)
          sang <strong className="text-slate-800 dark:text-slate-100">người giám sát chiến lược</strong>: thiết kế prompt CLEAR/CoT, chọn
          Perplexity cho tra cứu thông tin và Gemini cho lập dàn ý, luôn kiểm chứng bằng giáo trình và tài liệu chính thống trước khi đưa ra
          kết luận.
        </p>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed text-justify font-medium">
          <strong className="text-slate-800 dark:text-slate-100">Kế hoạch thực tập doanh nghiệp (2026–2027):</strong> (1) Chuẩn hóa thư mục
          công việc theo <code className="text-[10px] text-orange-600 dark:text-orange-400">YYYY-MM-DD_DuAn_TenFile_v1</code>; (2) Tra cứu
          thông tin công nghệ trên Google Scholar/VNU-LIC, không tin một nguồn AI; (3) Soạn báo cáo phân tích bằng template có
          trích dẫn Zotero; (4) Báo cáo sự cố ảo giác AI cho người hướng dẫn nếu phát hiện thông tin sai lệch.
        </p>
      </div>
    </div>
  );
}
