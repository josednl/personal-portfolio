import { Code2 } from "lucide-react";

interface SkillsCategoryProps {
  category: string;
  skills: string[];
}

export const SkillsCategory = ({ category, skills }: SkillsCategoryProps) => {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Code2 className="text-blue-600 dark:text-blue-300" size={20} />
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          {category}
        </h3>
      </div>

      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="
              px-3 py-1.5 text-sm font-medium
              bg-gray-100 dark:bg-gray-700 
              text-gray-800 dark:text-gray-200
              shadow-sm rounded-lg 
              transition-all duration-200
              hover:scale-105 hover:bg-blue-100 dark:hover:bg-blue-900/40
              hover:text-blue-800 dark:hover:text-blue-300
            "
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};
