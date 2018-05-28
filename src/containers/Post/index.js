import React, { Component } from 'react'
import { connect } from 'react-redux'

// actions
import { postActions } from '../../redux/post'

class PostContainer extends Component {
  state = {
    pathname:'ss'
  }

  // componentDidMount() {
  //   if(this.props.post.pathname === '' || this.props.post.pathname !== this.props.location.pathname) {
  //     this._handleFetchPost(this.props.match.params.id, this.props.location.pathname)
  //   }
  // }

  static getDerivedStateFromProps(nextProps, prevState) {
    // console.log(nextProps.post.pathname)
    // console.log(prevState.pathname)
    if (nextProps.post.pathname !== prevState.pathname) {
      return {
        pathname: nextProps.post.pathname,
      }
    }
    return null
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.pathname && this.props.post.pathname) {
      this._handleFetchPost(this.props.match.params.id, this.props.location.pathname)
    }
  }

  _handleFetchPost(id, pathname) {
    const { post, getPost } = this.props
    getPost({id, pathname})
  }

  createMarkup() {
    const { post } = this.props
    return {__html: post.data.html}
  }

  render() {
    return (
      <div dangerouslySetInnerHTML={this.createMarkup()}></div>
    )
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
