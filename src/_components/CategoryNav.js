import React from 'react'
import { NavLink } from 'react-router-dom'

export const CategoryNavComponent = () => {
  return (
    <div className="nav-category">
      <NavLink to="/category/cate1">cate1</NavLink>
      <NavLink to="/category/cate2">cate2</NavLink>
      <NavLink to="/category/cate3">cate3</NavLink>
    </div>
  )
}
