import { listService } from '../_services'
import { listConstants } from '../_constants'

function getList(params) {
  const request = () => ({
    type: listConstants.GET_LIST_REQUEST
  })
  const success = (list) => ({
    type: listConstants.GET_LIST_SUCCESS,
    list
  })
  const failure = (error) => ({
    type: listConstants.GET_LIST_FAILURE,
    error
  })

  return async (dispatch) => {
    try {
      dispatch(request())
      await listService.getList(params)
        .then(
          (res) => {
            console.log(res)
            // if (res.data.code === -400 && res.data.data === '') {
            //   return dispatch(failure(res.data.message))
            // }
            // return dispatch(success(res.data.data))
          }
        )
    } catch (error) {
      console.log(error)
    }
  }
}

export const listActions = { getList }
