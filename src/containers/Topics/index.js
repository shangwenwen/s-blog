import React from 'react'
import { connect } from 'react-redux'

// actions
import { topicsActions } from '../../redux/topics'

// components & containers
import { CategoryNavComponent, TopicComponent } from '../../components'

class TopicsContainer extends React.Component {
  constructor(props) {
    super(props)
    this.handleLoadMore = this.handleLoadMore.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
  }

  componentDidMount() {
    const {topics, location} = this.props
    if (topics.pathname !== location.pathname) {
      this.loadAsyncTopics()
    }

    const scrollTop = topics.scrollTop || 0
    window.scrollTo(0, scrollTop)

    window.addEventListener('scroll', this.handleScroll, false)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.loadAsyncTopics()
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll, false)
  }

  // 加载更多
  handleLoadMore() {
    const { page } = this.props.topics
    this.loadAsyncTopics(page + 1)
  }

  // 本地存储滚动条顶部距离
  handleScroll() {
    const scrollTop = this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
    const { saveScrollTop } = this.props
    saveScrollTop(scrollTop)
  }

  // 异步加载列表
  loadAsyncTopics(page = 1) {
    const {
      getTopics,
      location: { pathname },
      match: {
        params: { id, key, by }
      }
    } = this.props
    getTopics({ id, key, by, limit: 5, page, pathname })
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
  getTopics: topicsActions.getTopics,
  saveScrollTop: topicsActions.saveScrollTop
}

export default connect(mapStateToProps, mapDispatchToProps)(TopicsContainer)
