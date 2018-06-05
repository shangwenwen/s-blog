import helpers from '../../helpers'

const getUser = () => {
  return helpers.api.get('/frontend/user/account')
}

export const userService = { getUser }
