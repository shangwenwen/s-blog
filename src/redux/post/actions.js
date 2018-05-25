import { postConstants } from './constants'
import { postService } from './service'

function getPost(id) {
  const request = () => ({
    type: postConstants.GET_POST_REQUEST
  })

  const success = (data) => ({
    type: postConstants.GET_POST_SUCCESS,
    data
  })

  const failure = (error) => ({
    type: postConstants.GET_POST_FAILURE,
    error
  })

  return async (dispatch) => {
    try {
      dispatch(request())
      await postService.getPost(id)
        .then(
          (res) => {
            console.log(res)
            // dispatch(success(res.data))
          }
        )
    } catch (error) {
      dispatch(failure(error))
    }
  }
}

export const postActions = { getPost }
