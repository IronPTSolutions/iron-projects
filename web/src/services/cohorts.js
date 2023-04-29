import http from './base-api';

const list = () => http.get('/cohorts')

const create = (cohort) => http.post('/cohorts', cohort)

export default {
  list,
  create
}