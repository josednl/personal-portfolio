import { Section } from '@/components/layout/Section';
import { useFetchSection } from '@/lib/hooks/useFetchSection';
import { AboutSkeleton } from '@/components/skeleton/AboutSkeleton';
import { SectionError } from '@/components/ui/SectionError';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import { useTranslation } from '@/lib/hooks/useTranslation';

interface AboutData {
  name: string;
  role: string;
  location: string;
  about: string[];
  skills?: string[];
  image?: string;
  cv?: string;
}

export const About = () => {
  const { t } = useTranslation();
  const { data, loading, error } = useFetchSection<AboutData>('/data/about.json');

  return (
    <Section id="about">
      {loading && <AboutSkeleton />}
      {error && !loading && <SectionError />}
      {!loading && !error && data && (
        <div
          className="
           p-0 md:p-0 
           bg-transparent 
           text-text dark:text-text/80
         "
        >
          <div className="pb-6 border-b border-text/20 dark:border-text/10">
            {data.image && (
              <div className="mb-4">
                <OptimizedImage
                  src={data.image}
                  alt={data.name}
                  width={56}
                  height={56}
                  loading="eager"
                  className="w-14 h-14 rounded-full object-cover"
                />
              </div>
            )}

            <div className="space-y-5">
              <div>
                <h3 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-0 font-archivo">
                  {data.name}
                </h3>
                <p className="text-xl font-light text-gray-600 dark:text-gray-400 mb-1 font-space">
                  {data.role}
                </p>
                <p className="text-sm font-light text-gray-500 dark:text-gray-500 flex items-center">
                  {data.location}
                </p>
              </div>

              <div className="space-y-4">
                {data.about.map((paragraph, i) => (
                  <p
                    key={i}
                    className="text-base text-gray-700 dark:text-gray-300 leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
                {data.cv && (
                  <a
                    href={data.cv}
                    download
                    className="inline-block mt-4 px-5 py-2 bg-primary text-white font-semibold rounded-lg shadow hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-colors duration-200"
                  >
                    {t('downloadCV')}
                  </a>
                )}
              </div>
            </div>
          </div>

          {data.skills && data.skills.length > 0 && (
            <div className="pt-8 mt-4">
              <h4 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                {t('techStack')}
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
