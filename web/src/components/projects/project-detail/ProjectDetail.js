import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import projectsService from '../../../services/projects';
 
function ProjectDetail() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState();

  useEffect(() => {
    async function fetchProject() {
      try {
        const project = await projectsService.detail(projectId);
        setProject(project);
      } catch (error) {
        console.error(error);
        const statusCode = error.response?.status;
        if (statusCode === 404) {
          navigate('/projects');
        }
      }
    }
    fetchProject();
  }, [projectId]);

  return (
    <>
      {!project ? (<p><i className='fa fa-gear fa-spin'></i>Loading...</p>) : (
        <>
          <h1>{project.title}</h1>
        </>
      )}
    </>
  )
}

export default ProjectDetail;