export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  images: string[];
  demoUrl?: string;
  githubUrl?: string;
  technologies?: string[];
}

export interface ProjectsData {
  title: string;
  items: ProjectItem[];
}
