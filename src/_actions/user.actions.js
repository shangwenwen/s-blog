import { userService } from '../_services'
import { userConstants } from '../_constants'
// import cookies from 'js-cookie'

function getUser() {
  const request = () => ({
    type: userConstants.GET_USER_REQUEST
  })
  const success = (user) => ({
    type: userConstants.GET_USER_SUCCESS,
    user
  })
  const failure = (error) => ({
    type: userConstants.GET_USER_FAILURE,
    error
  })

  return async (dispatch) => {
    try {
      dispatch(request())
      await userService.getUser()
        .then(
          (res) => {
            console.log(res.data)
            if (res.data.code === -400 && res.data.data === '') {
              return dispatch(failure(res.data.message))
            }
            return dispatch(success(res.data.data))
          }
        )
    } catch (error) {
      console.log('get user errors')
    }
  }
}

export const userActions = { getUser }
