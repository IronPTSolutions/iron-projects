import http from './base-api';

const create = (student) => http.post('/students', student)

const login = (student) => http.post('/login', student)

const get = (id) => http.get(`/students/${id}`)


export default {
  create,
  login,
  get,
}