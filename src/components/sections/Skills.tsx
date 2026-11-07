import { Section } from '../layout/Section';
import { useFetchSection } from '@/lib/hooks/useFetchSection';
import { SkillsSkeleton } from '@/components/skeleton/SkillsSkeleton';
import { SectionError } from '@/components/ui/SectionError';
import { TechIcon } from '@/components/ui/TechIcon';
import { SkillsData } from '@/lib/types/skills';
import { useTranslation } from '@/lib/hooks/useTranslation';

const groupLabelKeys = {
  frontend: 'skillsFrontend',
  backend: 'skillsBackend',
  data: 'skillsData',
  tools: 'skillsTools',
} as const;

export const Skills = () => {
  const { t } = useTranslation();
  const { data, loading, error } = useFetchSection<SkillsData>(
    '/data/skills.json',
  );

  return (
    <Section id="skills" title={data?.title || t('skillsTitle')}>
      {loading && <SkillsSkeleton />}

      {error && !loading && <SectionError />}

      {!loading && !error && data && (
        <>
          {data.description && (
            <p className="-mt-3 mb-8 max-w-[65ch] text-sm leading-relaxed text-text-light dark:text-text-light-dark">
              {data.description}
            </p>
          )}

          <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {data.groups.map((group, index) => {
              const labelKey =
                groupLabelKeys[group.id as keyof typeof groupLabelKeys];

              return (
                <div
                  key={group.id}
                  className="border-t border-border pt-4 dark:border-border-dark"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-text dark:text-text-dark">
                      {labelKey ? t(labelKey) : group.id}
                    </h3>
                    <span className="font-space text-[10px] tabular-nums text-text-light dark:text-text-light-dark">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <ul className="mt-4 space-y-2.5">
                    {group.items.map((technology) => (
                      <li
                        key={technology}
                        className="flex items-center gap-2.5 text-sm text-text-light dark:text-text-light-dark"
                      >
                        <TechIcon name={technology} />
                        {technology}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </>
      )}
    </Section>
  );
};
