import { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { ProjectItem } from '@/lib/types/project';
import { ProjectListItem } from '@/components/ui/ProjectListItem';
import { useTranslation } from '@/lib/hooks/useTranslation';

interface ProjectDropdownProps {
  projects: ProjectItem[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

export const ProjectDropdown = ({
  projects,
  selectedIndex,
  onSelect,
}: ProjectDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const selectedProject = projects[selectedIndex];

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls="project-dropdown-list"
        aria-label={t('selectProject')}
        className="flex w-full items-center justify-between gap-2 rounded-card border border-border bg-surface p-4 text-left shadow-soft transition-colors duration-200 hover:border-primary/40 dark:border-border-dark dark:bg-surface-dark"
      >
        <span className="truncate font-display text-base font-semibold text-text dark:text-text-dark">
          {selectedProject?.title}
        </span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-text-light transition-transform duration-200 dark:text-text-light-dark ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <ul
          id="project-dropdown-list"
          className="absolute left-0 right-0 top-full z-20 mt-2 max-h-72 space-y-1 overflow-y-auto rounded-card border border-border bg-surface p-2 shadow-soft dark:border-border-dark dark:bg-surface-dark"
        >
          {projects.map((project, index) => (
            <li key={project.id}>
              <ProjectListItem
                project={project}
                isActive={index === selectedIndex}
                onClick={() => {
                  onSelect(index);
                  setIsOpen(false);
                }}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
