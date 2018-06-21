import constants from './constants'
import service from './service'

function load(params) {
  // action creates
  const request = () => ({
    type: constants.LOAD_REQUEST
  })

  const success = (list, hasNext) => ({
    type: constants.LOAD_SUCCESS,
    list,
    hasNext,
    page: params.page,
    pathname: params.pathname
  })

  const failure = (error) => ({
    type: constants.LOAD_FAILURE,
    error
  })

  return async (dispatch) => {
    dispatch(request())
    const { data } = await service.fetchTopics(params)
    console.log(data)
    if (data.code === 200) {
      return dispatch(success(data.data.list, data.data.hasNext))
    }

    return dispatch(failure('获取数据错误'))
  }
}

const scrollTop = (currentTop) => {
  return (dispatch) => {
    dispatch({
      type: constants.SCROLL_TOP,
      currentTop
    })
  }
}

export default { load, scrollTop }
