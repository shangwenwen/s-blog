import React from 'react'
import { Link } from 'react-router-dom'

export const TopicComponent = (props) => {
  return (
    <div>
      <Link to={'/post/' + props.item._id}>{props.item.title}</Link>
    </div>
  )
}
