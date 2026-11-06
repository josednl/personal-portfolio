import { useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useTranslation } from '@/lib/hooks/useTranslation';
import { useActiveSection } from '@/lib/hooks/useActiveSection';
import { useArrowKeyNavigation } from '@/lib/hooks/useArrowKeyNavigation';
import { useBodyScrollLock } from '@/lib/hooks/useBodyScrollLock';
import { useFocusTrap } from '@/lib/hooks/useFocusTrap';
import { SECTIONS, scrollToSection, type SectionId } from '@/lib/navigation';
import { GlobalControls } from '@/components/ui/GlobalControls';

export const SideNav = () => {
  const { activeSection, setActiveSection } = useActiveSection();
  const { t } = useTranslation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const mobilePanelRef = useRef<HTMLDivElement>(null);
  const mobileTriggerRef = useRef<HTMLButtonElement>(null);

  const closeMobileMenu = () => setIsMobileOpen(false);

  useFocusTrap(isMobileOpen, mobilePanelRef, {
    onClose: closeMobileMenu,
    restoreFocusTo: mobileTriggerRef,
  });
  useArrowKeyNavigation(isMobileOpen, mobilePanelRef);
  useBodyScrollLock(isMobileOpen);

  const handleNavigate = (
    event: React.MouseEvent<HTMLAnchorElement>,
    id: SectionId,
  ) => {
    event.preventDefault();
    setActiveSection(id);
    setIsMobileOpen(false);
    scrollToSection(id);
  };

  return (
    <>
      <header className="sticky top-0 z-40 -mx-6 -mt-3 mb-3 border-b border-border/80 bg-background/90 px-6 py-2.5 backdrop-blur md:hidden dark:border-border-dark/80 dark:bg-background-dark/90">
        <div className="flex items-center justify-between gap-3">
          <a
            href="#about"
            onClick={(event) => handleNavigate(event, 'about')}
            className="min-w-0 rounded-control focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <span className="block truncate font-display text-sm font-semibold tracking-[-0.01em] text-text dark:text-text-dark">
              {t('brandName')}
            </span>
            <span className="block truncate text-[10px] uppercase tracking-[0.18em] text-text-light dark:text-text-light-dark">
              {t('portfolioTitle')}
            </span>
          </a>

          <div className="flex shrink-0 items-center gap-1">
            <GlobalControls />
            <button
              ref={mobileTriggerRef}
              type="button"
              onClick={() => setIsMobileOpen(true)}
              aria-label={t('openMenu')}
              aria-expanded={isMobileOpen}
              aria-controls="mobile-navigation"
              aria-haspopup="dialog"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-text-light transition-colors duration-200 hover:bg-background hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:text-text-light-dark dark:hover:bg-background-dark dark:hover:text-text-dark"
            >
              <Menu aria-hidden="true" size={20} />
            </button>
          </div>
        </div>
      </header>

      <nav
        aria-label={t('sectionNavigation')}
        className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 md:flex"
      >
        {SECTIONS.map(({ id, labelKey }) => {
          const isActive = activeSection === id;

          return (
            <a
              key={id}
              href={`#${id}`}
              onClick={(event) => handleNavigate(event, id)}
              aria-label={t(labelKey)}
              aria-current={isActive ? 'location' : undefined}
              className="group relative flex items-center rounded-full p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <span
                aria-hidden="true"
                className={`block rounded-full transition-[width,height,background-color] duration-300 ${
                  isActive
                    ? 'h-3 w-3 bg-primary dark:bg-primary-dark'
                    : 'h-2 w-2 bg-text/30 hover:bg-text/50 dark:bg-white/30 dark:hover:bg-white/50'
                }`}
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-full mr-3 translate-x-1 whitespace-nowrap rounded-control border border-border bg-surface/95 px-2 py-1 text-xs font-medium text-text opacity-0 shadow-soft backdrop-blur-sm transition-[opacity,transform] duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 dark:border-border-dark dark:bg-surface-dark/95 dark:text-text-dark"
              >
                {t(labelKey)}
              </span>
            </a>
          );
        })}
      </nav>

      <div className="fixed right-4 top-4 z-40 hidden md:block">
        <div className="rounded-full border border-border bg-surface/85 p-1 shadow-soft backdrop-blur dark:border-border-dark dark:bg-surface-dark/85">
          <GlobalControls />
        </div>
      </div>

      {isMobileOpen && (
        <>
          <div
            aria-hidden="true"
            onClick={closeMobileMenu}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm md:hidden"
          />
          <div
            ref={mobilePanelRef}
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-navigation-title"
            className="fixed inset-x-4 bottom-6 z-50 max-h-[calc(100dvh-6rem)] overflow-y-auto overscroll-contain rounded-card border border-border bg-surface p-5 text-text shadow-soft dark:border-border-dark dark:bg-surface-dark dark:text-text-dark md:hidden"
          >
            <div className="mb-3 flex items-center justify-between border-b border-border pb-3 dark:border-border-dark">
              <p
                id="mobile-navigation-title"
                className="font-display text-lg font-semibold"
              >
                {t('menu')}
              </p>
              <button
                type="button"
                onClick={closeMobileMenu}
                aria-label={t('closeMenu')}
                className="inline-flex h-10 w-10 items-center justify-center rounded-control text-text-light transition-colors duration-200 hover:bg-background hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:text-text-light-dark dark:hover:bg-background-dark dark:hover:text-text-dark"
              >
                <X aria-hidden="true" size={20} />
              </button>
            </div>

            <nav aria-label={t('sectionNavigation')}>
              <ul className="space-y-1">
                {SECTIONS.map(({ id, labelKey }, index) => {
                  const isActive = activeSection === id;

                  return (
                    <li key={id}>
                      <a
                        href={`#${id}`}
                        onClick={(event) => handleNavigate(event, id)}
                        aria-current={isActive ? 'location' : undefined}
                        className={`flex items-center justify-between gap-3 rounded-control px-4 py-3 text-base font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                          isActive
                            ? 'bg-primary/10 text-primary dark:bg-primary-dark/15 dark:text-primary-dark'
                            : 'text-text hover:bg-background dark:text-text-dark dark:hover:bg-background-dark'
                        }`}
                      >
                        <span>{t(labelKey)}</span>
                        <span
                          aria-hidden="true"
                          className="font-space text-xs tabular-nums text-text-light dark:text-text-light-dark"
                        >
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </>
      )}
    </>
  );
};
