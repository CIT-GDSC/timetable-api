import { useState } from 'react'
import './App.css'
import { Route,Routes } from 'react-router-dom'
import Data from './components/Data'
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Routes>
         <Route path='/' element={<Data/>} />
      </Routes>
    </div>
  )
}

export default App
