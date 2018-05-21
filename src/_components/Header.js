import React from 'react'
import { NavLink } from 'react-router-dom'

export const HeaderComponent = () => {
  return (
    <div>
      <NavLink activeClassName="current" exact to="/">home</NavLink>
      <span> / </span>
      <NavLink activeClassName="current" to="/about">about</NavLink>
    </div>
  )
}
