import { useState, useRef, useEffect } from 'react';
import { ProjectItem } from '@/lib/types/project';
import { ImageCarousel } from '@/components/ui/ImageCarousel';
import { ChevronsLeftRightEllipsis, Github, RotateCw } from 'lucide-react';
import { useTranslation } from '@/lib/hooks/useTranslation';
import { DetailSection } from '@/components/ui/DetailSection';
import { translations } from '@/lib/translations/translations';

type TranslationKey = keyof typeof translations.en;

export const ProjectCard = ({ project }: { project: ProjectItem }) => {
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
  const [expanded, setExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);
  const hasExtendedDetails = !!(
    architecture ||
    techDecisions ||
    metrics ||
    problemsSolved ||
    learnings
  );

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;
    const checkTruncation = () => {
      setIsTruncated(element.scrollHeight > element.offsetHeight);
    };
    checkTruncation();
    const resizeObserver = new ResizeObserver(checkTruncation);
    resizeObserver.observe(element);
    return () => resizeObserver.disconnect();
  }, [description]);

  return (
    <div className="group perspective-1000 w-full min-h-125">
      <div
        className={`relative w-full h-full transition-transform duration-700 motion-reduce:transition-none preserve-3d ${flipped ? 'rotate-y-180' : ''}`}
      >
        <div
          className={`absolute inset-0 flex h-full flex-col rounded-card border border-transparent bg-linear-to-b from-surface to-background p-6 shadow-soft backface-hidden dark:from-surface-dark dark:to-background-dark ${flipped ? 'z-0' : 'z-10'}`}
          style={{ transform: 'translateZ(0px)' }}
        >
          <div className="aspect-video w-full shrink-0 overflow-hidden rounded-control">
            <ImageCarousel images={images} />
          </div>

          <h3 className="text-2xl font-bold mt-4 text-gray-900 dark:text-gray-100 shrink-0 italic font-archivo">
            {title}
          </h3>

          <div className="grow mt-2 overflow-hidden flex flex-col">
            <div className="overflow-y-auto pr-2 custom-scrollbar">
              <p
                ref={textRef}
                className={`text-gray-600 dark:text-gray-300 leading-relaxed ${expanded ? '' : 'line-clamp-4'}`}
              >
                {description}
              </p>
            </div>

            {isTruncated && !expanded && (
              <button
                onClick={() => setExpanded(true)}
                className="mt-1 w-fit shrink-0 text-sm font-medium text-primary hover:underline dark:text-primary-dark"
              >
                {t('readMore')}
              </button>
            )}
            {expanded && (
              <button
                onClick={() => setExpanded(false)}
                className="mt-1 w-fit shrink-0 text-sm font-medium text-primary hover:underline dark:text-primary-dark"
              >
                {t('readLess')}
              </button>
            )}
          </div>

          {technologies && (
            <div className="flex flex-wrap gap-2 mt-4 shrink-0">
              {technologies.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 text-[10px] font-medium text-text dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          <div className="flex gap-3 justify-end pt-4 mt-auto shrink-0">
            <ActionButtons
              flipped={flipped}
              setFlipped={setFlipped}
              hasExtendedDetails={hasExtendedDetails}
              githubUrl={githubUrl}
              demoUrl={demoUrl}
              t={t}
            />
          </div>
        </div>

        <div
          className={`absolute inset-0 flex h-full flex-col rounded-card border border-border bg-surface p-6 shadow-soft backface-hidden dark:border-border-dark dark:bg-surface-dark ${flipped ? 'z-10' : 'z-0'}`}
          style={{ transform: 'rotateY(180deg) translateZ(0px)' }}
        >
          <div className="flex items-center justify-between mb-6 shrink-0">
            <h3 className="font-display text-2xl font-bold text-primary dark:text-primary-dark">
              {t('showDetails')}
            </h3>
            <button
              onClick={() => setFlipped(false)}
              className="rounded-control border border-border p-2 text-text transition-colors duration-200 hover:bg-background dark:border-border-dark dark:text-text-dark dark:hover:bg-background-dark"
            >
              <RotateCw className="h-5 w-5 text-primary dark:text-primary-dark" />
            </button>
          </div>

          <div className="grow overflow-y-auto space-y-6 pr-2 custom-scrollbar">
            {architecture && (
              <DetailSection title={t('architecture')} text={architecture} />
            )}
            {techDecisions && (
              <DetailSection title={t('techDecisions')} text={techDecisions} />
            )}
            {metrics && <DetailSection title={t('metrics')} text={metrics} />}
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
        </div>
      </div>
    </div>
  );
};

interface ActionButtonsProps {
  flipped: boolean;
  setFlipped: (value: boolean) => void;
  hasExtendedDetails: boolean;
  githubUrl?: string;
  demoUrl?: string;
  t: (key: TranslationKey) => string;
}

const ActionButtons = ({
  flipped,
  setFlipped,
  hasExtendedDetails,
  githubUrl,
  demoUrl,
  t,
}: ActionButtonsProps) => (
  <>
    {hasExtendedDetails && (
      <button
        onClick={() => setFlipped(!flipped)}
        className="rounded-control border border-border p-2 text-text transition-colors duration-200 hover:bg-background dark:border-border-dark dark:text-text-dark dark:hover:bg-background-dark"
      >
        <RotateCw className="h-5 w-5 text-primary dark:text-primary-dark" />
      </button>
    )}
    {githubUrl && (
      <a
        href={githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-control border border-border p-2 text-text transition-colors duration-200 hover:bg-background dark:border-border-dark dark:text-text-dark dark:hover:bg-background-dark"
      >
        <Github className="w-5 h-5" />
      </a>
    )}
    {demoUrl && (
      <a
        href={demoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 rounded-control bg-primary px-4 py-2 text-sm text-white shadow-soft transition-colors duration-200 hover:bg-primary-hover"
      >
        <ChevronsLeftRightEllipsis className="w-4 h-4" /> {t('demo')}
      </a>
    )}
  </>
);
