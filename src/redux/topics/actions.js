import { TopicsService } from './service'
import { TopicsConstants } from './constants'

function getTopics(params) {
  const request = () => ({
    type: TopicsConstants.GET_TOPICS_REQUEST
  })
  const success = (list) => ({
    type: TopicsConstants.GET_TOPICS_SUCCESS,
    list
  })
  const failure = (error) => ({
    type: TopicsConstants.GET_TOPICS_FAILURE,
    error
  })

  return async (dispatch) => {
    try {
      dispatch(request())
      await TopicsService.getTopics(params)
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

export const topicsActions = { getTopics }
