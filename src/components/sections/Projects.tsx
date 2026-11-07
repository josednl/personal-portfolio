import { Section } from '@/components/layout/Section';
import { useFetchSection } from '@/lib/hooks/useFetchSection';
import { ProjectsSkeleton } from '@/components/skeleton/ProjectsSkeleton';
import { SectionError } from '@/components/ui/SectionError';
import { FeaturedProject } from '@/components/ui/FeaturedProject';
import { ProjectRow } from '@/components/ui/ProjectRow';
import { ProjectsData } from '@/lib/types/project';
import { useTranslation } from '@/lib/hooks/useTranslation';

export const Projects = () => {
  const { t } = useTranslation();
  const { data, loading, error } = useFetchSection<ProjectsData>(
    '/data/projects.json',
  );

  const featured =
    data?.items.find((project) => project.featured) ?? data?.items[0];
  const otherProjects =
    data?.items.filter((project) => project.id !== featured?.id) ?? [];

  return (
    <Section id="projects" title={data?.title || t('projectsTitle')}>
      {loading && <ProjectsSkeleton />}

      {error && !loading && <SectionError />}

      {!loading && !error && featured && (
        <div className="space-y-10">
          <FeaturedProject project={featured} />

          {otherProjects.length > 0 && (
            <div>
              <div className="mb-2 flex items-center justify-between border-b border-border pb-4 dark:border-border-dark">
                <h3 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-text-light dark:text-text-light-dark">
                  {t('moreProjects')}
                </h3>
                <span className="font-space text-xs tabular-nums text-text-light dark:text-text-light-dark">
                  {String(otherProjects.length).padStart(2, '0')}
                </span>
              </div>

              <div className="space-y-4 md:space-y-0">
                {otherProjects.map((project, index) => (
                  <ProjectRow
                    key={project.id}
                    project={project}
                    index={index}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </Section>
  );
};
