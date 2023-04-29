import http from './base-api';

const list = (query) => http.get('/projects', { params: query })

const detail = (id) => http.get(`/projects/${id}`)

const create = (project) => http.post('/projects', project)


export default {
  list,
  detail,
  create,
}