import { Outlet } from "react-router-dom";

import React from 'react'

const AuthLayout = () => {
  return (
      <div className="Auth">
          <Outlet />
    </div>
  )
}

export default AuthLayout
