import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom'
import { hot } from 'react-hot-loader'
import cookies from 'js-cookie'
import Loadable from 'react-loadable'

// actions
import auth from '../../redux/auth'
import user from '../../redux/user'

// components & containers 异步加载组件
import HeaderComponent from '../../components/Header'
import LoadingComponent from '../../components/Loading'
import PrivateRoute from '../../components/PrivateRoute'
import BackTopComponent from '../../components/BackTop'

const AsyncCategoryContainer = Loadable({ loader: () => import('../Topics'), loading: LoadingComponent })
const AsyncPostContainer = Loadable({ loader: () => import('../Post'), loading: LoadingComponent })
const AsyncAccountContainer = Loadable({ loader: () => import('../Account'), loading: LoadingComponent })
const AsyncAboutContainer = Loadable({ loader: () => import('../Me'), loading: LoadingComponent })

// css style
import '../../assets/style.css'

class AppContainer extends React.Component {
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
            <Route exact path="/" component={AsyncCategoryContainer} />
            <Route name="category" path="/category/:id" component={AsyncCategoryContainer} />
            <Route name="search" path="/search/:key" component={AsyncCategoryContainer} />
            <Route name="post" path="/post/:id" component={AsyncPostContainer} />
            <Route name="about" path="/about" component={AsyncAboutContainer} />
            <PrivateRoute name="account" path="/account" component={AsyncAccountContainer} />
          </Switch>
        </div>
        <BackTopComponent />
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
  login: auth.actions.login,
  logout: auth.actions.logout,
  getUser: user.actions.getUser
}

// 使用 withRouter 传递 history
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(hot(module)(AppContainer)))
