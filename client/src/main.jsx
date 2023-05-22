import React from 'react'
import ReactDOM from 'react-dom/client'
import Error from './Err/404.js'
import App from './App.jsx'



import {
  RouterProvider,
  Route, 
  createBrowserRouter
} from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
  },
  {
    path: '*',
    element: <Error/>,
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
