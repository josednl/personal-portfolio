import { useEffect, type RefObject } from 'react';
import { FOCUSABLE_SELECTOR } from '@/lib/hooks/useFocusTrap';

export const useArrowKeyNavigation = <T extends HTMLElement>(
  isActive: boolean,
  containerRef: RefObject<T | null>,
) => {
  useEffect(() => {
    if (!isActive) return;

    const container = containerRef.current;
    if (!container) return;

    const getFocusable = () =>
      Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));

    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.defaultPrevented ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey
      ) {
        return;
      }

      const target = event.target;
      if (
        target instanceof HTMLElement &&
        target.matches('input, textarea, select, [contenteditable="true"]')
      ) {
        return;
      }

      const isNext = event.key === 'ArrowDown' || event.key === 'ArrowRight';
      const isPrevious = event.key === 'ArrowUp' || event.key === 'ArrowLeft';

      if (
        !isNext &&
        !isPrevious &&
        event.key !== 'Home' &&
        event.key !== 'End'
      ) {
        return;
      }

      const focusable = getFocusable();
      if (focusable.length === 0) return;

      event.preventDefault();
      event.stopPropagation();

      const activeIndex = focusable.indexOf(
        document.activeElement as HTMLElement,
      );
      let nextIndex: number;

      if (event.key === 'Home') {
        nextIndex = 0;
      } else if (event.key === 'End') {
        nextIndex = focusable.length - 1;
      } else if (isNext) {
        nextIndex =
          activeIndex < 0 || activeIndex === focusable.length - 1
            ? 0
            : activeIndex + 1;
      } else {
        nextIndex = activeIndex <= 0 ? focusable.length - 1 : activeIndex - 1;
      }

      focusable[nextIndex]?.focus();
    };

    container.addEventListener('keydown', handleKeyDown);

    return () => container.removeEventListener('keydown', handleKeyDown);
  }, [containerRef, isActive]);
};
