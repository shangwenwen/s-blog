import React from 'react'
import { NavLink } from 'react-router-dom'

export const CategoryNavComponent = () => {
  return (
    <div className="nav-category">
      <NavLink to="/category/js">js / </NavLink>
      <NavLink to="/category/css">css / </NavLink>
    </div>
  )
}
