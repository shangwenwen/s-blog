import { TopicsService } from './service'
import { topicsConstants } from './constants'

function getTopics(params) {
  const request = () => ({
    type: topicsConstants.GET_TOPICS_REQUEST
  })
  const success = (page, list, hasNext) => ({
    type: topicsConstants.GET_TOPICS_SUCCESS,
    page,
    list,
    hasNext
  })
  const failure = (error) => ({
    type: topicsConstants.GET_TOPICS_FAILURE,
    error
  })

  return async (dispatch) => {
    try {
      dispatch(request())
      await TopicsService.getTopics(params)
        .then(
          (res) => {
            if (res.data.code === -200 && res.data.data === '') {
              return dispatch(failure(res.data.message))
            }
            return dispatch(success(params.page, res.data.data.list, res.data.data.hasNext))
          }
        )
    } catch (error) {
      dispatch(failure(error))
    }
  }
}

export const topicsActions = { getTopics }
