import { Api } from '../_helpers'

export const userService = {
  login,
  logout
}

function login(username, password) {
  return Api.post('/frontend/user/login', {
    username, password
  })
}

function logout() {
  return Api.post('/frontend/user/logout', {})
}
