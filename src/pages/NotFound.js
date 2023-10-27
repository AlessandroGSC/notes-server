import React from 'react'
import NotFoundImg from '../404.png';
import '../styles/notFound.css'

function NotFound() {
  return (
    <div className='image__container'>
        <img className='img404' src={NotFoundImg} alt="404" />
    </div>
  )
}

export default NotFound;