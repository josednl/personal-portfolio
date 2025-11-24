interface SkillsCategoryProps {
  category: string;
  skills: string[];
}

export const SkillsCategory = ({ category, skills }: SkillsCategoryProps) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">{category}</h3>

      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded text-sm text-gray-900 dark:text-gray-100"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};
