import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom'
import { hot } from 'react-hot-loader'
import cookies from 'js-cookie'
import Loadable from 'react-loadable'

// actions
import { authActions } from '../../redux/auth/actions'
import { userActions } from '../../redux/user/actions'

// components & containers 异步加载组件
import { HeaderComponent, PrivateRoute, LoadingComponent } from '../../components'
const CategoryContainer = Loadable({ loader: () => import('../Topics'), loading: LoadingComponent })
const PostContainer = Loadable({ loader: () => import('../Post'), loading: LoadingComponent })
const AccountContainer = Loadable({ loader: () => import('../Account'), loading: LoadingComponent })
const AboutContainer = Loadable({ loader: () => import('../Me'), loading: LoadingComponent })

// css style
import '../../assets/style.css'

class AppContainer extends Component {
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
