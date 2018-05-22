import { Api } from '../_helpers'

const getUser = () => {
  return Api.get('/frontend/user/account')
}

export const userService = { getUser }
