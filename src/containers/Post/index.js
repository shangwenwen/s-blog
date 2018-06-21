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
    // console.log(this.props.match.params.id)
    this.props.postLoad(this.props.match.params.id)
  }

  // 页面更新加载数据
  componentDidUpdate(prevProps, prevState) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.props.postLoad(this.props.match.params.id)
    }
  }

  handleLike() {
    console.log('like')
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

const mapDispatchToProps = {
  postLoad: post.actions.load
}

export default connect(mapStateToProps, mapDispatchToProps)(PostContainer)
