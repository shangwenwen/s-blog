import { Api } from '../../helpers'

const getUser = () => {
  return Api.get('/frontend/user/account')
}

export const userService = { getUser }
