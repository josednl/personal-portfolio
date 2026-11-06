export const SECTIONS = [
  { id: 'about', labelKey: 'navAbout' as const },
  { id: 'skills', labelKey: 'navSkills' as const },
  { id: 'projects', labelKey: 'navProjects' as const },
  { id: 'work', labelKey: 'navWork' as const },
  { id: 'education', labelKey: 'navEducation' as const },
  { id: 'contact', labelKey: 'navContact' as const },
] as const;

export type SectionId = (typeof SECTIONS)[number]['id'];

export const scrollToSection = (id: SectionId) => {
  const target = document.getElementById(id);
  if (!target) return;

  const prefersReducedMotion =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  target.scrollIntoView({
    behavior: prefersReducedMotion ? 'auto' : 'smooth',
    block: 'start',
  });

  if (window.location.hash !== `#${id}`) {
    window.history.replaceState(null, '', `#${id}`);
  }

  window.setTimeout(() => {
    const heading = target.querySelector<HTMLElement>('h1, h2');
    const focusTarget = heading ?? target;
    focusTarget.focus({ preventScroll: true });
  }, 0);
};
