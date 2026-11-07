import { useState } from 'react';
import { ChevronDown, Github, Layers3 } from 'lucide-react';

import { ProjectItem } from '@/lib/types/project';
import { ExpandableText } from '@/components/ui/ExpandableText';
import { ImageCarousel } from '@/components/ui/ImageCarousel';
import { ProjectDetails } from '@/components/ui/ProjectDetails';
import { ProjectLinks } from '@/components/ui/ProjectLinks';
import { ProjectStack } from '@/components/ui/ProjectStack';
import { useTranslation } from '@/lib/hooks/useTranslation';

interface ProjectRowProps {
  project: ProjectItem;
  index: number;
}

export const ProjectRow = ({ project, index }: ProjectRowProps) => {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const { t } = useTranslation();

  const detailsId = `${project.id}-row-details`;
  const hasDetails = Boolean(
    project.architecture?.trim() ||
    project.techDecisions?.trim() ||
    project.problemsSolved?.trim() ||
    project.learnings?.trim() ||
    project.metrics?.trim(),
  );

  const hasImages = project.images.length > 0;

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-border/80 bg-surface transition-all duration-300 hover:border-primary/25 hover:shadow-xl hover:shadow-black/3 dark:border-border-dark dark:bg-surface-dark dark:hover:border-primary-dark/25">
      <div className="p-5 sm:p-6 lg:p-7">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <span className="font-space text-xs font-semibold tabular-nums tracking-wider text-primary dark:text-primary-dark">
              {String(index + 1).padStart(2, '0')}
            </span>

            <span className="h-px w-7 bg-border dark:bg-border-dark" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-text-light dark:text-text-light-dark">
              Project
            </span>
          </div>

          {hasDetails && (
            <button
              type="button"
              onClick={() => setDetailsOpen((value) => !value)}
              aria-expanded={detailsOpen}
              aria-controls={detailsId}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-[11px] font-semibold text-text-light transition-all duration-200 hover:border-primary/30 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:border-border-dark dark:bg-surface-dark dark:text-text-light-dark dark:hover:text-primary-dark"
            >
              {detailsOpen ? t('hideDetails') : t('showDetails')}

              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-300 ${
                  detailsOpen ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              />
            </button>
          )}
        </div>

        <div className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(260px,0.85fr)] lg:gap-8">
          <div className="flex min-w-0 flex-col">
            <h3 className="font-display text-2xl font-semibold leading-tight tracking-tight text-text transition-colors duration-200 group-hover:text-primary dark:text-text-dark dark:group-hover:text-primary-dark sm:text-3xl">
              {project.title}
            </h3>

            <div className="mt-3 max-w-[65ch]">
              <ExpandableText
                text={project.description}
                clampClassName="line-clamp-3"
                className="text-sm leading-7 text-text-light dark:text-text-light-dark"
                buttonClassName="mt-2 inline-flex items-center gap-1 rounded-control text-xs font-semibold text-primary transition-colors duration-200 hover:text-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:text-primary-dark dark:hover:text-primary-dark/80"
              />
            </div>

            <div className="mt-6">
              <div className="mb-3 flex items-center gap-2">
                <Layers3
                  className="h-3.5 w-3.5 text-primary dark:text-primary-dark"
                  aria-hidden="true"
                />

                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-text-light dark:text-text-light-dark">
                  Tech stack
                </span>
              </div>

              <ProjectStack technologies={project.technologies} limit={6} />
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-2">
              <ProjectLinks
                githubUrl={project.githubUrl}
                demoUrl={project.demoUrl}
                compact
              />
            </div>
          </div>

          {hasImages && (
            <div className="relative min-w-0">
              <div className="aspect-16/10 w-full overflow-hidden rounded-xl border border-border/70 bg-background shadow-sm dark:border-border-dark dark:bg-background-dark">
                <ImageCarousel images={project.images} />
              </div>
            </div>
          )}
        </div>
      </div>

      <div
        id={detailsId}
        aria-hidden={!detailsOpen}
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
          detailsOpen
            ? 'grid-rows-[1fr] opacity-100'
            : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="border-t border-border/80 px-5 pb-6 sm:px-6 sm:pb-7 lg:px-7 dark:border-border-dark">
            <ProjectDetails project={project} id={`${detailsId}-content`} />
          </div>
        </div>
      </div>

      <div
        className={`h-0.5 origin-left bg-primary transition-transform duration-500 dark:bg-primary-dark ${
          detailsOpen ? 'scale-x-100' : 'scale-x-0'
        }`}
      />
    </article>
  );
};
