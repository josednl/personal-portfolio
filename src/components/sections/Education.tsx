import { Section } from "../layout/Section";
import { useFetchSection } from "@/lib/hooks/useFetchSection";
import { EducationSkeleton } from "@/components/skeleton/EducationSkeleton";
import { EducationCard } from "@/components/ui/EducationCard";
import { EducationItem } from "@/lib/types/education";

export const Education = () => {
  const { data, loading } = useFetchSection<EducationItem[]>("/data/education.json");

  return (
    <Section id="education" title="Education">
      {loading && <EducationSkeleton />}

      {!loading && data && (
        <div className="space-y-10">
          {data.map((item) => (
            <EducationCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </Section>
  );
};
