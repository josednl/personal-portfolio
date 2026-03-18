import { render, screen } from '@testing-library/react';
import { ProjectCard } from './ProjectCard';
import type { ProjectItem } from '@/lib/types/project';
import { TestWrapper } from '@/test-utils';

describe('ProjectCard', () => {
  const mockProject: ProjectItem = {
    id: '1',
    title: 'Test Project',
    description: 'A test project description',
    technologies: ['React', 'TypeScript'],
    githubUrl: 'https://github.com/test/test',
    demoUrl: 'https://test.com',
    images: ['/test-image.jpg'],
  };

  test('renders project name and description', () => {
    render(
      <TestWrapper>
        <ProjectCard project={mockProject} />
      </TestWrapper>,
    );

    // Check if the project name is rendered (at least one instance)
    const titleElements = screen.getAllByText(mockProject.title);
    expect(titleElements.length).toBeGreaterThan(0);
    // Check if the project description is rendered (at least one instance)
    const descriptionElements = screen.getAllByText(mockProject.description);
    expect(descriptionElements.length).toBeGreaterThan(0);
  });

  test('renders technologies', () => {
    render(
      <TestWrapper>
        <ProjectCard project={mockProject} />
      </TestWrapper>,
    );

    mockProject.technologies!.forEach((tech) => {
      expect(screen.getByText(tech)).toBeInTheDocument();
    });
  });
});
