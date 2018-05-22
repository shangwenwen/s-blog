import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

// components & containers
import { CategoryNavComponent } from '../_components'

class CategoryContainer extends Component {
  // constructor(props) {
  //   super(props)
  // }

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

export default connect(null, null)(CategoryContainer)
