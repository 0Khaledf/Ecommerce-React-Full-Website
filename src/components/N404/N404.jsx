import React, { useEffect, useState } from 'react'
import './N404.module.css'
import { Link } from 'react-router-dom'
export default function N404() {

  return (
    <>
      <div className='text-center'>
       <p className='lg:text-6xl md:text-2xl text-center mt-40 font-bold'> Page Not Found 404</p>
        <br />
        <Link to="/" className='bg-blue-600 text-white rounded p-2 m-5 hover:bg-blue-800'>Go Home</Link>
      </div>
    </>
  )
}
