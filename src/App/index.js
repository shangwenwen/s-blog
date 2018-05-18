import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom'
import { hot } from 'react-hot-loader'

import { userActions } from '../_actions'

// components & containers
import HomeContainer from '../HomePage'

// css style
import '../_assets/style.css'

class AppContainer extends Component {

  render() {
    const { login } = this.props
    login('admin', '11111111')

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

const mapDispatchToProps = {
  login: userActions.login
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(hot(module)(AppContainer)))
