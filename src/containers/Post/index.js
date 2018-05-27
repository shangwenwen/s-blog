import React, { Component } from 'react'
import { connect } from 'react-redux'

// actions
import { postActions } from '../../redux/post'

class PostContainer extends Component {
  componentDidMount() {
    const id = this.props.match.params.id
    this.props.getPost({id})
  }

  render() {
    console.log(this.props.post)
    return (
      <div>postpage</div>
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
