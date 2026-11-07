import { useId, useLayoutEffect, useRef, useState } from 'react';
import { useTranslation } from '@/lib/hooks/useTranslation';

interface ExpandableTextProps {
  text: string;
  clampClassName: string;
  className?: string;
  buttonClassName?: string;
}

export const ExpandableText = ({
  text,
  clampClassName,
  className = '',
  buttonClassName = '',
}: ExpandableTextProps) => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const [canExpand, setCanExpand] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);
  const textId = useId();

  useLayoutEffect(() => {
    const element = textRef.current;
    if (!element || expanded) return;

    const checkOverflow = () => {
      setCanExpand(element.scrollHeight - element.clientHeight > 1);
    };

    checkOverflow();

    if (typeof ResizeObserver === 'undefined') return;

    const observer = new ResizeObserver(checkOverflow);
    observer.observe(element);
    return () => observer.disconnect();
  }, [text, expanded]);

  return (
    <div>
      <p
        ref={textRef}
        id={textId}
        className={`${className} ${expanded ? '' : clampClassName}`}
      >
        {text}
      </p>

      {canExpand && (
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
          aria-controls={textId}
          className={buttonClassName}
        >
          {expanded ? t('readLess') : t('readMore')}
        </button>
      )}
    </div>
  );
};
