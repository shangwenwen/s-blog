import React from 'react'
import { connect } from 'react-redux'

// actions
import { postActions, postService } from '../../redux/post'

class PostContainer extends React.Component {
  state = {
    externalData: null
  }
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
      this.loadAsyncPost()
    }
  }

  // 页面更新加载数据
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.loadAsyncPost()
    }
  }

  componentWillUnmount() {
    if (this._asyncRequest) {

      console.log(typeof this._asyncRequest)
    }
  }

  loadAsyncPost() {
    
    const { getPost, match: { params: { id }}, location: { pathname }} = this.props
    this._asyncRequest = postService.getPost(id).then(
        (externalData) => {
          // this._asyncRequest = null
          this.setState({externalData})
        }
    )
  }

  createMarkup() {
    const { post: { data: { html }}} = this.props
    return {
      __html: html
    }
  }

  render() {
    if (this.state.externalData === null) {
      return (
        <div>loading..........</div>
      )
    } else {
      return (
        <div>
          <div dangerouslySetInnerHTML={this.createMarkup()}></div>
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

const mapDispatchToProps = {
  getPost: postActions.getPost
}

export default connect(mapStateToProps, mapDispatchToProps)(PostContainer)
