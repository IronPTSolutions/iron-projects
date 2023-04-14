import React, { useEffect, useState } from 'react';
import projectsService from '../../../services/projects';
import ProjectItem from '../project-item/ProjectItem';

function ProjectsList() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    projectsService.list()
      .then((projects) => setProjects(projects))
      .catch(error => console.error(error))
  }, []);

  return (
    <>
      <div className="row g-2">
          {projects.map((project) => (
            <div className="col-md-3" key={project.id}>
              <ProjectItem  project={project} />
            </div>
          ))}
      </div>
    </>
  )
}

export default ProjectsList