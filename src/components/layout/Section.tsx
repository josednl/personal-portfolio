interface SectionProps {
  id: string;
  title?: string;
  children?: React.ReactNode;
  className?: string;
}

export const Section = ({
  id,
  title,
  children,
  className = 'my-16 md:my-24',
}: SectionProps) => {
  return (
    <section id={id} className={`scroll-mt-24 ${className}`}>
      {title && (
        <h2 className="mb-8 font-display text-section font-semibold text-text dark:text-text-dark">
          {title}
        </h2>
      )}
      <div className="text-text dark:text-text-dark/80">{children}</div>
    </section>
  );
};
