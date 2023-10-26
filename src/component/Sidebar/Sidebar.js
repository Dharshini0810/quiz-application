import React from 'react'
import './Sidebar.css'

function Sidebar(props) {
  return (
      <div className="admin-page">
      <div className="side-bar-left">
        <div className="category"></div>
        {props.children}
      </div>
    </div>
  )
}

export default Sidebar
