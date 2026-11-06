import { useState } from 'react';
import { ProjectItem } from '@/lib/types/project';
import { ImageCarousel } from '@/components/ui/ImageCarousel';
import { Github, ExternalLink, ChevronDown } from 'lucide-react';
import { useTranslation } from '@/lib/hooks/useTranslation';
import { DetailSection } from '@/components/ui/DetailSection';
import { TechTag } from '@/components/ui/TechTag';

interface ProjectPreviewProps {
  project: ProjectItem;
}

export const ProjectPreview = ({ project }: ProjectPreviewProps) => {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const {
    title,
    description,
    images,
    demoUrl,
    githubUrl,
    technologies,
    architecture,
    techDecisions,
    metrics,
    problemsSolved,
    learnings,
  } = project;
  const { t } = useTranslation();

  const hasExtendedDetails = !!(
    architecture ||
    techDecisions ||
    metrics ||
    problemsSolved ||
    learnings
  );

  return (
    <div className="flex flex-col h-full">
      <div className="mb-6 aspect-video w-full overflow-hidden rounded-card">
        <ImageCarousel key={project.id} images={images} />
      </div>

      <h3 className="mb-3 font-display text-2xl font-semibold text-text dark:text-text-dark">
        {title}
      </h3>

      <p className="mb-5 max-w-[65ch] leading-relaxed text-text-light dark:text-text-light-dark">
        {description}
      </p>

      {technologies && technologies.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {technologies.map((tech) => (
            <TechTag key={tech} name={tech} />
          ))}
        </div>
      )}

      <div className="flex gap-3 mb-8">
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-control border border-border px-4 py-2.5 text-sm font-medium text-text transition-colors duration-200 hover:bg-background dark:border-border-dark dark:text-text-dark dark:hover:bg-background-dark"
          >
            <Github className="w-4 h-4" />
            GitHub
          </a>
        )}
        {demoUrl && (
          <a
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-control bg-primary px-4 py-2.5 text-sm font-medium text-white shadow-soft transition-colors duration-200 hover:bg-primary-hover"
          >
            <ExternalLink className="w-4 h-4" />
            {t('demo')}
          </a>
        )}
      </div>

      {hasExtendedDetails && (
        <div className="mt-auto border-t border-border pt-6 dark:border-border-dark">
          <button
            onClick={() => setDetailsOpen(!detailsOpen)}
            className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-text transition-colors duration-200 hover:text-primary dark:text-text-dark dark:hover:text-primary-dark"
          >
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${
                detailsOpen ? 'rotate-180' : ''
              }`}
            />
            {t('showDetails')}
          </button>
          {detailsOpen && (
            <div className="space-y-5 mt-4">
              {architecture && (
                <DetailSection title={t('architecture')} text={architecture} />
              )}
              {techDecisions && (
                <DetailSection
                  title={t('techDecisions')}
                  text={techDecisions}
                />
              )}
              {metrics && (
                <DetailSection title={t('metrics')} text={metrics} />
              )}
              {problemsSolved && (
                <DetailSection
                  title={t('problemsSolved')}
                  text={problemsSolved}
                />
              )}
              {learnings && (
                <DetailSection title={t('learnings')} text={learnings} />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
