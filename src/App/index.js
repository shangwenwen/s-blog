import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, withRouter, Link, NavLink } from 'react-router-dom'
import { hot } from 'react-hot-loader'

// components & containers
import HomeContainer from '../HomePage'
import ArticleContainer from '../ArticlePage'
import AboutContainer from '../AboutPage'

// css style
import '../_assets/style.css'

class AppContainer extends Component {
  render() {
    return (
      <div className="main">
        <div>
          <NavLink activeClassName="current" exact to="/">home</NavLink>
          <NavLink activeClassName="current" to="/">article</NavLink>
          <NavLink activeClassName="current" to="/">about</NavLink>
        </div>
        <div className="container">
          <Switch>
            <Route exact path="/" component={HomeContainer} />
            <Route name="article" path="/article/:id" component={ArticleContainer} />
            <Route name="about" path="/about" component={AboutContainer} />
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
