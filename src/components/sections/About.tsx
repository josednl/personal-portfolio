import { useState } from 'react';
import { ArrowDownRight, Download, MapPin } from 'lucide-react';
import { Section } from '@/components/layout/Section';
import { useFetchSection } from '@/lib/hooks/useFetchSection';
import { AboutSkeleton } from '@/components/skeleton/AboutSkeleton';
import { SectionError } from '@/components/ui/SectionError';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import { useTranslation } from '@/lib/hooks/useTranslation';
import { scrollToSection } from '@/lib/navigation';

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
  const [showFullBio, setShowFullBio] = useState(false);

  const paragraphs = data?.about ?? [];
  const visibleParagraphs = showFullBio ? paragraphs : paragraphs.slice(0, 2);

  return (
    <Section id="about" className="pt-6 md:pt-12">
      {loading && <AboutSkeleton />}
      {error && !loading && <SectionError />}
      {!loading && !error && data && (
        <div>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,1fr)_auto] md:items-start md:gap-12">
            <div className="min-w-0">
              <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-text-light dark:text-text-light-dark">
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 font-space text-xs font-medium uppercase tracking-[0.16em] text-text dark:border-border-dark dark:bg-surface-dark dark:text-text-dark">
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rounded-full bg-primary"
                  />
                  {data.role}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                  {data.location}
                </span>
              </div>

              <h1
                tabIndex={-1}
                className="max-w-3xl text-balance font-display text-display font-semibold text-text focus:outline-none dark:text-text-dark"
              >
                {data.name}
              </h1>

              <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-text-light dark:text-text-light-dark md:text-xl">
                {t('heroTagline')}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#projects"
                  onClick={(event) => {
                    event.preventDefault();
                    scrollToSection('projects');
                  }}
                  className="group inline-flex items-center justify-center gap-2 rounded-control bg-primary px-5 py-3 text-sm font-semibold text-white shadow-soft transition-colors duration-200 hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 active:translate-y-px"
                >
                  {t('viewProjects')}
                  <ArrowDownRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                  />
                </a>
                {data.cv && (
                  <a
                    href={data.cv}
                    target='_blank'
                    className="inline-flex items-center justify-center gap-2 rounded-control border border-border bg-surface px-5 py-3 text-sm font-semibold text-text transition-colors duration-200 hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 active:translate-y-px dark:border-border-dark dark:bg-surface-dark dark:text-text-dark dark:hover:text-primary-dark"
                  >
                    <Download className="h-4 w-4" aria-hidden="true" />
                    {t('downloadCV')}
                  </a>
                )}
              </div>
            </div>

            {data.image && (
              <div className="relative mx-auto grid w-fit place-items-center md:mx-auto">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full border border-primary/20"
                />
                <OptimizedImage
                  src={data.image}
                  alt={data.name}
                  width={224}
                  height={224}
                  loading="eager"
                  fetchPriority="high"
                  className="relative h-40 w-40 rounded-full object-cover ring-1 ring-border dark:ring-border-dark md:h-56 md:w-56"
                />
              </div>
            )}
          </div>

          <div className="mt-12 max-w-[65ch] space-y-4">
            {visibleParagraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-base leading-relaxed text-text-light dark:text-text-light-dark"
              >
                {paragraph}
              </p>
            ))}

            {paragraphs.length > 2 && (
              <button
                type="button"
                onClick={() => setShowFullBio((value) => !value)}
                aria-expanded={showFullBio}
                className="inline-flex items-center gap-1.5 rounded-control text-sm font-semibold text-primary transition-colors duration-200 hover:text-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:text-primary-dark dark:hover:text-primary-dark/80"
              >
                {showFullBio ? t('readLess') : t('readMore')}
              </button>
            )}
          </div>

          {data.skills && data.skills.length > 0 && (
            <div className="mt-10 max-w-[65ch] border-t border-border pt-6 dark:border-border-dark">
              <h2 className="mb-4 font-display text-sm font-semibold uppercase tracking-[0.16em] text-text-light dark:text-text-light-dark">
                {t('techStack')}
              </h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center rounded-full border border-border bg-surface px-3 py-1 text-sm font-medium text-text dark:border-border-dark dark:bg-surface-dark dark:text-text-dark"
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
