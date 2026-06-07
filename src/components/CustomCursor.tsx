import { useEffect, useRef } from 'react';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const isVisible = useRef(false);

  useEffect(() => {
    // Only activate on pointer-fine devices (desktop)
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const dot = dotRef.current;
    const follower = followerRef.current;
    if (!dot || !follower) return;

    let mouseX = -100;
    let mouseY = -100;
    let followerX = -100;
    let followerY = -100;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible.current) {
        isVisible.current = true;
        dot.style.opacity = '1';
        follower.style.opacity = '1';
        followerX = mouseX;
        followerY = mouseY;
      }

      dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
    };

    const onMouseLeave = () => {
      dot.style.opacity = '0';
      follower.style.opacity = '0';
      isVisible.current = false;
    };

    const onMouseEnter = () => {
      dot.style.opacity = '1';
      follower.style.opacity = '1';
      isVisible.current = true;
    };

    const animate = () => {
      followerX += (mouseX - followerX) * 0.1;
      followerY += (mouseY - followerY) * 0.1;
      follower.style.transform = `translate(${followerX - 20}px, ${followerY - 20}px)`;
      rafId = requestAnimationFrame(animate);
    };

    const onMouseEnterInteractive = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      const label = target.getAttribute('data-cursor-label');
      if (label) {
        follower.setAttribute('data-label', label);
        follower.classList.add('has-label');
      } else {
        follower.classList.add('cursor-expanded');
      }
    };

    const onMouseLeaveInteractive = () => {
      follower.classList.remove('cursor-expanded', 'has-label');
      follower.removeAttribute('data-label');
    };

    const attachInteractiveListeners = () => {
      document.querySelectorAll('a, button, [data-cursor-expand], input, select, textarea, [data-cursor-label]').forEach(el => {
        el.removeEventListener('mouseenter', onMouseEnterInteractive);
        el.removeEventListener('mouseleave', onMouseLeaveInteractive);
        el.addEventListener('mouseenter', onMouseEnterInteractive);
        el.addEventListener('mouseleave', onMouseLeaveInteractive);
      });
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    rafId = requestAnimationFrame(animate);
    attachInteractiveListeners();

    const mutationObs = new MutationObserver(attachInteractiveListeners);
    mutationObs.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(rafId);
      mutationObs.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={followerRef} className="cursor-follower" aria-hidden="true" />
    </>
  );
}
