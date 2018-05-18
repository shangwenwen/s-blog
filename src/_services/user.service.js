import axios from 'axios'
import { Api } from '../_helpers'

export const userService = {
  login,
  logout
}

function login(username, password) {
  return Api.post('/api/frontend/user/login', {
    username, password
  })
}

function logout() {}
