import { Section } from "../layout/Section";
import { useFetchSection } from "@/lib/hooks/useFetchSection";
import { EducationSkeleton } from "@/components/skeleton/EducationSkeleton";
import { EducationCard } from "@/components/ui/EducationCard";
import { EducationData } from "@/lib/types/education";
import { useEffect, useState } from "react";

export const Education = () => {
  const { data, loading } = useFetchSection<EducationData>("/data/education.json");
  const [title, setTitle] = useState('Education');

  useEffect(() => {
    if (data && data.title) {
      setTitle(data.title);
    }
  }, [data]);
  
  return (
    <Section id="education" title={title}>
      {loading && <EducationSkeleton />}

      {!loading && data && (
        <div className="space-y-10">
          {data.items.map((item) => (
            <EducationCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </Section>
  );
};
