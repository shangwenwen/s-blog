import React from 'react'
import { connect } from 'react-redux'

// redux post
import post from '../../redux/post'

class PostContainer extends React.Component {
  state = {}

  // 初始化页面渲染数据
  componentDidMount() {
    this._asyncLoadPost(this.props.match.params.id)
  }

  // 页面更新加载数据
  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(prevProps.post.data) === '{}') {
      this._asyncLoadPost(this.props.match.params.id)
    }
  }

  componentWillUnmount() {
    this._asyncRequest && (this._asyncRequest = null)
  }

  async _asyncLoadPost(id) {
    const { dispatch, load, loadSuccess, loadFailure } = this.props

    if (this._asyncRequest) {
      return
    }

    dispatch(load())
    this._asyncRequest = await post.service.getPost(id)
    if(res.data.code === 200) {
      dispatch(loadSuccess(res.data.data))
    }

    dispatch(loadFailure(res.data))
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
