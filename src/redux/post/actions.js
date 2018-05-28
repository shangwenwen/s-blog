import { postConstants } from './constants'
import { postService } from './service'

function getPost(params) {
  const request = () => ({
    type: postConstants.GET_POST_REQUEST
  })

  const success = (data, pathname) => ({
    type: postConstants.GET_POST_SUCCESS,
    data,
    pathname
  })

  const failure = (error) => ({
    type: postConstants.GET_POST_FAILURE,
    error
  })

  return async (dispatch) => {
    try {
      // console.log(params)
      dispatch(request())
      await postService.getPost(params.id)
        .then(
          (res) => {
            return dispatch(success(res.data.data, params.pathname))
          }
        )
    } catch (error) {
      dispatch(failure(error))
    }
  }
}

export const postActions = { getPost }