import { useEffect, useRef, type RefObject } from 'react';

export const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

interface FocusTrapOptions {
  onClose: () => void;
  restoreFocus?: boolean;
  restoreFocusTo?: RefObject<HTMLElement | null>;
}

export const useFocusTrap = <T extends HTMLElement>(
  isActive: boolean,
  containerRef: RefObject<T | null>,
  { onClose, restoreFocus = true, restoreFocusTo }: FocusTrapOptions,
) => {
  const onCloseRef = useRef(onClose);
  const restoreFocusRef = useRef(restoreFocus);
  const restoreFocusToRef = useRef(restoreFocusTo);

  useEffect(() => {
    onCloseRef.current = onClose;
    restoreFocusRef.current = restoreFocus;
    restoreFocusToRef.current = restoreFocusTo;
  }, [onClose, restoreFocus, restoreFocusTo]);

  useEffect(() => {
    if (!isActive) return;

    const container = containerRef.current;
    if (!container) return;

    const previouslyFocused =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const getFocusable = () =>
      Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));

    const focusFirst = () => {
      const [first] = getFocusable();
      first?.focus();
    };

    const frame = window.requestAnimationFrame(focusFirst);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onCloseRef.current();
        return;
      }

      if (event.key !== 'Tab') return;

      const focusable = getFocusable();
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const activeElement = document.activeElement;

      if (!container.contains(activeElement)) {
        event.preventDefault();
        first.focus();
        return;
      }

      if (event.shiftKey && activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener('keydown', handleKeyDown);

      const focusTarget =
        restoreFocusToRef.current?.current ?? previouslyFocused;

      if (restoreFocusRef.current && focusTarget?.isConnected) {
        focusTarget.focus();
      }
    };
  }, [containerRef, isActive]);
};
