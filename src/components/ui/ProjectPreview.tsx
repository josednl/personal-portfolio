import { useState, useEffect } from 'react';
import { ProjectItem } from '@/lib/types/project';
import { ImageCarousel } from '@/components/ui/ImageCarousel';
import { Github, ExternalLink, ChevronDown } from 'lucide-react';
import { useTranslation } from '@/lib/hooks/useTranslation';
import { DetailSection } from '@/components/ui/DetailSection';

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

  useEffect(() => {
    setDetailsOpen(false);
  }, [project.id]);

  const hasExtendedDetails = !!(
    architecture ||
    techDecisions ||
    metrics ||
    problemsSolved ||
    learnings
  );

  return (
    <div className="flex flex-col h-full">
      <div className="aspect-video w-full overflow-hidden rounded-xl mb-6">
        <ImageCarousel images={images} />
      </div>

      <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 font-archivo mb-3">
        {title}
      </h3>

      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-5">
        {description}
      </p>

      {technologies && technologies.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700/50 rounded-lg"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      <div className="flex gap-3 mb-8">
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm font-medium"
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
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
          >
            <ExternalLink className="w-4 h-4" />
            {t('demo')}
          </a>
        )}
      </div>

      {hasExtendedDetails && (
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-auto">
          <button
            onClick={() => setDetailsOpen(!detailsOpen)}
            className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
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
