import { TrendingUp, Layers3, GitBranch, Wrench, GraduationCap } from 'lucide-react';
import { ProjectItem } from '@/lib/types/project';
import { useTranslation } from '@/lib/hooks/useTranslation';

interface ProjectDetailsProps {
  project: ProjectItem;
  id: string;
}

export const ProjectDetails = ({ project, id }: ProjectDetailsProps) => {
  const { t } = useTranslation();
  const result = project.metrics?.trim();

  const sections = [
    {
      label: t('architecture'),
      text: project.architecture,
      icon: Layers3,
    },
    {
      label: t('techDecisions'),
      text: project.techDecisions,
      icon: GitBranch,
    },
    {
      label: t('problemsSolved'),
      text: project.problemsSolved,
      icon: Wrench,
    },
    {
      label: t('learnings'),
      text: project.learnings,
      icon: GraduationCap,
    },
  ].filter((section): section is typeof section & { text: string } =>
    Boolean(section.text?.trim()),
  );

  if (!result && sections.length === 0) return null;

  return (
    <div
      id={id}
      className="mt-8 space-y-7 border-t border-border pt-7 dark:border-border-dark"
    >
      {result && (
        <div className="group relative overflow-hidden rounded-2xl border border-primary/20 bg-linear-to-br from-primary/8 via-primary/4 to-transparent p-5 sm:p-6 dark:border-primary-dark/20 dark:from-primary-dark/15 dark:via-primary-dark/5">
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/6 blur-2xl dark:bg-primary-dark/10" />

          <div className="relative">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary dark:bg-primary-dark/15 dark:text-primary-dark">
                <TrendingUp className="h-4.5 w-4.5" aria-hidden="true" />
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary dark:text-primary-dark">
                  {t('projectResult')}
                </p>
                <p className="mt-0.5 text-xs text-text-light dark:text-text-light-dark">
                  Project impact
                </p>
              </div>
            </div>

            <p className="mt-5 max-w-[75ch] text-[15px] font-medium leading-7 text-text dark:text-text-dark sm:text-base">
              {result}
            </p>
          </div>
        </div>
      )}

      {sections.length > 0 && (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {sections.map((section, index) => {
            const Icon = section.icon;

            return (
              <section
                key={section.label}
                className="group relative rounded-2xl border border-border/80 bg-surface/50 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-surface hover:shadow-lg hover:shadow-black/3 dark:border-border-dark/80 dark:bg-surface-dark/30 dark:hover:border-primary-dark/30 dark:hover:bg-surface-dark"
              >
                <div className="flex items-start gap-3.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/8 text-primary transition-colors duration-300 group-hover:bg-primary/15 dark:bg-primary-dark/10 dark:text-primary-dark dark:group-hover:bg-primary-dark/20">
                    <Icon
                      className="h-4.25 w-4.25"
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-[11px] font-bold uppercase tracking-[0.13em] text-text dark:text-text-dark">
                        {section.label}
                      </h4>
                      <span className="text-[10px] font-medium text-text-light/50 dark:text-text-light-dark/50">
                        0{index + 1}
                      </span>
                    </div>

                    <p className="mt-3 text-[13px] leading-[1.85] text-text-light dark:text-text-light-dark">
                      {section.text}
                    </p>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
};
