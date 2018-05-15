import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom'
import { hot } from 'react-hot-loader'

// components & containers
import HomeContainer from '../HomePage'

// css style
import '../_assets/style.css'

class AppContainer extends Component {

  render() {
    return (
      <div className="main">
        <div className="container">
          <Switch>
            <Route exact path="/" component={HomeContainer} />
          </Switch>
        </div>
      </div>
    )
  }
}

// connect redux
const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default withRouter(connect(mapStateToProps, null)(hot(module)(AppContainer)))
