import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom'
import { hot } from 'react-hot-loader'
import cookies from 'js-cookie'

// actions
import { authActions, userActions } from '../_actions'

// components & containers
import CategoryContainer from '../CategoryPage'
import PostContainer from '../PostPage'
import AboutContainer from '../AboutPage'
import AccountContainer from '../AccountPage'
import { HeaderComponent, PrivateRoute } from '../_components'

// css style
import '../_assets/style.css'

class AppContainer extends Component {
  // constructor(props) {
  //   super(props)
  // }

  componentDidMount() {
    let token = cookies.get('user')

    if (token && typeof this.props.user.username === 'undefined') {
      this.props.getUser()
    }
  }

  render() {
    return (
      <div className="main">
        <HeaderComponent username={this.props.user.username} onLogin={this.props.login} onGetUser={this.props.getUser} onLogout={this.props.logout} haslogin={this.props.auth.token} history={this.props.history} />
        <div className="container">
          <Switch>
            <Route exact path="/" component={CategoryContainer} />
            <Route name="category" path="/category/:category" component={CategoryContainer} />
            <Route name="post" path="/post/:id" component={PostContainer} />
            <Route name="about" path="/about" component={AboutContainer} />
            <PrivateRoute name="account" path="/account" component={AccountContainer} />
          </Switch>
        </div>

      </div>
    )
  }
}

// connect redux
const mapStateToProps = (state) => {
  return {
    auth: state.auth.toJS(),
    user: state.user.toJS()
  }
}

const mapDispatchToProps = {
  login: authActions.login,
  logout: authActions.logout,
  getUser: userActions.getUser
}

// 使用 withRouter 传递 history
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(hot(module)(AppContainer)))
