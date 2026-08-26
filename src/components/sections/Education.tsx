import { Section } from '../layout/Section';
import { useFetchSection } from '@/lib/hooks/useFetchSection';
import { EducationSkeleton } from '@/components/skeleton/EducationSkeleton';
import { SectionError } from '@/components/ui/SectionError';
import { EducationCard } from '@/components/ui/EducationCard';
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
        <div className="space-y-10">
          {data.items.map((item) => (
            <EducationCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </Section>
  );
};
