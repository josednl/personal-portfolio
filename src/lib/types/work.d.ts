export interface WorkItem {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
  tech?: string[];
}

export interface WorkData {
  title: string;
  items: WorkItem[];
}
