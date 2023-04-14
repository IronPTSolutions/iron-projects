import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import ProjectsList from '../components/projects/projects-list/ProjectsList';

function ProjectsPage() {
  return (
    <PageLayout title="Show these awesome projects">
      <ProjectsList />
    </PageLayout>
  )
}

export default ProjectsPage;