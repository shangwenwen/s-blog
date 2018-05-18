import React, { Component } from 'react'
import { connect } from 'react-redux'
import { userActions } from '../_actions'

class HomeContainer extends Component {

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
        <div onClick={this.handleLogin.bind(this)}>shang</div>
        <div onClick={this.handleLogout.bind(this)}>退出</div>
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
  login: userActions.login,
  logout: userActions.logout
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)
