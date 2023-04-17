import React, { useState } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import projectsService from '../../../services/projects';
import SelectMultiText from '../../select-multi-text/SelectMultiText';

function ProjectForm() {
  const navigate = useNavigate();
  const { register, handleSubmit, control, watch, setError, formState: { errors } } = useForm({ mode: 'onBlur', defaultValues: { tags: [] } });
  const [serverError, setServerError] = useState(undefined);

  console.debug(`Tags: ${watch('tags')}`);

  const onProjectSubmit = async (project) => {
    try {
      setServerError();
      project = await projectsService.create(project);
      navigate({
        pathname: "/projects",
        search: createSearchParams({
          cohort: project.cohort
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

  const moduleSelectOptions = [1, 2, 3].map(module => ({ value: module, label: `Module ${module}` }));

  return (
    <>
      <form onSubmit={handleSubmit(onProjectSubmit)}>
        {serverError && <div className="alert alert-danger d-none d-lg-block">{serverError}</div>}
        
        <div className="row g-2">

          {/* TITLE */}
          <div className="col-md-6">
            <div className="input-group">
              <span className="input-group-text"><i className='fa fa-tag fa-fw'></i></span>
              <input
                type="text"
                className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                placeholder="Project title" {...register('title', {
                  required: 'Project title is required',
                  minLength: {
                    value: 3,
                    message: 'Project title needs at least 3 chars'
                  }
                })} />
              {errors.title && <div className='invalid-feedback'>{errors.title?.message}</div>}
            </div>
          </div>

          {/* MODULE */}
          <div className="col-md-6">
            <div className="input-group mb-1">
              <span className="input-group-text"><i className='fa fa-book fa-fw'></i></span>

              {/* hook form controller: https://react-hook-form.com/api/usecontroller/controller/ */}
              {/* react-select: https://react-select.com/home#getting-started */}
              <Controller
                control={control}
                name="module"
                rules={{
                  required: 'Project module is required'
                }}
                render={({ field: { onChange, value, ref } }) => (
                  <Select
                    inputRef={ref}
                    className={`form-control p-0 ${errors.module ? 'is-invalid' : ''}`}
                    options={moduleSelectOptions}
                    // https://react-select.com/styles
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        border: 'none',
                      }),
                    }}
                    value={moduleSelectOptions.find(option => option.value === value)}
                    onChange={(option) => onChange(option.value)}
                  />
                )}
              />
              {errors.module && <div className='invalid-feedback'>{errors.module?.message}</div>}
            </div>
          </div>
        
          {/* DESCRIPTION */}
          <div className="col-12">
            <div className="col-md-12">
              <div className="input-group">
                <span className="input-group-text"><i className='fa fa-edit fa-fw'></i></span>
                <textarea
                  type="text"
                  className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                  placeholder="Describe your project" {...register('description', {
                    required: 'Project description is required',
                    minLength: {
                      value: 10,
                      message: 'Project description needs at least 10 chars'
                    }
                  })} />
                {errors.description && <div className='invalid-feedback'>{errors.description?.message}</div>}
              </div>
            </div>
          </div>

          {/* TAGS */}
          <div className="col-md-12">
            <div className="input-group mb-1">
              <span className="input-group-text"><i className='fa fa-gears fa-fw'></i></span>

              {/* hook form controller: https://react-hook-form.com/api/usecontroller/controller/ */}
              <Controller
                control={control}
                name="tags"
                render={({ field: { onChange, value, ref } }) => (
                  <SelectMultiText
                    inputRef={ref}
                    className={`form-control p-0 ${errors.tags ? 'is-invalid' : ''}`}
                    onChange={(options) => onChange(options.map(option => option.value))}
                    value={value}
                  />
                )}
              />
              {errors.module && <div className='invalid-feedback'>{errors.module?.message}</div>}
            </div>
          </div>

          {/* GITHUB */}
          <div className="col-md-6">
            <div className="input-group">
              <span className="input-group-text"><i className='fa fa-github fa-fw'></i></span>
              <input
                type="text"
                className={`form-control ${errors.githubUrl ? 'is-invalid' : ''}`}
                placeholder="https://github.com/johndoe/super-project" {...register('githubUrl', {
                  required: 'Project githubUrl is required',
                  pattern: {
                    value: /^(https?:\/\/)?(github\.com)([\/\w \.-]*)*\/?$/,
                    message: 'Github URL must be valid'
                  }
                })} />
              {errors.githubUrl && <div className='invalid-feedback'>{errors.githubUrl?.message}</div>}
            </div>
          </div>

          {/* IMAGE */}
          <div className="col-md-6">
            <div className="input-group">
              <span className="input-group-text"><i className='fa fa-picture-o fa-fw'></i></span>
              <input
                type="text"
                className={`form-control ${errors.imageUrl ? 'is-invalid' : ''}`}
                placeholder="https://path/to/image.png" {...register('imageUrl', {
                  required: 'Project image url is required',
                  pattern: {
                    value: /^https?:\/\/.+\.(jpg|jpeg|png)$/,
                    message: 'Image URL must be valid'
                  }
                })} />
              {errors.imageUrl && <div className='invalid-feedback'>{errors.imageUrl?.message}</div>}
            </div>
          </div>

        </div>

        <div className="d-grid mt-2">
          <button type="submit" className='btn btn-primary'>Create Project</button>
        </div>
      </form>
    </>
  )
}

export default ProjectForm