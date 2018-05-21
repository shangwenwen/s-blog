import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'

export class HeaderComponent extends Component {

  handleLogin() {
    this.props.history.push('/about')
  }

  render() {
    const { isLogined } = this.props
    return (
      <div>
        <NavLink activeClassName="current" exact to="/">home</NavLink>
        <span> / </span>
        <NavLink activeClassName="current" to="/about">about</NavLink>
        <span> / </span>
        {
          isLogined
            ? <Link to="/account">logined</Link>
            : <span onClick={this.handleLogin.bind(this)}>login</span>
        }
      </div>
    )
  }
}
