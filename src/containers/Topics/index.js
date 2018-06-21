import React from 'react'
import { connect } from 'react-redux'

// redux
import topics from '../../redux/topics'

// components & containers
import CategoryNavComponent from '../../components/CategoryNav'
import TopicComponent from '../../components/Topic'

class TopicsContainer extends React.Component {
  constructor(props) {
    super(props)
    this.handleLoadMore = this.handleLoadMore.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
  }

  componentDidMount() {
    const { topics, location } = this.props
    if (topics.pathname !== location.pathname) {
      this._loadAsyncTopics()
    }

    const scrollTop = topics.scrollTop || 0
    window.scrollTo(0, scrollTop)

    window.addEventListener('scroll', this.handleScroll, false)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this._loadAsyncTopics()
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll, false)
  }

  // 加载更多
  handleLoadMore() {
    const { page } = this.props.topics
    this._loadAsyncTopics(page + 1)
  }

  // 本地存储滚动条顶部距离
  handleScroll() {
    this.props.topicsScrollTop(window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0)
  }

  // 异步加载列表
  _loadAsyncTopics(page = 1) {
    const { topicsLoad, location: { pathname }, match: { params: { id, key, by }}} = this.props
    topicsLoad({ id, key, by, limit: 5, page, pathname })
  }

  render() {
    const { topics } = this.props
    let html = null

    if (!topics.pathname) {
      html = (
        <div>加载中，请稍等....</div>
      )
    } else if (topics.lists.length > 0) {
      html = (
        <div>
          {
            topics.lists.map((item) => {
              return (
                <TopicComponent item={item} key={item._id} index={item.id} />
              )
            })
          }
          {
            topics.hasNext
              ? <div onClick={this.handleLoadMore}>加载更多</div>
              : <div>全部加载完成...</div>
          }
        </div>
      )
    } else {
      html = (
        <div>当前分类没有文章...</div>
      )
    }

    return (
      <div>
        <CategoryNavComponent />
        {html}
      </div>
    )
  }
}

// redux connect
const mapStateToProps = (state) => {
  return {
    topics: state.topics.toJS()
  }
}

const mapDispatchToProps = {
  topicsLoad: topics.actions.load,
  topicsScrollTop: topics.actions.scrollTop
}

export default connect(mapStateToProps, mapDispatchToProps)(TopicsContainer)
