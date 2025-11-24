interface SectionProps {
  id: string;
  title?: string;
  children?: React.ReactNode;
}

export const Section = ({ id, title, children }: SectionProps) => {
  return (
    <section id={id} className="my-20 scroll-mt-20">
      <h2 className="text-3xl font-semibold mb-6 text-gray-900 dark:text-gray-100">{title}</h2>
      <div className="text-gray-700 dark:text-gray-300">
        {children}
      </div>
    </section>
  );
}
