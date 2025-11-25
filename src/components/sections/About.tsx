import { Section } from "@/components/layout/Section";
import { useFetchSection } from "@/lib/hooks/useFetchSection";
import { AboutSkeleton } from "@/components/skeleton/AboutSkeleton";

interface AboutData {
  name: string;
  role: string;
  location: string;
  about: string[];
  skills?: string[];
  image?: string;
}

export const About = () => {
  const { data, loading } = useFetchSection<AboutData>("data/about.json");

  return (
    <Section id="about">
      {loading && <AboutSkeleton />}
      {!loading && data && (
        <div 
          className="
            p-0 md:p-0 
            bg-transparent 
            text-gray-800 dark:text-gray-200
          "
        >
          <div className="flex flex-col md:flex-row gap-8 lg:gap-12 pb-8 border-b border-gray-200 dark:border-gray-700">
            
            {data.image && (
              <div className="shrink-0 mx-auto md:mx-0 pt-2">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-gray-400 dark:border-gray-600">
                  <img
                    src={data.image}
                    alt={data.name}
                    loading="lazy" 
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            )}

            <div className="grow space-y-5">
              
              <div>
                <h3 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-0">
                  {data.name}
                </h3>
                <p className="text-xl font-light text-gray-600 dark:text-gray-400 mb-1">
                  {data.role}
                </p>
                <p className="text-sm font-light text-gray-500 dark:text-gray-500 flex items-center">
                  {data.location}
                </p>
              </div>

              <div className="space-y-4">
                {data.about.map((paragraph, i) => (
                  <p key={i} className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {data.skills && data.skills.length > 0 && (
            <div className="pt-8 mt-4">
              <h4 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill) => (
                  <span
                    key={skill}
                    className="
                      px-3 py-1 
                      text-sm font-medium 
                      bg-gray-100 dark:bg-gray-700 
                      rounded-lg 
                      text-gray-700 dark:text-gray-300 
                      shadow-sm
                    "
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </Section>
  );
};
