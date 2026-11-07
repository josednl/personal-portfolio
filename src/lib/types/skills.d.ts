export interface SkillGroup {
  id: string;
  items: string[];
}

export interface SkillsData {
  title: string;
  description?: string;
  groups: SkillGroup[];
}
