import { useEffect, useMemo, useState } from 'react';
import { ChevronDown, ClipboardCheck } from 'lucide-react';
import {
  VNU_RUBRIC_TITLE,
  type RubricSection,
  getLessonRubricSections,
  SUMMARY_RUBRIC_SECTION,
  PORTFOLIO_RUBRIC_SECTION,
  countSectionItems,
  countCheckedInSections,
  loadRubricChecks,
  saveRubricChecks,
} from '../data/vnu-rubric';

type RubricChecklistProps =
  | {
      variant: 'lesson';
      lessonIndex: number;
      lessonLabel: string;
    }
  | {
      variant: 'summary';
    }
  | {
      variant: 'portfolio';
    };

function RubricSectionBlock({
  section,
  sectionNumber,
  checks,
  onToggle,
  defaultOpen,
}: {
  section: RubricSection;
  sectionNumber: number;
  checks: Record<string, boolean>;
  onToggle: (id: string) => void;
  defaultOpen: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const done = section.items.filter((item) => checks[item.id]).length;

  return (
    <div className="border border-orange-100/50 dark:border-indigo-950/50 rounded-xl bg-white/70 dark:bg-slate-900/60 overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-start gap-2 p-3 sm:p-3.5 text-left hover:bg-orange-50/40 dark:hover:bg-slate-800/40 transition-colors cursor-pointer"
        aria-expanded={open}
      >
        <span className="w-7 h-7 rounded-lg bg-orange-600 dark:bg-orange-700 text-white text-[11px] font-black flex items-center justify-center shrink-0">
          {sectionNumber}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs sm:text-sm font-extrabold text-orange-950 dark:text-orange-200 leading-snug">
              {section.title}
            </span>
            <span className="text-[9px] font-black uppercase tracking-wide text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/30 border border-teal-100/80 dark:border-teal-900/40 px-2 py-0.5 rounded-md">
              {section.levelLabel}
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 italic mt-1 leading-relaxed">{section.focus}</p>
          <p className="text-[10px] font-bold text-orange-500 dark:text-orange-400 mt-1">
            {done}/{section.items.length} tiêu chí đã đối chiếu
          </p>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-slate-400 dark:text-slate-500 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
          aria-hidden
        />
      </button>

      {open && (
        <ul className="px-3 pb-3 space-y-1.5 border-t border-orange-50 dark:border-slate-800/80">
          {section.items.map((item) => (
            <li key={item.id}>
              <label className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-50/80 dark:hover:bg-slate-800/40 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={!!checks[item.id]}
                  onChange={() => onToggle(item.id)}
                  className="mt-0.5 w-4 h-4 rounded border-orange-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-orange-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 cursor-pointer"
                />
                <span className="flex-1 min-w-0 text-xs sm:text-sm leading-relaxed">
                  <span className="font-bold text-slate-800 dark:text-slate-200">{item.label}:</span>{' '}
                  <span className="text-slate-600 dark:text-slate-400 font-medium">{item.description}</span>
                </span>
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function RubricChecklist(props: RubricChecklistProps) {
  const sections = useMemo((): RubricSection[] => {
    if (props.variant === 'lesson') {
      return getLessonRubricSections(props.lessonIndex);
    }
    if (props.variant === 'summary') {
      return [SUMMARY_RUBRIC_SECTION];
    }
    return [PORTFOLIO_RUBRIC_SECTION];
  }, [props]);

  const subtitle = useMemo(() => {
    if (props.variant === 'lesson') {
      return `Đối chiếu Rubric — ${props.lessonLabel}`;
    }
    if (props.variant === 'summary') {
      return 'Đối chiếu Rubric — Trang Tổng kết';
    }
    return 'Đối chiếu Rubric — Cấu trúc Portfolio';
  }, [props]);

  const sectionNumbers = useMemo(() => {
    if (props.variant === 'lesson') {
      return [props.lessonIndex + 2];
    }
    if (props.variant === 'summary') {
      return [9];
    }
    return [1];
  }, [props]);

  const [checks, setChecks] = useState<Record<string, boolean>>(() => loadRubricChecks());

  useEffect(() => {
    const refresh = () => setChecks(loadRubricChecks());
    refresh();
    window.addEventListener('rubric-checks-updated', refresh);
    return () => window.removeEventListener('rubric-checks-updated', refresh);
  }, []);

  const toggle = (id: string) => {
    setChecks((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      saveRubricChecks(next);
      return next;
    });
  };

  const total = countSectionItems(sections);
  const done = countCheckedInSections(sections, checks);

  return (
    <div
      className="rubric-checklist glass-panel rounded-2xl border border-orange-100/40 dark:border-indigo-900/30 p-4 sm:p-5 space-y-3 print:border print:border-slate-300"
      data-print-section="rubric"
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <ClipboardCheck className="w-5 h-5 text-orange-600 dark:text-orange-400 shrink-0" aria-hidden />
          <div>
            <h5 className="text-orange-900 dark:text-orange-200 text-xs sm:text-sm font-extrabold uppercase tracking-wider font-sans">
              {VNU_RUBRIC_TITLE}
            </h5>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold mt-0.5">
              {subtitle} · {done}/{total} tiêu chí
            </p>
          </div>
        </div>
        <span className="no-print text-[9px] font-bold text-orange-600 dark:text-orange-300 bg-white/80 dark:bg-slate-850 px-2 py-1 rounded-lg border border-orange-100 dark:border-slate-700">
          Lưu trên trình duyệt
        </span>
      </div>

      <div className="space-y-2.5">
        {sections.map((section, i) => (
          <RubricSectionBlock
            key={section.id}
            section={section}
            sectionNumber={sectionNumbers[i] ?? i + 1}
            checks={checks}
            onToggle={toggle}
            defaultOpen
          />
        ))}
      </div>

      <p className="text-[10px] text-slate-400 dark:text-slate-500 italic leading-relaxed border-t border-orange-100/40 dark:border-slate-800/80 pt-2 print:text-slate-600">
        * Checklist đặt đúng vị trí nội dung: mục Portfolio ở Lời mở đầu, mục 2–7 tại từng bài, mục 8 ở
        Tổng kết. Xem bản đồ tiến độ 8 mục ở đầu phần Bài tập thực hành.
      </p>
    </div>
  );
}
