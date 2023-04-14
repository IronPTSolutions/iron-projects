import http from './base-api';

const list = () => http.get('/cohorts')
  .then((res) => res.data)

export default {
  list
}