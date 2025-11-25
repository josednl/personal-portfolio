import { Section } from "@/components/layout/Section";
import { useFetchSection } from "@/lib/hooks/useFetchSection";
import { ProjectsSkeleton } from "@/components/skeleton/ProjectsSkeleton";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ProjectsData } from "@/lib/types/project";
import { useTranslation } from "@/lib/hooks/useTranslation";

export const Projects = () => {
  const { t } = useTranslation();
  const { data, loading } = useFetchSection<ProjectsData>("/data/projects.json");

  return (
    <Section id="projects" title={data?.title || t("projectsTitle")}>
      {loading && <ProjectsSkeleton />}

      {!loading && data && (
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {data.items.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </Section>
  );
};
