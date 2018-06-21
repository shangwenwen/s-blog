import constants from './constants'
import service from './service'

function load(id) {
  // action creates
  const request = () => ({
    type: constants.LOAD_REQUEST
  })

  const success = (data) => ({
    type: constants.LOAD_SUCCESS,
    data
  })

  const failure = (error) => ({
    type: constants.LOAD_FAILURE,
    error
  })

  return async (dispatch) => {
    dispatch(request())
    const { data } = await service.fetchPost(id)

    if (data.code === 200) {
      return dispatch(success(data.data))
    }

    return dispatch(failure(data.error))
  }
}

export default { load }
