import { useState, useEffect, useRef } from 'react';
import { useTranslation } from '@/lib/hooks/useTranslation';

const SECTIONS = [
  { id: 'about', labelKey: 'navAbout' as const },
  { id: 'skills', labelKey: 'navSkills' as const },
  { id: 'projects', labelKey: 'navProjects' as const },
  { id: 'work', labelKey: 'navWork' as const },
  { id: 'education', labelKey: 'navEducation' as const },
  { id: 'contact', labelKey: 'navContact' as const },
];

export const SideNav = () => {
  const [activeSection, setActiveSection] = useState('about');
  const { t } = useTranslation();
  const isProgrammaticScroll = useRef(false);

  useEffect(() => {
    const sections = SECTIONS.map(({ id }) => ({
      id,
      el: document.getElementById(id),
    })).filter((s): s is { id: string; el: HTMLElement } => s.el !== null);

    if (sections.length === 0) return;

    const handleScroll = () => {
      if (isProgrammaticScroll.current) return;

      const viewportHeight = window.innerHeight;
      const scrollY = window.scrollY;
      const center = scrollY + viewportHeight / 2;
      const atBottom =
        scrollY + viewportHeight >=
        document.documentElement.scrollHeight - 10;

      if (atBottom) {
        setActiveSection(sections[sections.length - 1].id);
        return;
      }

      let best = sections[0].id;
      let bestDist = Infinity;

      for (const { id, el } of sections) {
        const rect = el.getBoundingClientRect();
        const sectionCenter = scrollY + rect.top + rect.height / 2;
        const dist = Math.abs(center - sectionCenter);
        if (dist < bestDist) {
          bestDist = dist;
          best = id;
        }
      }

      setActiveSection(best);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    isProgrammaticScroll.current = true;
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 800);
  };

  return (
    <nav
      aria-label="Section navigation"
      className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-3"
    >
      {SECTIONS.map(({ id, labelKey }) => {
        const isActive = activeSection === id;
        return (
          <a
            key={id}
            href={`#${id}`}
            onClick={(e) => handleClick(e, id)}
            aria-label={t(labelKey)}
            aria-current={isActive ? 'true' : undefined}
            className="group relative flex items-center"
          >
            <span
              className={`
                block rounded-full transition-all duration-300
                ${isActive
                  ? 'w-3 h-3 bg-primary'
                  : 'w-2 h-2 bg-text/30 dark:bg-white/30 hover:bg-text/50 dark:hover:bg-white/50'
                }
              `}
            />
            <span
              className={`
                absolute right-full mr-3 whitespace-nowrap text-xs font-medium
                px-2 py-1 rounded-md
                bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm
                text-text dark:text-white
                shadow-sm
                border border-gray-200 dark:border-gray-700
                transition-all duration-200
                opacity-0 translate-x-1 pointer-events-none
                group-hover:opacity-100 group-hover:translate-x-0
              `}
            >
              {t(labelKey)}
            </span>
          </a>
        );
      })}
    </nav>
  );
};
