import constants from './constants'
import service from './service'

// action creates
function load(username) {
  const request = () => ({
    type: constants.LOAD_REQUEST
  })

  const success = (user) => ({
    type: constants.LOAD_SUCCESS,
    user
  })

  const failure = (error) => ({
    type: constants.LOAD_FAILURE,
    error
  })

  return async (dispatch) => {
    dispatch(request())
    const { data } = await service.fetchUser(username)
    if (data.code === 200) {
      return dispatch(success(data.user))
    }
    return dispatch(failure)
  }

}

export default { load }
