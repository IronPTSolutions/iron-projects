import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import ProjectsList from '../components/projects/projects-list/ProjectsList';
import CohortsNav from '../components/cohorts/cohorts-nav/CohortsNav';

function ProjectsPage() {
  return (
    <PageLayout title="Show these awesome projects">
      <div className="row">
        <div className="col-2"><CohortsNav /></div>
        <div className="col-10"><ProjectsList /></div>
      </div>
    </PageLayout>
  )
}

export default ProjectsPage;