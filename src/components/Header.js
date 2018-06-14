import React from 'react'
import { NavLink, Link } from 'react-router-dom'

class HeaderComponent extends React.Component {
  constructor(props) {
    super(props)
    this.handleLogout = this.handleLogout.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }

  // 等待登录后获取用户信息
  async _awaitlogin() {
    await this.props.onLogin('admin', '11111111')
    return this.props.onGetUser()
  }

  handleLogin() {
    this._awaitlogin()
  }

  handleLogout() {
    this.props.onLogout()
  }

  render() {
    const { haslogin, username } = this.props
    return (
      <div>
        <NavLink activeClassName="current" exact to="/">home</NavLink>
        <span> / </span>
        <NavLink activeClassName="current" to="/about">about</NavLink>
        <span> / </span>
        {
          haslogin
            ? <span><Link to="/account">{username ? username : <span>welcome</span>}</Link> / <a onClick={this.handleLogout}>logout</a></span>
            : <span><a onClick={this.handleLogin}>login</a> / <a>register</a></span>
        }
      </div>
    )
  }
}

export default HeaderComponent
