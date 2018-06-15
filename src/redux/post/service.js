import helpers from '../../helpers'

const fetchPost = (id) => {
  return helpers.api.get('/frontend/article/item', { id })
}

export default { fetchPost }
