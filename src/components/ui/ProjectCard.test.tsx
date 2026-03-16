import { render, screen } from '@testing-library/react'
import ProjectCard from './ProjectCard'
import type { Project } from '@/lib/types/project.d.ts'

describe('ProjectCard', () => {
  const mockProject: Project = {
    id: '1',
    name: 'Test Project',
    description: 'A test project description',
    technologies: ['React', 'TypeScript'],
    github: 'https://github.com/test/test',
    livePreview: 'https://test.com',
    image: '/test-image.jpg',
    featured: false,
  }

  test('renders project name and description', () => {
    render(<ProjectCard project={mockProject} />)

    // Check if the project name is rendered
    expect(screen.getByText(mockProject.name)).toBeInTheDocument()
    // Check if the project description is rendered
    expect(screen.getByText(mockProject.description)).toBeInTheDocument()
  })

  test('renders technologies', () => {
    render(<ProjectCard project={mockProject} />)

    mockProject.technologies.forEach(tech => {
      expect(screen.getByText(tech)).toBeInTheDocument()
    })
  })
})