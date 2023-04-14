import React from 'react'

import './ProjectItem.css';
import { Link } from 'react-router-dom';

function ProjectItem({ project: { id, title, tags, githubUrl, imageUrl, authors } }) {
  return (
    <div className="project-item card text-bg-dark">
      <img src={imageUrl} className="card-img" alt={title} />
      <div className="card-img-overlay">
        <div className="d-flex flex-column h-100">
          <div className="d-flex align-items-baseline">
            <h5 className="card-title px-3 py-1 fs-5 fw-lighter text-dark me-auto"><Link to={`/projects/${id}`} className='text-dark link-underline-opacity-0'>{title}</Link></h5>
            <a href={githubUrl} target='blank' className='text-dark fs-3 link-underline-opacity-0'><i className='fa fa-github'></i></a>
          </div>
          <div className="d-flex mt-auto align-items-center">
            <div className='me-auto'>
              {tags.map(tag => <span key={tag} className="me-1 badge text-bg-light">{tag}</span>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectItem