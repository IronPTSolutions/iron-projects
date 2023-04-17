import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import ProjectForm from '../components/projects/project-form/ProjectForm';

function CreateProjectPage() {
  return (
    <PageLayout title="Create new project">
      <ProjectForm />
    </PageLayout>
  )
}

export default CreateProjectPage;