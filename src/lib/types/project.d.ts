export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  images: string[];
  demoUrl?: string;
  githubUrl?: string;
}

export interface ProjectsData {
  title: string;
  items: ProjectItem[];
}
