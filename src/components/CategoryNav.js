import React from 'react'
import { NavLink } from 'react-router-dom'

const CategoryNavComponent = () => {
  return (
    <div className="nav-category">
      <NavLink to="/category/5b050c7f3d434dbb3cc0f9f7">js / </NavLink>
      <NavLink to="/category/5b050c8d3d434dbb3cc0f9f8">css / </NavLink>
    </div>
  )
}

export default CategoryNavComponent
