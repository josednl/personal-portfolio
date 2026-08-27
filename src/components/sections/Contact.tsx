import { Section } from '@/components/layout/Section';
import { useFetchSection } from '@/lib/hooks/useFetchSection';
import { ContactSkeleton } from '@/components/skeleton/ContactSkeleton';
import { ContactFooter } from '@/components/ui/ContactFooter';
import { SectionError } from '@/components/ui/SectionError';
import { ContactData } from '@/lib/types/contact';

export const Contact = () => {
  const { data, loading, error } = useFetchSection<ContactData>('/data/contact.json');

  return (
    <Section id="contact">
      {loading && <ContactSkeleton />}

      {error && !loading && <SectionError />}

      {!loading && !error && data && <ContactFooter contact={data} />}
    </Section>
  );
};
