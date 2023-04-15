import http from './base-api';

const list = () => http.get('/projects')
  .then((res) => res.data);

const detail = (id) => http.get(`/projects/${id}`)
  .then((res) => res.data);


export default {
  list,
  detail,
}