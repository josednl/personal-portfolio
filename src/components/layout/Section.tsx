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
    <section
      id={id}
      tabIndex={-1}
      className={`scroll-mt-24 focus:outline-none ${className}`}
    >
      {title && (
        <h2
          tabIndex={-1}
          className="mb-8 font-display text-section font-semibold text-text focus:outline-none dark:text-text-dark"
        >
          {title}
        </h2>
      )}
      <div className="text-text dark:text-text-dark/80">{children}</div>
    </section>
  );
};
