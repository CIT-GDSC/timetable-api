import React from 'react'
import Nav from '../Nav/Nav'
import './Home.scss'



const Home = () => {
  return (
    <div className='Home'>
      <Nav />
      <div className='Home__content'>
        <h1 className='Home__content__title'>Welcome to the MERN Boilerplate</h1>
        </div>
    </div>
  )
}

export default Home
