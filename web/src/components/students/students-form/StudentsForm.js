import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import studentsService from '../../../services/students';

function StudentsForm() {
  // https://react-hook-form.com/get-started#Applyvalidation
  const { register, handleSubmit, setError, formState: { errors } } = useForm({ mode: 'onBlur' });
  const [serverError, setServerError] = useState(undefined);
  const navigate = useNavigate();

  const onStudentSubmit = (student) => {
    setServerError(undefined);
    console.log('Registering...')
    studentsService.create(student)
      .then(student => {
        console.log(student);
        navigate('/login', { state: { student } });
      })
      .catch(error => {
        const errors = error.response?.data?.errors;
        if (errors) {
          console.error(error.message, errors);
          Object.keys(errors)
            .forEach((inputName) => setError(inputName, { message: errors[inputName] }))
        } else {
          console.error(error);
          setServerError(error.message)
        }
      })
  }

  return (
    <form onSubmit={handleSubmit(onStudentSubmit)}>
      <div className="row g-2">
        
        {/* NAME */}
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text"><i className='fa fa-user fa-fw'></i></span>
            <input
              type="text"
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              placeholder="Name" {...register('name', {
                required: 'Student name is required'
              })} />
            {errors.name && <div className='invalid-feedback'>{errors.name?.message}</div>}
          </div>
        </div>

        {/* USERNAME */}
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text"><i className='fa fa-tag fa-fw'></i></span>
            <input
              type="text"
              className={`form-control ${errors.username ? 'is-invalid' : ''}`}
              placeholder="johndoe" {...register('username', {
                required: 'Username is required',
                pattern: {
                  value: /^[a-z0-9]+$/,
                  message: 'Username must be lowercase and without spaces'
                }
              })} />
            {errors.username && <div className='invalid-feedback'>{errors.username?.message}</div>}
          </div>
        </div>

        {/* EMAIL */}
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text"><i className='fa fa-envelope-o fa-fw'></i></span>
            <input
              type="text"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              placeholder="student@example.org" {...register('email', {
                required: 'Student email is required',
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: 'Student email must be valid'
                }
              })} />
            {errors.email && <div className='invalid-feedback'>{errors.email?.message}</div>}
          </div>
        </div>

        {/* PASSWORD */}
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text"><i className='fa fa-lock fa-fw'></i></span>
            <input
              type="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              placeholder="****" {...register('password', {
                required: 'Student password is required',
                minLength: {
                  value: 8,
                  message: 'Student password needs at least 8 chars'
                }
              })} />
            {errors.password && <div className='invalid-feedback'>{errors.password?.message}</div>}
          </div>
        </div>

        {/* BIO */}
        <div className="col-md-12">
          <div className="input-group">
            <span className="input-group-text"><i className='fa fa-edit fa-fw'></i></span>
            <textarea
              type="text"
              className={`form-control ${errors.bio ? 'is-invalid' : ''}`}
              placeholder="Describe your self" {...register('bio', {
                required: 'Student bio is required'
              })} />
            {errors.bio && <div className='invalid-feedback'>{errors.bio?.message}</div>}
          </div>
        </div>

        {/* GITHUB */}
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text"><i className='fa fa-github fa-fw'></i></span>
            <input
              type="text"
              className={`form-control ${errors.githubUrl ? 'is-invalid' : ''}`}
              placeholder="https://github.com/johndoe" {...register('githubUrl', {
                required: 'Student githubUrl is required',
                pattern: {
                  value: /^https?:\/\/github\.com\/[a-z0-9]+$/,
                  message: 'Github URL must be valid'
                }
              })} />
            {errors.githubUrl && <div className='invalid-feedback'>{errors.githubUrl?.message}</div>}
          </div>
        </div>

        {/* LINKEDIN */}
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text"><i className='fa fa-linkedin fa-fw'></i></span>
            <input
              type="text"
              className={`form-control ${errors.linkedinUrl ? 'is-invalid' : ''}`}
              placeholder="https://linkedin.com/in/johndoe" {...register('linkedinUrl', {
                required: 'Student linkedinUrl is required',
                pattern: {
                  value: /^https?:\/\/linkedin\.com\/in\/[a-z0-9]+$/,
                  message: 'Linkedin URL must be valid'
                }
              })} />
            {errors.linkedinUrl && <div className='invalid-feedback'>{errors.linkedinUrl?.message}</div>}
          </div>
        </div>

        {/* LOCATION */}
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text"><i className='fa fa-linkedin fa-fw'></i></span>
            <input
              type="text"
              className={`form-control ${errors.location ? 'is-invalid' : ''}`}
              placeholder="Madrid" {...register('location', {
                required: 'Student location is required'
              })} />
            {errors.location && <div className='invalid-feedback'>{errors.location?.message}</div>}
          </div>
        </div>

        {/* COHORT */}
        <div className="col-md-6">
          <div className="input-group mb-1">
            <span className="input-group-text"><i className='fa fa-book fa-fw'></i></span>
            <input
              type="text"
              className={`form-control ${errors.cohort ? 'is-invalid' : ''}`}
              placeholder="Cohort" {...register('cohort', {
                required: 'Student cohort is required'
              })} />
            {errors.cohort && <div className='invalid-feedback'>{errors.cohort?.message}</div>}
          </div>
        </div>
      </div>
      
      {serverError && <div className="alert alert-danger d-none d-lg-block">{serverError}</div>}

      <div className="d-grid mt-2">
        <button type="submit" className='btn btn-primary'>Register</button>
      </div>
    </form>
  )
}

export default StudentsForm