import React, { Component } from 'react'
import { connect } from 'react-redux'

// actions
import { topicsActions } from '../../redux/topics'

// components & containers
import { CategoryNavComponent, TopicComponent } from '../../components'

class TopicsContainer extends Component {
  // constructor(props) {
  //   super(props)
  // }

  componentDidMount() {
    const { getTopics } = this.props
    getTopics({ page: 1, limit: 5 })
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
