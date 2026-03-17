interface SectionProps {
  id: string;
  title?: string;
  children?: React.ReactNode;
}

export const Section = ({ id, title, children }: SectionProps) => {
  return (
    <section id={id} className="my-16 scroll-mt-16">
      <h2 className="text-3xl font-semibold mb-6 text-text dark:text-white">
        {title}
      </h2>
      <div className="text-text dark:text-text/60">{children}</div>
    </section>
  );
};
