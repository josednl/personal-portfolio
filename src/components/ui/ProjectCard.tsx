import { useState, useRef, useEffect } from "react";
import { ProjectItem } from "@/lib/types/project";
import { ImageCarousel } from "@/components/ui/ImageCarousel";
import { ChevronsLeftRightEllipsis, Github } from "lucide-react";
import { useTranslation } from '@/lib/hooks/useTranslation';

export const ProjectCard = ({ project }: { project: ProjectItem }) => {
  const { title, description, images, demoUrl, githubUrl, technologies } = project;
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const [needsCollapse, setNeedsCollapse] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const paragraph = textRef.current;
    if (paragraph) {
      paragraph.classList.add("line-clamp-3");

      requestAnimationFrame(() => {
        if (paragraph.scrollHeight > paragraph.clientHeight) {
          setNeedsCollapse(true);
        } else {
          setNeedsCollapse(false);
        }
      });
    }
  }, [description]);

  return (
    <div className="
      border rounded-xl p-5 shadow transition-all bg-white dark:bg-gray-800
      hover:shadow-lg hover:-translate-y-1 duration-300 flex flex-col
    ">
      <div className="aspect-video w-full"> 
        <ImageCarousel images={images} />
      </div>

      <h3 className="text-2xl font-bold mt-4 text-gray-900 dark:text-gray-100">{title}</h3>

      <p
        ref={textRef}
        className={`
          text-gray-600 dark:text-gray-300 mt-2 leading-relaxed grow text-base
          ${expanded ? "" : "line-clamp-3"}
        `}
      >
        {description}
      </p>

      {needsCollapse && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-blue-600 dark:text-blue-400 text-sm mt-2 hover:underline w-fit"
        >
          {expanded ? t("readLess") : t("readMore")}
        </button>
      )}

      {technologies && technologies.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="
                px-2 py-1 text-sm font-medium 
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

      <hr className="my-4 border-gray-100 dark:border-gray-700" /> 

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
          </a>
        )}
      </div>
    </div>
  );
};
