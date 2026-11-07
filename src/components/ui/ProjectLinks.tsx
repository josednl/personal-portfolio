import { Github, ArrowUpRight } from 'lucide-react';
import { useTranslation } from '@/lib/hooks/useTranslation';

interface ProjectLinksProps {
  githubUrl?: string;
  demoUrl?: string;
  compact?: boolean;
}

export const ProjectLinks = ({
  githubUrl,
  demoUrl,
  compact = false,
}: ProjectLinksProps) => {
  const { t } = useTranslation();
  const sizeClass = compact
    ? 'px-3 py-2 text-xs'
    : 'px-4 py-2.5 text-sm';

  if (!githubUrl && !demoUrl) return null;

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {demoUrl && (
        <a
          href={demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 rounded-control bg-primary font-semibold text-white shadow-soft transition-colors duration-200 hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 active:translate-y-px ${sizeClass}`}
        >
          {t('demo')}
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
      )}
      {githubUrl && (
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 rounded-control border border-border bg-surface font-semibold text-text transition-colors duration-200 hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 active:translate-y-px dark:border-border-dark dark:bg-surface-dark dark:text-text-dark dark:hover:text-primary-dark ${sizeClass}`}
        >
          <Github className="h-4 w-4" aria-hidden="true" />
          GitHub
        </a>
      )}
    </div>
  );
};
