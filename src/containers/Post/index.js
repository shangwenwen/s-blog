import React from 'react'
import { connect } from 'react-redux'

// redux post
import post from '../../redux/post'

class PostContainer extends React.Component {
  state = {}
  //
  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if (nextProps.post.pathname !== prevState.pathname) {
  //     return {
  //       pathname: nextProps.post.pathname
  //     }
  //   }
  //
  //   return null
  // }

  // 初始化页面渲染数据
  componentDidMount() {
    if (this.props.post.pathname !== this.props.location.pathname) {
      this._loadPost()
    }
  }

  // 页面更新加载数据
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this._loadPost()
    }
  }

  async _loadPost() {
    const { dispatch, load, loadSuccess, loadFailure, match: { params: { id }}, location: { pathname }} = this.props
    dispatch(load())
    await post.service.getPost(id)
      .then(
        (res) => {
          if (res.data.code === 200) {
            return dispatch(loadSuccess(res.data.data, pathname))
          }
          return dispatch(loadFailure(res.data))
        }
      )
  }

  _createMarkup() {
    const { post: { data: { html }}} = this.props
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
