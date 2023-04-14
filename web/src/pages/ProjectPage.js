import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import ProjectDetail from '../components/projects/project-detail/ProjectDetail';

function ProjectPage() {
  return (
    <PageLayout title="Look at this awesome project">
      <ProjectDetail />
    </PageLayout>
  )
}

export default ProjectPage;