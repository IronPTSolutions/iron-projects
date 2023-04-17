import http from './base-api';

const list = (query) => http.get('/projects', { params: query })
  .then((res) => res.data);

const detail = (id) => http.get(`/projects/${id}`)
  .then((res) => res.data);

const create = (project) => http.post('/projects', project)
  .then((res) => res.data);


export default {
  list,
  detail,
  create,
}