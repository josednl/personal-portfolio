import { useState, useRef, useEffect } from 'react';
import { ProjectItem } from '@/lib/types/project';
import { ImageCarousel } from '@/components/ui/ImageCarousel';
import { ChevronsLeftRightEllipsis, Github, RotateCw } from 'lucide-react';
import { useTranslation } from '@/lib/hooks/useTranslation';
import { DetailSection } from '@/components/ui/DetailSection';

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
    <div className="group perspective-1000 w-full h-[600px]">
      <div
        className={`relative w-full h-full transition-transform duration-700 preserve-3d ${flipped ? 'rotate-y-180' : ''}`}
      >
        <div
          className={`absolute inset-0 backface-hidden border border-transparent rounded-xl p-6 shadow-lg bg-white dark:bg-gray-800 flex flex-col h-full bg-linear-to-b from-white via-gray-50 to-white dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 ${flipped ? 'z-0' : 'z-10'}`}
          style={{ transform: 'translateZ(0px)' }}
        >
          <div className="aspect-video w-full overflow-hidden rounded-lg shrink-0">
            <ImageCarousel images={images} />
          </div>

          <h3 className="text-2xl font-bold mt-4 text-gray-900 dark:text-gray-100 shrink-0 italic">
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
                className="text-blue-600 text-sm mt-1 hover:underline w-fit font-medium shrink-0"
              >
                {t('readMore')}
              </button>
            )}
            {expanded && (
              <button
                onClick={() => setExpanded(false)}
                className="text-blue-600 text-sm mt-1 hover:underline w-fit font-medium shrink-0"
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
          className={`absolute inset-0 backface-hidden border border-transparent rounded-xl p-6 shadow-lg flex flex-col h-full bg-linear-to-b from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-900/20 dark:via-purple-900/20 dark:to-pink-900/20 ${flipped ? 'z-10' : 'z-0'}`}
          style={{ transform: 'rotateY(180deg) translateZ(0px)' }}
        >
          <div className="flex items-center justify-between mb-6 shrink-0">
            <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-300">
              {t('showDetails')}
            </h3>
            <button
              onClick={() => setFlipped(false)}
              className="p-2 border border-blue-200 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
            >
              <RotateCw className="w-5 h-5 text-blue-600 dark:text-blue-300" />
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

const ActionButtons = ({
  flipped,
  setFlipped,
  hasExtendedDetails,
  githubUrl,
  demoUrl,
  t,
}: any) => (
  <>
    {hasExtendedDetails && (
      <button
        onClick={() => setFlipped(!flipped)}
        className="p-2 border border-blue-200 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
      >
        <RotateCw className="w-5 h-5 text-blue-600 dark:text-blue-300" />
      </button>
    )}
    {githubUrl && (
      <a
        href={githubUrl}
        target="_blank"
        className="p-2 border border-gray-300 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <Github className="w-5 h-5" />
      </a>
    )}
    {demoUrl && (
      <a
        href={demoUrl}
        target="_blank"
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 shadow-md transition-all"
      >
        <ChevronsLeftRightEllipsis className="w-4 h-4" /> Demo
      </a>
    )}
  </>
);
