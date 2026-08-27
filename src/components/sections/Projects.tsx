import { useState } from 'react';
import { Section } from '@/components/layout/Section';
import { useFetchSection } from '@/lib/hooks/useFetchSection';
import { ProjectsSkeleton } from '@/components/skeleton/ProjectsSkeleton';
import { SectionError } from '@/components/ui/SectionError';
import { ProjectListItem } from '@/components/ui/ProjectListItem';
import { ProjectPreview } from '@/components/ui/ProjectPreview';
import { ProjectsData } from '@/lib/types/project';
import { useTranslation } from '@/lib/hooks/useTranslation';

export const Projects = () => {
  const { t } = useTranslation();
  const { data, loading, error } = useFetchSection<ProjectsData>(
    '/data/projects.json',
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <Section id="projects" title={data?.title || t('projectsTitle')}>
      {loading && <ProjectsSkeleton />}

      {error && !loading && <SectionError />}

      {!loading && !error && data && (
        <div className="flex flex-col lg:flex-row gap-8">
          <nav
            className="lg:w-72 shrink-0 space-y-1 lg:sticky lg:top-24 lg:self-start"
            aria-label="Project list"
          >
            {data.items.map((project, index) => (
              <ProjectListItem
                key={project.id}
                project={project}
                isActive={index === selectedIndex}
                onClick={() => setSelectedIndex(index)}
              />
            ))}
          </nav>

          <div className="flex-1 min-w-0">
            <ProjectPreview project={data.items[selectedIndex]} />
          </div>
        </div>
      )}
    </Section>
  );
};
