import { Api } from '../_helpers'

const login = (username, password) => {
  return Api.post('/frontend/user/login', { username, password })
}
const logout = () => {
  return Api.post('/frontend/user/logout', {})
}

export const userService = { login, logout }
