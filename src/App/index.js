import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom'
import { hot } from 'react-hot-loader'

// components & containers
import CategoryContainer from '../CategoryPage'
import PostContainer from '../PostPage'
import AboutContainer from '../AboutPage'
import AccountContainer from '../AccountPage'
import { HeaderComponent } from '../_components'

// css style
import '../_assets/style.css'

class AppContainer extends Component {
  // constructor(props) {
  //   super(props)
  // }
  // componentDidMount() {
  //   console.log(this.props.history)
  // }

  render() {
    return (
      <div className="main">
        <HeaderComponent isLogined={this.props.auth.token} history={this.props.history} />
        <div className="container">
          <Switch>
            <Route exact path="/" component={CategoryContainer} />
            <Route name="category" path="/category/:category" component={CategoryContainer} />
            <Route name="post" path="/post/:id" component={PostContainer} />
            <Route name="about" path="/about" component={AboutContainer} />
            <Route name="account" path="/account" component={AccountContainer} />
          </Switch>
        </div>

      </div>
    )
  }
}

// connect redux
const mapStateToProps = (state) => {
  return {
    auth: state.auth.toJS()
  }
}

// 使用 withRouter 传递 history
export default withRouter(connect(mapStateToProps, null)(hot(module)(AppContainer)))
