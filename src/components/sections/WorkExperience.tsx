import { useEffect } from "react";
import { Section } from "@/components/layout/Section";
import { useFetchSection } from "@/lib/hooks/useFetchSection";
import { WorkSkeleton } from "@/components/skeleton/WorkSkeleton";
import { WorkCard } from "@/components/ui/WorkCard";
import { WorkData } from "@/lib/types/work";
import { useTranslation } from "@/lib/hooks/useTranslation";

export const WorkExperience = () => {
  const { t } = useTranslation();
  const { data, loading } = useFetchSection<WorkData>("/data/work.json");

  return (
    <Section id="work" title={data?.title || t("workTitle")}>
      {loading && <WorkSkeleton />}

      {!loading && data && (
        <div className="space-y-10">
          {data.items.map((item) => (
            <WorkCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </Section>
  );
};
