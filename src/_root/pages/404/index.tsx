import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div>
      <p>404</p>
      <Link to={'/'}>Go to Home Page</Link>
    </div>
  )
}

export default NotFoundPage