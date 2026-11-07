import { Section } from '../layout/Section';
import { useFetchSection } from '@/lib/hooks/useFetchSection';
import { EducationSkeleton } from '@/components/skeleton/EducationSkeleton';
import { SectionError } from '@/components/ui/SectionError';
import { EducationRow } from '@/components/ui/EducationRow';
import { EducationData } from '@/lib/types/education';
import { useTranslation } from '@/lib/hooks/useTranslation';

export const Education = () => {
  const { t } = useTranslation();
  const { data, loading, error } = useFetchSection<EducationData>(
    '/data/education.json',
  );

  return (
    <Section id="education" title={data?.title || t('educationTitle')}>
      {loading && <EducationSkeleton />}

      {error && !loading && <SectionError />}

      {!loading && !error && data && (
        <ol className="divide-y divide-border border-t border-border dark:divide-border-dark dark:border-border-dark">
          {data.items.map((item) => (
            <EducationRow key={item.id} item={item} />
          ))}
        </ol>
      )}
    </Section>
  );
};
