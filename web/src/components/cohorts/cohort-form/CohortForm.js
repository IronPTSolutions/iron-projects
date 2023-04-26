import React, { useState } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import cohortsService from '../../../services/cohorts';

function CohortForm() {
  const navigate = useNavigate();
  const { register, handleSubmit, setError, formState: { errors } } = useForm({ mode: 'onBlur', defaultValues: { location: 'Remote', description: 'Web PartTime - MERN' }});
  const [serverError, setServerError] = useState(undefined);

  const onCohortSubmit = async (cohort) => {
    try {
      setServerError();
      cohort = await cohortsService.create(cohort);
      navigate({
        pathname: "/projects",
        search: createSearchParams({
          cohort: cohort.id
        }).toString()
      });
    } catch (error) {
      const errors = error.response?.data?.errors;
      if (errors) {
        Object.keys(errors)
          .forEach((inputName) => setError(inputName, { message: errors[inputName] }))
      } else {
        setServerError(error.message)
      }
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onCohortSubmit)}>
        {serverError && <div className="alert alert-danger d-none d-lg-block">{serverError}</div>}
        
        <div className="row g-1">

          {/* START DATE */}
          <div className="col-6">
            <div className="input-group">
              <span className="input-group-text"><i className='fa fa-calendar-o fa-fw'></i></span>
              <input
                type="date"
                className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                placeholder="start" {...register('start', {
                  required: 'Cohort start date is required'
                })} />
              {errors.start && <div className='invalid-feedback'>{errors.start?.message}</div>}
            </div>
          </div>

          {/* LOCATION */}
          <div className="col-6">
            <div className="input-group">
              <span className="input-group-text"><i className='fa fa-edit fa-fw'></i></span>
              <input
                type="text"
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                placeholder="Cohort location" {...register('location', {
                  required: 'Student location is required',
                })} />
              {errors.location && <div className='invalid-feedback'>{errors.location?.message}</div>}
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="col-12">
            <div className="input-group">
              <span className="input-group-text"><i className='fa fa-edit fa-fw'></i></span>
              <input
                type="text"
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                placeholder="Cohort description" {...register('description', {
                  required: 'Student description is required'
                })} />
              {errors.description && <div className='invalid-feedback'>{errors.description?.message}</div>}
            </div>
          </div>

        </div>
        
        <div className="d-grid mt-2">
          <button type="submit" className='btn btn-primary'>Login</button>
        </div>
      </form>
    </>
  )
}

export default CohortForm