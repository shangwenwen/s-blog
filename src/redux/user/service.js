import helpers from '../../helpers'

const fetchUser = () => {
  return helpers.api.get('/frontend/user/account')
}

export default { fetchUser }
