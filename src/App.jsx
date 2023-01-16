import { useState } from 'react'
import './App.css'
import { Route,Routes } from 'react-router-dom'
// import Data from './components/Data'
import UserBoard from './components/userBoard'
function App() {

  return (
    <div className="App">
      <Routes>
         <Route path='/' element={<UserBoard/>} />
      </Routes>
    </div>
  )
}

export default App
