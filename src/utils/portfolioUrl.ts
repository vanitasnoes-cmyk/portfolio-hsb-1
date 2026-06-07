export type PortfolioView = 'dashboard' | 'gallery';

export interface PortfolioUrlState {
  /** 0-based lesson index (Bài 1 → 0) */
  lessonIndex: number | null;
  view: PortfolioView;
  /** 0-based step index within lesson */
  stepIndex: number | null;
}

const VIEW_KEY = 'view';
const STEP_KEY = 'step';
export const PORTFOLIO_LESSON_HASH_RE = /^#bai-(\d+)(?:-step-(\d+))?$/i;

const HASH_BAI = PORTFOLIO_LESSON_HASH_RE;

export function parsePortfolioUrl(href = window.location.href): PortfolioUrlState {
  const url = new URL(href);
  const hashMatch = url.hash.match(HASH_BAI);

  let lessonIndex: number | null = null;
  let stepIndex: number | null = null;

  if (hashMatch) {
    const bai = parseInt(hashMatch[1], 10);
    if (bai >= 1 && bai <= 6) lessonIndex = bai - 1;
    if (hashMatch[2]) {
      const step = parseInt(hashMatch[2], 10);
      if (step >= 1) stepIndex = step - 1;
    }
  }

  const viewParam = url.searchParams.get(VIEW_KEY);
  /** Không có tham số view → gallery (trang chủ), tránh nhảy Dashboard khi mới vào */
  const view: PortfolioView =
    viewParam === 'gallery' || viewParam === 'dashboard' ? viewParam : 'gallery';

  if (stepIndex == null) {
    const stepParam = url.searchParams.get(STEP_KEY);
    if (stepParam) {
      const step = parseInt(stepParam, 10);
      if (step >= 1) stepIndex = step - 1;
    }
  }

  return { lessonIndex, view, stepIndex };
}

export function buildPortfolioUrl(
  lessonIndex: number | null,
  view: PortfolioView,
  stepIndex: number | null = null,
): string {
  const params = new URLSearchParams();
  if (view === 'gallery') params.set(VIEW_KEY, 'gallery');
  if (stepIndex != null && stepIndex >= 0 && lessonIndex == null) {
    params.set(STEP_KEY, String(stepIndex + 1));
  }

  let hash = '';
  if (lessonIndex != null && lessonIndex >= 0 && lessonIndex <= 5) {
    const bai = lessonIndex + 1;
    hash =
      stepIndex != null && stepIndex >= 0
        ? `#bai-${bai}-step-${stepIndex + 1}`
        : `#bai-${bai}`;
  }

  const query = params.toString();
  return `${window.location.pathname}${query ? `?${query}` : ''}${hash}`;
}

export function getFullPortfolioUrl(
  lessonIndex: number,
  view: PortfolioView,
  stepIndex: number | null = null,
): string {
  return `${window.location.origin}${buildPortfolioUrl(lessonIndex, view, stepIndex)}`;
}

export function applyPortfolioUrl(state: PortfolioUrlState, replace = true): void {
  const url = buildPortfolioUrl(state.lessonIndex, state.view, state.stepIndex);
  if (replace) {
    window.history.replaceState(null, '', url);
  } else {
    window.history.pushState(null, '', url);
  }
}

export function stepTitleFromText(text: string, maxLen = 48): string {
  const stripped = text.replace(/^\d+\.\s*/, '').trim();
  const colon = stripped.indexOf(':');
  const head = colon > 0 ? stripped.slice(0, colon) : stripped;
  if (head.length <= maxLen) return head;
  return `${head.slice(0, maxLen - 1)}…`;
}
