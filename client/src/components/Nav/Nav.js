import React from 'react'
import './Nav.scss'
import { Link } from 'react-router-dom'
import { AiOutlineUser } from 'react-icons/ai'


const Nav = () => {
  return (
    <nav className='navbar'>
      <div className="logo">
        <h1>Time-Table API</h1>
      </div>
      <div className="auth">
        <Link className='link'><AiOutlineUser className='icon'/>Login As A teacher?</Link>
      </div>
      </nav>
  )
}

export default Nav
