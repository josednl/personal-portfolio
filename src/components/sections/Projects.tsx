import { Section } from "@/components/layout/Section";
import { useFetchSection } from "@/lib/hooks/useFetchSection";
import { ProjectsSkeleton } from "@/components/skeleton/ProjectsSkeleton";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Project } from "@/lib/types/project";

export const Projects = () => {
  const { data, loading } = useFetchSection<Project[]>("/data/projects.json");

  return (
    <Section id="projects" title="Projects">
      {loading && <ProjectsSkeleton />}

      {!loading && data && (
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {data.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </Section>
  );
};
