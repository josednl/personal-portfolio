import { Section } from '../layout/Section';
import { useFetchSection } from '@/lib/hooks/useFetchSection';
import { SkillsSkeleton } from '@/components/skeleton/SkillsSkeleton';
import { SectionError } from '@/components/ui/SectionError';
import { SkillsCategory } from '@/components/ui/SkillsCategory';
import { SkillsData } from '@/lib/types/skills';
import { useTranslation } from '@/lib/hooks/useTranslation';

export const Skills = () => {
  const { t } = useTranslation();
  const { data, loading, error } = useFetchSection<SkillsData>('/data/skills.json');

  return (
    <Section id="skills" title={data?.title || t('skillsTitle')}>
      {loading && <SkillsSkeleton />}

      {error && !loading && <SectionError />}

      {!loading && !error && data && (
        <div className="space-y-10">
          {Object.entries(data.items).map(([category, skills]) => (
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
