import React, { Component } from 'react'
import { connect } from 'react-redux'

// actions
import { topicsActions } from '../../redux/topics'

// components & containers
import { CategoryNavComponent, TopicComponent } from '../../components'

class TopicsContainer extends Component {
  constructor(props) {
    super(props)
    this.handleLoadMore = this.handleLoadMore.bind(this)
  }

  componentDidMount() {
    if (this.props.topics.category !== this.props.match.params.category) {
      this.loadAsyncTopics()
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.category !== this.props.match.params.category) {
      this.loadAsyncTopics()
    }
  }

  handleLoadMore() {
    const { page } = this.props.topics
    this.loadAsyncTopics(page + 1)
  }

  loadAsyncTopics(page = 1) {
    const {
      getTopics,
      match: {
        params: { id, key, by, category }
      }
    } = this.props
    getTopics({ id, key, by, limit:1, page, category })
  }

  render() {
    const { topics } = this.props
    return (
      <div>
        <CategoryNavComponent />
        {
          topics.lists.map((item) => {
            return (
              <TopicComponent item={item} key={item._id} index={item.id} />
            )
          })
        }
        <div onClick={this.handleLoadMore}>加载更多</div>
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
  getTopics: topicsActions.getTopics
}

export default connect(mapStateToProps, mapDispatchToProps)(TopicsContainer)
