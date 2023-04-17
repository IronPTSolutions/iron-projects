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

  const projectsByModule = projects.reduce((projectsByModule, project) => {
    if (!projectsByModule[`${project.module}`]) {
      projectsByModule[`${project.module}`] = [];
    } 
    projectsByModule[`${project.module}`].push(project);
    return projectsByModule;
  }, {})

  return (
    <div className="accordion accordion-flush" id="module-projects-accordion">
      {Object.keys(projectsByModule).sort((m1, m2) => m1 - m2).map((module) => (
        <div key={module} className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#flush-module-${module}`} aria-expanded="true" aria-controls={`flush-module-${module}`}>
              Module {module}
            </button>
          </h2>
          <div id={`flush-module-${module}`} className="accordion-collapse collapse show">
            <div className="accordion-body">
              <div className="row g-2">
                {projectsByModule[module].map((project) => (
                  <div className="col-sm-6 col-md-4 col-lg-3 d-flex align-items-stretch" key={project.id}>
                    <ProjectItem project={project} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>          
      ))}
    </div>
  )
}

export default ProjectsList