import React from 'react'
import { connect } from 'react-redux'

// redux
import post from '../../redux/post'

class PostContainer extends React.Component {
  constructor(props) {
    super(props)
    this.handleLike = this.handleLike.bind(this)
  }

  // 初始化页面渲染数据
  componentDidMount() {
    this._asyncLoadPost(this.props.match.params.id)
  }

  // 页面更新加载数据
  componentDidUpdate(prevProps, prevState) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this._asyncLoadPost(this.props.match.params.id)
    }
  }

  handleLike() {
    console.log('like')
  }

  async _asyncLoadPost(id) {
    const { dispatch, load, loadSuccess, loadFailure } = this.props

    dispatch(load())
    const { data } = await post.service.fetchPost(id)
    if (data.code === 200) {
      return dispatch(loadSuccess(data.data))
    }

    return dispatch(loadFailure(data))
  }

  _createMarkup() {
    const { post: { data: { html } } } = this.props
    return {
      __html: html
    }
  }

  render() {
    if (this.props.post.isPending) {
      return (
        <div>loading..........</div>
      )
    } else {
      return (
        <div>
          <div dangerouslySetInnerHTML={this._createMarkup()}></div>
          <div>{this.props.post.data.visit}</div>
          <div onClick={this.handleLike}>{this.props.post.data.like}</div>
        </div>
      )
    }
  }
}

// redux
const mapStateToProps = (state) => {
  return {
    post: state.post.toJS()
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    load: post.actions.load,
    loadSuccess: post.actions.loadSuccess,
    loadFailure: post.actions.loadFailure
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostContainer)
