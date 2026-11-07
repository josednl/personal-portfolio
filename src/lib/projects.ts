import { ProjectItem } from '@/lib/types/project';

export type ProjectHighlightKind = 'result' | 'decision' | 'summary';

interface ProjectHighlight {
  kind: ProjectHighlightKind;
  text: string;
}

const firstSentence = (text: string) => {
  const match = text.match(/^.*?[.!?](?=\s|$)/);
  return match ? match[0] : text;
};

export const getProjectHighlight = (
  project: ProjectItem,
): ProjectHighlight => {
  if (project.metrics?.trim()) {
    return { kind: 'result', text: project.metrics.trim() };
  }

  if (project.problemsSolved?.trim()) {
    return {
      kind: 'result',
      text: firstSentence(project.problemsSolved.trim()),
    };
  }

  if (project.techDecisions?.trim()) {
    return {
      kind: 'decision',
      text: firstSentence(project.techDecisions.trim()),
    };
  }

  return { kind: 'summary', text: firstSentence(project.description) };
};
