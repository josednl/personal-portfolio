import { useState, useRef, useEffect } from "react";
import { ProjectItem } from "@/lib/types/project";
import { ImageCarousel } from "@/components/ui/ImageCarousel";
import { ChevronsLeftRightEllipsis, Github } from "lucide-react";
import { useTranslation } from '@/lib/hooks/useTranslation';

export const ProjectCard = ({ project }: { project: ProjectItem }) => {
  const { title, description, images, demoUrl, githubUrl, technologies } = project;
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;
    const checkTruncation = () => {
      const isOverflowing = element.scrollHeight > element.clientHeight + 1;
      setIsTruncated(isOverflowing);
    };

    checkTruncation();

    const resizeObserver = new ResizeObserver(() => {
      checkTruncation();
    });

    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
    };
  }, [description]);

  return (
    <div className="
      border rounded-xl p-5 shadow transition-all bg-white dark:bg-gray-800
      hover:shadow-lg hover:-translate-y-1 duration-300 flex flex-col h-full
    ">
      <div className="aspect-video w-full overflow-hidden rounded-lg"> 
        <ImageCarousel images={images} />
      </div>

      <h3 className="text-2xl font-bold mt-4 text-gray-900 dark:text-gray-100">{title}</h3>

      <div className="grow flex flex-col">
        <p
          ref={textRef}
          className={`
            text-gray-600 dark:text-gray-300 mt-2 leading-relaxed text-base
            ${expanded ? "" : "line-clamp-3"}
          `}
        >
          {description}
        </p>

        {(isTruncated || expanded) && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-blue-600 dark:text-blue-400 text-sm mt-2 hover:underline w-fit font-medium transition-colors"
          >
            {expanded ? t("readLess") : t("readMore")}
          </button>
        )}
      </div>

      {technologies && technologies.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4 mb-2">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="
                px-2.5 py-1 text-xs font-medium 
                bg-gray-100 dark:bg-gray-700 
                text-gray-700 dark:text-gray-300
                rounded-full shadow-sm
              "
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      <hr className="mt-auto mb-4 border-gray-100 dark:border-gray-700 w-full" /> 

      <div className="flex gap-3 justify-end pt-2">
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex items-center gap-1.5 px-3 py-2 border border-gray-300 dark:border-gray-600
              text-gray-700 dark:text-gray-200 text-sm rounded-lg
              hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm
            "
          >
            <Github className="w-4 h-4" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        )}
        
        {demoUrl && (
          <a
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-sm
              rounded-lg hover:bg-blue-700 transition-colors shadow-md
            "
          >
            <ChevronsLeftRightEllipsis className="w-4 h-4" />
            <span>Demo</span>
          </a>
        )}
      </div>
    </div>
  );
};
