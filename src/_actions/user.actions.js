import { userService } from '../_services'
import { userConstants } from '../_constants'
// import cookies from 'js-cookie'

export const userActions = {
  login,
  logout
}

// login

function login(username, password) {
  const request = () => ({
    type: userConstants.LOGIN_REQUEST
  })

  const success = (user) => ({
    type: userConstants.LOGIN_SUCCESS,
    user
  })

  const failure = (error) => ({
    type: userConstants.LOGIN_FAILURE,
    error
  })

  return async dispatch => {
    try {
      dispatch(request())
      await userService.login(username, password)
        .then(
          res => {
            if (res.data.code === -200 && res.data.data === '') {
              return dispatch(failure(res.data.message))
            }

            return dispatch(success(res.data.data))
          }
        )
        .catch(
          error => {
            console.log(error)
          }
        )
    } catch (e) {
      console.log(e)
    } finally {
      console.log('finally')
    }
  }
}

// logout
function logout() {
  const logout = () => ({
    type: userConstants.LOGOUT
  })

  return async (dispatch) => {
    try {
      await userService.logout()
        .then(() => {
          dispatch(logout())
          console.log('登出成功')
        })
    } catch (error) {
      console.log('登出失败')
    }
  }

}
