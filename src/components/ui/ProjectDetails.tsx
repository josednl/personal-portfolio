import { ProjectItem } from '@/lib/types/project';
import { useTranslation } from '@/lib/hooks/useTranslation';

interface ProjectDetailsProps {
  project: ProjectItem;
  id: string;
}

export const ProjectDetails = ({ project, id }: ProjectDetailsProps) => {
  const { t } = useTranslation();

  const sections = [
    { label: t('architecture'), text: project.architecture },
    { label: t('techDecisions'), text: project.techDecisions },
    { label: t('problemsSolved'), text: project.problemsSolved },
    { label: t('learnings'), text: project.learnings },
  ].filter(
    (section): section is { label: string; text: string } =>
      Boolean(section.text),
  );

  if (sections.length === 0) return null;

  return (
    <div
      id={id}
      className="mt-6 grid gap-x-8 gap-y-6 border-t border-border pt-6 dark:border-border-dark sm:grid-cols-2"
    >
      {sections.map((section) => (
        <div key={section.label}>
          <h4 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary dark:text-primary-dark">
            {section.label}
          </h4>
          <p className="mt-2 text-sm leading-relaxed text-text-light dark:text-text-light-dark">
            {section.text}
          </p>
        </div>
      ))}
    </div>
  );
};
