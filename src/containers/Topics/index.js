import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

// actions
import { topicsActions } from '../../redux/topics'

// components & containers
import { CategoryNavComponent } from '../../components'

class TopicsContainer extends Component {
  // constructor(props) {
  //   super(props)
  // }

  componentDidMount() {
    const { getTopics, location, match } = this.props
    // console.log(match)
    // getTopics({ key, id, by })
  }

  render() {
    return (
      <div>
        <CategoryNavComponent />
        <div>
          <div><Link to="/post/46457122">Category</Link></div>
          <div><Link to="/post/46457122">Category</Link></div>
          <div><Link to="/post/46457122">Category</Link></div>
          <div><Link to="/post/46457122">Category</Link></div>
        </div>
      </div>
    )
  }
}

// redux connect
const mapStateToProps = (state) => {
  return {
    auth: state.auth.toJS()
  }
}

const mapDispatchToProps = {
  getTopics: topicsActions.getTopics
}

export default connect(mapStateToProps, mapDispatchToProps)(TopicsContainer)
