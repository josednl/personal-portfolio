import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { ProjectItem } from '@/lib/types/project';
import { ImageCarousel } from '@/components/ui/ImageCarousel';
import { ProjectDetails } from '@/components/ui/ProjectDetails';
import { ProjectLinks } from '@/components/ui/ProjectLinks';
import { ProjectStack } from '@/components/ui/ProjectStack';
import { getProjectHighlight } from '@/lib/projects';
import { useTranslation } from '@/lib/hooks/useTranslation';

interface FeaturedProjectProps {
  project: ProjectItem;
}

export const FeaturedProject = ({ project }: FeaturedProjectProps) => {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const { t } = useTranslation();
  const highlight = getProjectHighlight(project);
  const detailsId = `${project.id}-featured-details`;
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
    <article className="overflow-hidden rounded-card border border-border bg-surface shadow-soft dark:border-border-dark dark:bg-surface-dark">
      <div className="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <div className="flex flex-col p-6 sm:p-8 lg:p-10">
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-text-light dark:text-text-light-dark">
            <span className="h-px w-8 bg-primary" aria-hidden="true" />
            {t('featuredProject')}
          </p>

          <div className="mt-6 border-l-2 border-primary pl-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary dark:text-primary-dark">
              {highlightLabel}
            </p>
            <p className="mt-2 max-w-[48ch] font-display text-xl leading-snug text-text dark:text-text-dark md:text-2xl">
              {highlight.text}
            </p>
          </div>

          <h3 className="mt-7 text-balance font-display text-3xl font-semibold text-text dark:text-text-dark">
            {project.title}
          </h3>

          <p className="mt-3 max-w-[60ch] text-sm leading-relaxed text-text-light dark:text-text-light-dark">
            {project.description}
          </p>

          <div className="mt-6">
            <ProjectStack technologies={project.technologies} />
          </div>

          <div className="mt-8">
            <ProjectLinks
              githubUrl={project.githubUrl}
              demoUrl={project.demoUrl}
            />
          </div>

          {hasDetails && (
            <div className="mt-8">
              <button
                type="button"
                onClick={() => setDetailsOpen((value) => !value)}
                aria-expanded={detailsOpen}
                aria-controls={detailsId}
                className="inline-flex items-center gap-2 rounded-control text-sm font-semibold text-text transition-colors duration-200 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:text-text-dark dark:hover:text-primary-dark"
              >
                {detailsOpen ? t('hideDetails') : t('showDetails')}
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    detailsOpen ? 'rotate-180' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>

              {detailsOpen && (
                <ProjectDetails project={project} id={detailsId} />
              )}
            </div>
          )}
        </div>

        <div className="bg-background p-3 dark:bg-background-dark sm:p-4 lg:border-l lg:border-border lg:p-5 lg:dark:border-border-dark">
          <div className="aspect-[4/3] w-full overflow-hidden rounded-control lg:h-full lg:aspect-auto">
            <ImageCarousel images={project.images} />
          </div>
        </div>
      </div>
    </article>
  );
};
