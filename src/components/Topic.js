import React from 'react'
import { Link } from 'react-router-dom'

export const TopicComponent = (props) => {
  return (
    <div>
      <Link to={'/post/' + props.item._id} target="_blank">{props.item.title}</Link>
       /
      <Link to={'/category/' + props.item.category}>{props.item.category_name}</Link>
    </div>
  )
}
