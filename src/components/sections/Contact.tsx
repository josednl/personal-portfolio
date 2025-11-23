import { Section } from "@/components/layout/Section";
import { useFetchSection } from "@/lib/hooks/useFetchSection";
import { ContactSkeleton } from "@/components/skeleton/ContactSkeleton";
import { ContactFooter } from "@/components/ui/ContactFooter";
import { ContactData } from "@/lib/types/contact";

export const Contact = () => {
  const { data, loading } = useFetchSection<ContactData>("/data/contact.json");

  return (
    <Section id="contact">
      {loading && <ContactSkeleton />}

      {!loading && data && <ContactFooter contact={data} />}
    </Section>
  );
};
