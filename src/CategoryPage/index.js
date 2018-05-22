import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

// actions
import {listActions} from '../_actions'

// components & containers
import { CategoryNavComponent } from '../_components'

class CategoryContainer extends Component {
  // constructor(props) {
  //   super(props)
  // }

  componentDidMount() {
    const {
        getList,
        location: { pathname },
        match: {
            params: { id, key, by }
        }
    } = this.props
    getList({ id,key,by,pathname, page: 1 })
  }

  render() {
    // console.log(this.props.getList())
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
  getList: listActions.getList
}


export default connect(mapStateToProps, mapDispatchToProps)(CategoryContainer)
