import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom'
import { hot } from 'react-hot-loader'

// components & containers
import CategoryContainer from '../CategoryPage'
import PostContainer from '../PostPage'
import AboutContainer from '../AboutPage'
import { HeaderComponent } from '../_components'

// css style
import '../_assets/style.css'

class AppContainer extends Component {
  render() {
    console.log('---')
    return (
      <div className="main">
        <HeaderComponent location={this.props.location} history={this.props.history} />
        <div className="container">
          <Switch key={this.props.location.pathname} location={this.props.location}>
            <Route exact path="/" component={CategoryContainer} />
            <Route name="category" path="/category/:category" component={CategoryContainer} />
            <Route name="post" path="/post/:id" component={PostContainer} />
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
