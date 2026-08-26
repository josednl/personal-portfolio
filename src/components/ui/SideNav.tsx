import { useState, useEffect } from 'react';
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

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        {
          rootMargin: '-50% 0px -50% 0px',
          threshold: 0,
        },
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
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
