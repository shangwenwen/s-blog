import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom'
import { hot } from 'react-hot-loader'

// actions
import auth from '../../redux/auth'
import user from '../../redux/user'

// components & containers 异步加载组件
import HeaderComponent from '../../components/Header'
import PrivateRoute from '../../components/PrivateRoute'
import BackTopComponent from '../../components/BackTop'

import TopicsContainer from '../Topics'
import PostContainer from '../Post'
import AccountContainer from '../Account'
import MeContainer from '../Me'

// css style
import '../../assets/style.css'

class AppContainer extends React.Component {
  componentDidMount() {
    if (this.props.auth.token && typeof this.props.user.username === 'undefined') {
      this.props.loadUser()
    }
  }

  render() {
    return (
      <div className="main">
        <HeaderComponent
          username={this.props.user.username}
          onLogin={this.props.authLogin}
          onGetUser={this.props.loadUser}
          onLogout={this.props.authLogout}
          hasLogin={this.props.auth.token}
          history={this.props.history}
        />
        <div className="container">
          <Switch>
            <Route exact path="/" component={TopicsContainer} />
            <Route name="category" path="/category/:id" component={TopicsContainer} />
            <Route name="search" path="/search/:key" component={TopicsContainer} />
            <Route name="post" path="/post/:id" component={PostContainer} />
            <Route name="about" path="/about" component={MeContainer} />
            <PrivateRoute name="account" path="/account" component={AccountContainer} />
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
  authLogin: auth.actions.login,
  authLogout: auth.actions.logout,
  loadUser: user.actions.load
}

// 使用 withRouter 传递 history
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(hot(module)(AppContainer)))
