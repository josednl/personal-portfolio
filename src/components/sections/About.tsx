import { Section } from "@/components/layout/Section";
import { useFetchSection } from "@/lib/hooks/useFetchSection";
import { AboutSkeleton } from "@/components/skeleton/AboutSkeleton";

interface AboutData {
  name: string;
  role: string;
  location: string;
  about: string[];
  skills: string[];
}

export const About = () => {
  const { data, loading } = useFetchSection<AboutData>("data/about.json");

  return (
    <Section id="about" title="About me">
      {loading && <AboutSkeleton />}
      {!loading && data && (
        <div className="space-y-4 text-gray-800 dark:text-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{data.name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">{data.role}</p>
          <p className="text-sm text-gray-500 dark:text-gray-500">{data.location}</p>

          <div className="space-y-2">
            {data.about.map((paragraph, i) => (
              <p key={i} className="text-gray-700 dark:text-gray-300">{paragraph}</p>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 pt-4">
            {data.skills.map((skill) => (
              <span
                key={skill}
                className="px-2 py-1 text-xs bg-gray-200 rounded text-gray-800 dark:bg-gray-700 dark:text-gray-100"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </Section>
  );
};
