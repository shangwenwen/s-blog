import React, { Component } from 'react'
import { connect } from 'react-redux'
import { userActions } from '../_actions'

class HomeContainer extends Component {
  constructor(props) {
    super(props)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogin() {
    const { login } = this.props
    login('admin', '11111111')
  }

  handleLogout() {
    this.props.logout()
  }

  render() {
    return (
      <div>
        <div onClick={this.handleLogin}>shang</div>
        <div onClick={this.handleLogout}>退出</div>
      </div>
    )
  }
}

// connect redux
const mapStateToProps = (state) => ({
  user: state.user
})

const mapDispatchToProps = {
  login: userActions.login,
  logout: userActions.logout
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)
