import React from 'react'
import { connect } from 'react-redux'

// redux post
import post from '../../redux/post'

class PostContainer extends React.Component {
  state = {
    externalData: null
  }

  static getDerivedStateFromProps(props, state) {
    if (props.match.params.id !== state.prevId) {
      return {
        externalData: null,
        prevId: props.match.params.id
      }
    }

    return null
  }

  // 初始化页面渲染数据
  componentDidMount() {
    this._asyncLoadPost(this.props.match.params.id)
  }

  // 页面更新加载数据
  componentDidUpdate(prevProps, prevState) {
    if (prevState.externalData === null) {
      this._asyncLoadPost(this.props.match.params.id)
    }
  }

  componentWillUnmount(){
    this._currentId && (this._currentId = null)
  }

  async _asyncLoadPost(id) {
    const { dispatch, load, loadSuccess, loadFailure} = this.props

    if(id === this._currentId){
      return
    }

    this._currentId = id

    dispatch(load())
    await post.service.getPost(id)
      .then(
        (res) => {
          if (res.data.code === 200) {
            if(id === this._currentId) {
              this.setState({
                externalData: res.data.data
              })
            }
            return dispatch(loadSuccess(res.data.data))
          }
          return dispatch(loadFailure(res.data))
        }
      )
  }

  _createMarkup() {
    const { externalData: { html }} = this.state
    return {
      __html: html
    }
  }

  render() {
    console.log('render')
    if (this.state.externalData === null) {
      return (
        <div>loading..........</div>
      )
    } else {
      return (
        <div>
          <div dangerouslySetInnerHTML={this._createMarkup()}></div>
          <div>{this.state.externalData.visit}</div>
        </div>
      )
    }
  }
}

// redux
// const mapStateToProps = (state) => {
//   return {
//     post: state.post.toJS()
//   }
// }

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    load: post.actions.load,
    loadSuccess: post.actions.loadSuccess,
    loadFailure: post.actions.loadFailure
  }
}

export default connect(null, mapDispatchToProps)(PostContainer)
