import React from 'react'
import { Link } from 'react-router-dom'

const TopicComponent = (props) => {
  return (
    <div className="list">
      <Link to={'/post/' + props.item._id}>{props.item.title}</Link>
       /
      <Link to={'/category/' + props.item.category}>{props.item.category_name}</Link>
    </div>
  )
}

export default TopicComponent
