import {
  Mail,
  MapPin,
  GraduationCap,
  BookOpen,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

const PROFILE = {
  name: 'Đào Thị Khánh Huyền',
  program: 'Sinh viên lớp VNU1001-E252036',
  school: 'Trường Quản trị và Kinh doanh (HSB) — ĐHQGHN',
  course: 'Học phần VNU1001 · Năng lực số',
  studentId: '25080652',
  email: '25080652@vnu.edu.vn',
  location: 'VNU-HSB, Xuân Thủy, Cầu Giấy, Hà Nội',
} as const;

export function PortfolioIntroMedia() {
  const mailHref = `https://mail.google.com/mail/?view=cm&fs=1&to=${PROFILE.email}`;

  return (
    <aside className="w-full flex flex-col gap-0 p-0 glass-panel dark:bg-slate-900/85 rounded-3xl border border-orange-100/40 dark:border-indigo-900/30 overflow-hidden shadow-md">
      <div className="bg-[#ea580c] px-5 py-4 text-white text-center space-y-1">
        <span className="inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-widest bg-white/15 px-2.5 py-1 rounded-full">
          <Sparkles className="w-3 h-3" aria-hidden />
          Portfolio VNU1001
        </span>
        <p className="text-[11px] font-semibold text-indigo-100/95 leading-snug">{PROFILE.course}</p>
      </div>

      <div className="flex flex-col items-center px-5 pt-5 pb-4 gap-3 border-b border-orange-50/80 dark:border-slate-800/80">
        <img
          src="/images/avatar_huyen.jpg"
          alt={`${PROFILE.name} — ${PROFILE.program}, VNU-HSB`}
          className="w-28 h-36 rounded-2xl object-cover object-center shadow-md ring-4 ring-[#fed7aa] dark:ring-[#451a03]"
          width={112}
          height={144}
        />
        <div className="text-center space-y-0.5 w-full">
          <p className="text-base font-black text-[#ea580c] dark:text-orange-200 font-sans uppercase tracking-tight">
            {PROFILE.name}
          </p>
          <p className="text-[11px] font-bold text-[#f97316] dark:text-orange-400 flex items-center justify-center gap-1">
            <GraduationCap className="w-3.5 h-3.5 shrink-0" aria-hidden />
            {PROFILE.program}
          </p>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold leading-snug">{PROFILE.school}</p>
        </div>
        <img
          src="/images/logo_hsb.jpg"
          alt="Logo VNU-HSB"
          className="h-16 w-auto object-contain mt-1.5 opacity-95 dark:brightness-95"
          width={100}
          height={64}
        />
      </div>

      <div className="px-5 py-3 grid grid-cols-2 gap-2 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/30">
        {[
          { value: '7', label: 'Bài tập' },
          { value: '2026', label: 'Năm học' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="text-center py-2 rounded-xl bg-white dark:bg-[#180b02]/60 border border-[#fed7aa]/80 dark:border-orange-900/50 shadow-xs"
          >
            <span className="block text-lg font-black text-[#ea580c] dark:text-orange-300 leading-none">{stat.value}</span>
            <span className="text-[8px] font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">{stat.label}</span>
          </div>
        ))}
      </div>

      <ul className="px-5 py-3 space-y-2.5 border-b border-slate-100 dark:border-slate-800/80 text-[11px] font-semibold text-slate-600 dark:text-slate-300">
        <li className="flex items-start gap-2">
          <span className="w-7 h-7 rounded-lg bg-orange-50 dark:bg-orange-950/50 flex items-center justify-center shrink-0">
            <BookOpen className="w-3.5 h-3.5 text-[#f97316] dark:text-orange-400" aria-hidden />
          </span>
          <span>
            MSSV: <strong className="text-slate-800 dark:text-slate-200">{PROFILE.studentId}</strong>
          </span>
        </li>
        <li className="flex items-start gap-2">
          <span className="w-7 h-7 rounded-lg bg-orange-50 dark:bg-orange-950/50 flex items-center justify-center shrink-0">
            <Mail className="w-3.5 h-3.5 text-[#f97316] dark:text-orange-400" aria-hidden />
          </span>
          <a
            href={mailHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#ea580c] dark:text-orange-400 font-bold hover:underline break-all"
          >
            {PROFILE.email}
          </a>
        </li>
        <li className="flex items-start gap-2">
          <span className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
            <MapPin className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" aria-hidden />
          </span>
          <span className="leading-snug">{PROFILE.location}</span>
        </li>
      </ul>

      <div className="p-4 mt-auto flex flex-col gap-2 bg-white dark:bg-[#030d1a]/90">
        <a
          href="#du-an"
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#ea580c] hover:bg-[#c2410c] text-white text-xs font-black shadow-md hover:shadow-lg transition-all border-2 border-[#ea580c]"
        >
          Khám phá 7 bài tập
          <ArrowRight className="w-4 h-4" aria-hidden />
        </a>
        <a
          href={mailHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border-2 border-[#fed7aa] dark:border-orange-900 bg-white dark:bg-[#180b02] text-[#ea580c] dark:text-orange-300 text-xs font-bold hover:bg-[#ffedd5] dark:hover:bg-orange-950 transition-colors"
        >
          <Mail className="w-4 h-4" aria-hidden />
          Gửi VNU Gmail
        </a>
      </div>
    </aside>
  );
}
