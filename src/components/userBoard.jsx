import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { reset, fetchData } from '../redux/features/service/userSlice'

const UserBoard = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { users, isLoading, isError, message } = useSelector((state) => state.user)

  useEffect(() => {
    if (isError) {
      console.log(message)
    }
    dispatch(fetchData())
    return () => {
      dispatch(reset())
    }
  }, [dispatch, isError, message])

  if (isLoading) {
    return <div>loading...</div>
  }

  return (
    <section className="container">
      <div className='header'>Users fetched</div>
        <div className="content">
          {users.map((user) => (
            <div className="card" key={user.id}  />
          ))}
        </div>
    </section>

  )
}

export default UserBoard