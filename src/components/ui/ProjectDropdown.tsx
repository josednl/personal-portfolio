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
        className="w-full flex items-center justify-between gap-2 p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-left shadow-sm hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
      >
        <span className="text-base font-semibold font-archivo text-gray-900 dark:text-gray-100 truncate">
          {selectedProject?.title}
        </span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <ul
          id="project-dropdown-list"
          className="absolute left-0 right-0 top-full mt-2 max-h-72 overflow-y-auto space-y-1 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-2 shadow-lg z-20"
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
