import { useEffect, useState } from 'react';
import { Map } from 'lucide-react';
import {
  VNU_RUBRIC_SECTIONS,
  TOTAL_RUBRIC_ITEMS,
  countAllRubricChecked,
  loadRubricChecks,
  rubricSectionNumber,
} from '../data/vnu-rubric';

interface RubricProgressMapProps {
  onGoToLesson: (lessonIndex: number) => void;
}

function sectionDone(sectionId: string, checks: Record<string, boolean>): number {
  const section = VNU_RUBRIC_SECTIONS.find((s) => s.id === sectionId);
  if (!section) return 0;
  return section.items.filter((item) => checks[item.id]).length;
}

function sectionTotal(sectionId: string): number {
  return VNU_RUBRIC_SECTIONS.find((s) => s.id === sectionId)?.items.length ?? 0;
}

export function RubricProgressMap({ onGoToLesson }: RubricProgressMapProps) {
  const [checks, setChecks] = useState<Record<string, boolean>>(() => loadRubricChecks());

  useEffect(() => {
    const refresh = () => setChecks(loadRubricChecks());
    window.addEventListener('rubric-checks-updated', refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener('rubric-checks-updated', refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);

  const globalDone = countAllRubricChecked(checks);
  const globalPct = TOTAL_RUBRIC_ITEMS
    ? Math.round((globalDone / TOTAL_RUBRIC_ITEMS) * 100)
    : 0;

  const goToSection = (sectionIndex: number) => {
    if (sectionIndex === 0) {
      document.getElementById('gioi-thieu')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (sectionIndex === 8) {
      document.getElementById('tong-ket')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    onGoToLesson(sectionIndex - 1);
  };

  return (
    <div className="no-print glass-panel rounded-2xl border border-orange-100/40 dark:border-indigo-900/30 p-4 sm:p-5 space-y-3">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <Map className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0" aria-hidden />
          <div>
            <h5 className="text-orange-900 dark:text-orange-200 text-xs sm:text-sm font-extrabold uppercase tracking-wider font-sans">
              Bản đồ tiến độ Rubric (9 mục)
            </h5>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold mt-0.5">
              Tự đánh giá toàn học phần · {globalDone}/{TOTAL_RUBRIC_ITEMS} tiêu chí ({globalPct}%)
            </p>
          </div>
        </div>
      </div>

      <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 to-teal-500 transition-all duration-500"
          style={{ width: `${globalPct}%` }}
          role="progressbar"
          aria-valuenow={globalPct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Tiến độ đối chiếu Rubric"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
        {VNU_RUBRIC_SECTIONS.map((section, idx) => {
          const done = sectionDone(section.id, checks);
          const total = sectionTotal(section.id);
          const complete = done === total && total > 0;
          const num = rubricSectionNumber(section.id);

          return (
            <button
              key={section.id}
              type="button"
              onClick={() => goToSection(idx)}
              className={`flex items-center gap-2 px-2.5 py-2 rounded-xl text-left text-[11px] font-semibold transition-all cursor-pointer border ${
                complete
                  ? 'bg-emerald-50/90 dark:bg-emerald-950/20 border-emerald-200/80 dark:border-emerald-900/40 text-emerald-900 dark:text-emerald-300'
                  : 'bg-white/80 dark:bg-slate-900/60 border-slate-100 dark:border-slate-800/80 text-slate-600 dark:text-slate-300 hover:border-orange-200 dark:hover:border-orange-500/50 hover:bg-orange-50/50 dark:hover:bg-slate-850/50'
              }`}
            >
              <span
                className={`w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-black shrink-0 ${
                  complete ? 'bg-emerald-600 dark:bg-emerald-700 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                {num}
              </span>
              <span className="flex-1 min-w-0 truncate leading-tight">
                {idx === 0
                  ? 'Portfolio (UX)'
                  : idx === 8
                    ? 'Tổng kết'
                    : section.title.replace(/^Nhiệm vụ (\d+): .+$/, 'Nhiệm vụ $1')}
              </span>
              <span className="text-[10px] font-black tabular-nums shrink-0">
                {done}/{total}
              </span>
            </button>
          );
        })}
      </div>

      <p className="text-[10px] text-slate-400 dark:text-slate-550 italic leading-relaxed">
        Mục 1 → Lời mở đầu · Mục 2–8 → Bài 1–7 · Mục 9 → Tổng kết. Mỗi trang chỉ hiển thị checklist
        khớp nội dung đang xem.
      </p>
    </div>
  );
}
