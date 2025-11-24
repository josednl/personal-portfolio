import { Project } from "@/lib/types/project";
import { ImageCarousel } from "@/components/ui/ImageCarousel";
import { ChevronsLeftRightEllipsis, Github } from "lucide-react";

export const ProjectCard = ({ project }: { project: Project }) => {
  const { title, description, images, demoUrl, githubUrl } = project;

  return (
    <div className="
      border rounded-xl p-5 shadow transition-all bg-white dark:bg-gray-800
      hover:shadow-lg hover:-translate-y-1 duration-300 flex flex-col
    ">
      <div className="aspect-video w-full"> 
        <ImageCarousel images={images} />
      </div>

      <h3 className="text-2xl font-bold mt-4 text-gray-900 dark:text-gray-100">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 mt-2 leading-relaxed grow text-base line-clamp-3">
        {description}
      </p>

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
            title="View repository on GitHub"
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
            title="View live demo"
          >
            <ChevronsLeftRightEllipsis className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  );
};
