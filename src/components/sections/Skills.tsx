import { Section } from "../layout/Section";
import { useFetchSection } from "@/lib/hooks/useFetchSection";
import { SkillsSkeleton } from "@/components/skeleton/SkillsSkeleton";
import { SkillsCategory } from "@/components/ui/SkillsCategory";
import { SkillsData } from "@/lib/types/skills";

export const Skills = () => {
  const { data, loading } = useFetchSection<SkillsData>("/data/skills.json");

  return (
    <Section id="skills" title="Skills">
      {loading && <SkillsSkeleton />}

      {!loading && data && (
        <div className="space-y-10">
          {Object.entries(data).map(([category, skills]) => (
            <SkillsCategory
              key={category}
              category={category}
              skills={skills}
            />
          ))}
        </div>
      )}
    </Section>
  );
};
