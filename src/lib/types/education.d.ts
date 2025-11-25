export interface EducationItem {
  id: string;
  school: string;
  degree: string;
  startYear: string;
  endYear: string | null;
  description: string | null;
}

export interface EducationData {
  title: string;
  items: EducationItem[];
}
