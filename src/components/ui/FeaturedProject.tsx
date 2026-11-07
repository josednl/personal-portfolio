import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { ProjectItem } from '@/lib/types/project';
import { ExpandableText } from '@/components/ui/ExpandableText';
import { ImageCarousel } from '@/components/ui/ImageCarousel';
import { ProjectDetails } from '@/components/ui/ProjectDetails';
import { ProjectLinks } from '@/components/ui/ProjectLinks';
import { ProjectStack } from '@/components/ui/ProjectStack';
import { useTranslation } from '@/lib/hooks/useTranslation';

interface FeaturedProjectProps {
  project: ProjectItem;
}

export const FeaturedProject = ({ project }: FeaturedProjectProps) => {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const { t } = useTranslation();
  const detailsId = `${project.id}-featured-details`;
  const hasDetails = Boolean(
    project.architecture ||
      project.techDecisions ||
      project.problemsSolved ||
      project.learnings ||
      project.metrics,
  );

  return (
    <article className="overflow-hidden rounded-card border border-border bg-surface shadow-soft dark:border-border-dark dark:bg-surface-dark">
      <div className="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <div className="flex flex-col p-6 sm:p-8 lg:p-10">
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-text-light dark:text-text-light-dark">
            <span className="h-px w-8 bg-primary" aria-hidden="true" />
            {t('featuredProject')}
          </p>

          <h3 className="mt-6 text-balance font-display text-3xl font-semibold text-text dark:text-text-dark">
            {project.title}
          </h3>

          <div className="mt-3">
            <ExpandableText
              text={project.description}
              clampClassName="line-clamp-3"
              className="max-w-[60ch] text-sm leading-relaxed text-text-light dark:text-text-light-dark"
              buttonClassName="mt-2 inline-flex items-center gap-1 rounded-control text-xs font-semibold text-primary transition-colors duration-200 hover:text-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:text-primary-dark dark:hover:text-primary-dark/80"
            />
          </div>

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
            </div>
          )}
        </div>

        <div className="bg-background p-3 dark:bg-background-dark sm:p-4 lg:border-l lg:border-border lg:p-5 lg:dark:border-border-dark">
          <div className="aspect-4/3 w-full overflow-hidden rounded-control lg:h-full lg:aspect-auto">
            <ImageCarousel images={project.images} />
          </div>
        </div>
      </div>

      {hasDetails && detailsOpen && (
        <div className="px-6 pb-6 sm:px-8 sm:pb-8 lg:px-10 lg:pb-10">
          <ProjectDetails project={project} id={detailsId} />
        </div>
      )}
    </article>
  );
};
