import React, { Component } from 'react'
import { connect } from 'react-redux'

// actions
import { postActions } from '../../redux/post'

class PostContainer extends Component {
  state = {
    users: ''
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if(nextProps.post.pathname !== prevState.users) {
      return {
        users: nextProps.post.pathname
      }
    }

    return null
  }

  componentDidMount() {
    if (this.props.post.pathname !== this.props.location.pathname) {
      this.handleFetchPost()
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.location.pathname !== this.props.location.pathname) {
      this.handleFetchPost()
    }
  }

  handleFetchPost() {
    const { getPost, match: { params: { id }}, location: { pathname }} = this.props
    getPost({ id, pathname })
  }

  createMarkup() {
    const { post: { data: { html }}} = this.props
    return {
      __html: html
    }
  }

  render() {
    if(this.props.post.isPending) {
      return(
        <div>loading..........</div>
      )
    } else {
      return (
        <div>
          <div dangerouslySetInnerHTML={this.createMarkup()}></div>
          <div>{this.props.post.data.visit}</div>
          <div>{this.state.users}</div>
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
