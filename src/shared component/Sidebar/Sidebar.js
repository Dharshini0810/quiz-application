import React from "react";

import "./Sidebar.css";

function Sidebar(props) 
{

  return (
    <div>
      <div className="admin-page">
        <div className="category"></div>
        {props.children}
      </div>
    </div>
  );
}

export default Sidebar;
