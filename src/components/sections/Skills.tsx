import { Section } from '../layout/Section';
import { useFetchSection } from '@/lib/hooks/useFetchSection';
import { SkillsSkeleton } from '@/components/skeleton/SkillsSkeleton';
import { SectionError } from '@/components/ui/SectionError';
import { TechTag } from '@/components/ui/TechTag';
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
        <>
          {data.description && (
            <p className="mb-6 mt-3 max-w-[65ch] text-sm text-text-light dark:text-text-light-dark">
              {data.description}
            </p>
          )}
          <ul className="flex flex-wrap items-center gap-2.5">
            {data.items.map((technology) => (
              <li key={technology}>
                <TechTag name={technology} />
              </li>
            ))}
          </ul>
        </>
      )}
    </Section>
  );
};