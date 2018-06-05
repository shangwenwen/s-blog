import helpers from '../../helpers'

const getPost = (id) => {
  return helpers.api.get('/frontend/article/item', { id })
}

export default { getPost }
