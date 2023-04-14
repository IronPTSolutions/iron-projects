import React from 'react';
import { useParams } from 'react-router-dom';

function ProjectDetail() {
  const { projectId } = useParams();
  return (
    <div>{projectId}</div>
  )
}

export default ProjectDetail