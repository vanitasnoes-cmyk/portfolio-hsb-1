import { useEffect, useRef, useState } from 'react';

interface ScrollHighlightSectionProps {
  children: React.ReactNode;
  className?: string;
  /** Intersection ratio needed to become active (0-1). Default 0.25 */
  threshold?: number;
  /** Shrink viewport for trigger zone. Default '-10% 0px -10% 0px' */
  rootMargin?: string;
  /** Initially active (e.g. first section in view on page load) */
  defaultActive?: boolean;
  as?: React.ElementType;

}

/**
 * Wraps content so it highlights (dark, full opacity) when scrolled into view,
 * and fades to gray when out of the reading zone.
 * Mimics the Spencer Gabor "scroll spotlight" reading effect.
 */
export function ScrollHighlightSection({
  children,
  className = '',
  threshold = 0.25,
  rootMargin = '-8% 0px -8% 0px',
  defaultActive = false,
  as: Tag = 'div',
}: ScrollHighlightSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(defaultActive);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Use a small hysteresis: activate at threshold, deactivate below threshold/2
        if (entry.intersectionRatio >= threshold) {
          setIsActive(true);
        } else if (entry.intersectionRatio < threshold * 0.5) {
          setIsActive(false);
        }
      },
      {
        threshold: Array.from({ length: 21 }, (_, i) => i * 0.05), // 0, 0.05, 0.1, ..., 1.0
        rootMargin,
      },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const ElementTag = Tag as React.ElementType;

  return (
    <ElementTag
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`scroll-hl ${isActive ? 'scroll-hl-active' : 'scroll-hl-inactive'} ${className}`}
    >
      {children}
    </ElementTag>
  );
}
