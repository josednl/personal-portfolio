export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  images: string[];
  demoUrl?: string;
  githubUrl?: string;
  technologies?: string[];
  // Extended details for expandable section
  architecture?: string;
  techDecisions?: string;
  metrics?: string;
  problemsSolved?: string;
  learnings?: string;
}

export interface ProjectsData {
  title: string;
  items: ProjectItem[];
}
