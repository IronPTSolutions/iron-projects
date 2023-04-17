import React, { useEffect, useState } from 'react';
import projectsService from '../../../services/projects';
import ProjectItem from '../project-item/ProjectItem';
import { useSearchParams } from 'react-router-dom';

function ProjectsList() {
  const [searchParams] = useSearchParams();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const query = {}
    const cohort = searchParams.get('cohort');
    if (cohort) query.cohort = cohort;

    projectsService.list(query)
      .then((projects) => setProjects(projects))
      .catch(error => console.error(error))
  }, [searchParams]);

  return (
    <>
      <div className="row g-2">
          {projects.map((project) => (
            <div className="col-sm-6 col-md-4 col-lg-3 d-flex align-items-stretch" key={project.id}>
              <ProjectItem  project={project} />
            </div>
          ))}
      </div>
    </>
  )
}

export default ProjectsList