import { useEffect, useState } from 'react';
import { SECTIONS, type SectionId } from '@/lib/navigation';

export const useActiveSection = () => {
  const [activeSection, setActiveSection] = useState<SectionId>('about');

  useEffect(() => {
    const sections = SECTIONS.map(({ id }) => {
      const el = document.getElementById(id);
      return el ? { id, el } : null;
    }).filter(
      (section): section is { id: SectionId; el: HTMLElement } =>
        section !== null,
    );

    if (sections.length === 0) return;

    const observer =
      typeof IntersectionObserver === 'function'
        ? new IntersectionObserver(
            (entries) => {
              const visible = entries
                .filter((entry) => entry.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

              if (visible[0]) {
                setActiveSection(visible[0].target.id as SectionId);
              }
            },
            {
              rootMargin: '-35% 0px -55% 0px',
              threshold: [0, 0.25, 0.5, 1],
            },
          )
        : null;

    sections.forEach(({ el }) => observer?.observe(el));

    const endSentinel = document.getElementById('page-end');
    const endObserver =
      typeof IntersectionObserver === 'function' && endSentinel
        ? new IntersectionObserver((entries) => {
            if (entries.some((entry) => entry.isIntersecting)) {
              setActiveSection(sections[sections.length - 1].id);
            }
          })
        : null;

    if (endSentinel) {
      endObserver?.observe(endSentinel);
    }

    return () => {
      observer?.disconnect();
      endObserver?.disconnect();
    };
  }, []);

  return { activeSection, setActiveSection };
};
