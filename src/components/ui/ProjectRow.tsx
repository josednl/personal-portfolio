import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { ProjectItem } from '@/lib/types/project';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import { ProjectDetails } from '@/components/ui/ProjectDetails';
import { ProjectLinks } from '@/components/ui/ProjectLinks';
import { ProjectStack } from '@/components/ui/ProjectStack';
import { getProjectHighlight } from '@/lib/projects';
import { useTranslation } from '@/lib/hooks/useTranslation';

interface ProjectRowProps {
  project: ProjectItem;
  index: number;
}

export const ProjectRow = ({ project, index }: ProjectRowProps) => {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const { t } = useTranslation();
  const highlight = getProjectHighlight(project);
  const detailsId = `${project.id}-row-details`;
  const hasDetails = Boolean(
    project.architecture ||
      project.techDecisions ||
      project.problemsSolved ||
      project.learnings,
  );

  const highlightLabel =
    highlight.kind === 'result'
      ? t('projectResult')
      : highlight.kind === 'decision'
        ? t('projectDecision')
        : t('projectSummary');

  return (
    <article className="overflow-hidden rounded-card border border-border bg-surface shadow-soft dark:border-border-dark dark:bg-surface-dark md:rounded-none md:border-x-0 md:border-b-0 md:border-t md:bg-transparent md:shadow-none md:first:border-t-0 dark:md:bg-transparent">
      <div className="p-5 md:grid md:grid-cols-[2.5rem_minmax(0,1fr)_auto] md:items-start md:gap-6 md:p-6">
        <span
          className="font-space text-xs font-medium tabular-nums text-text-light dark:text-text-light-dark"
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        <div className="mt-2 min-w-0 md:mt-0">
          <h3 className="font-display text-xl font-semibold text-text dark:text-text-dark">
            {project.title}
          </h3>

          <div className="mt-2">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-primary dark:text-primary-dark">
              {highlightLabel}
            </p>
            <p className="mt-1 line-clamp-2 max-w-[68ch] text-sm leading-relaxed text-text-light dark:text-text-light-dark">
              {highlight.text}
            </p>
          </div>

          <div className="mt-4">
            <ProjectStack
              technologies={project.technologies}
              limit={6}
            />
          </div>

          {hasDetails && (
            <button
              type="button"
              onClick={() => setDetailsOpen((value) => !value)}
              aria-expanded={detailsOpen}
              aria-controls={detailsId}
              className="mt-4 inline-flex items-center gap-1.5 rounded-control text-xs font-semibold text-text transition-colors duration-200 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:text-text-dark dark:hover:text-primary-dark"
            >
              {detailsOpen ? t('hideDetails') : t('showDetails')}
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-200 ${
                  detailsOpen ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              />
            </button>
          )}

          {project.images[0] && (
            <div className="mt-5 overflow-hidden rounded-control border border-border bg-background dark:border-border-dark dark:bg-background-dark md:hidden">
              <OptimizedImage
                src={project.images[0]}
                alt={project.title}
                width={640}
                height={360}
                className="aspect-video w-full object-cover"
              />
            </div>
          )}
        </div>

        <div className="mt-4 md:mt-0 md:justify-self-end">
          <ProjectLinks
            githubUrl={project.githubUrl}
            demoUrl={project.demoUrl}
            compact
          />
        </div>
      </div>

      {detailsOpen && (
        <div className="px-5 pb-5 md:px-6 md:pb-6">
          <ProjectDetails project={project} id={detailsId} />
        </div>
      )}
    </article>
  );
};
