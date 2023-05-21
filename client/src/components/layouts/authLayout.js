import { Outlet } from "react-router-dom";

import React from 'react'

const authLayout = () => {
  return (
      <div className="Auth">
          <Outlet />
    </div>
  )
}

export default authLayout
