import { useEffect, useState } from "react";
import { Section } from "@/components/layout/Section";
import { useFetchSection } from "@/lib/hooks/useFetchSection";
import { ProjectsSkeleton } from "@/components/skeleton/ProjectsSkeleton";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ProjectsData } from "@/lib/types/project";

export const Projects = () => {
  const { data, loading } = useFetchSection<ProjectsData>("/data/projects.json");
  const [title, setTitle] = useState('Projects');

  useEffect(() => {
    if (data && data.title) {
      setTitle(data.title);
    }
  }, [data]);

  return (
    <Section id="projects" title={title}>
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
