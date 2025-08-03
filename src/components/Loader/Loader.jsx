import React, { useContext } from 'react'
import './Loader.module.css'
import classes from './Loader.module.css'
import { OtherContext } from '../CartContext/OtherContext'
export default function Loader() {
const {dar} = useContext(OtherContext)
//console.log(dar)
  return (
    <>
    {!dar  ? (
   <div className=' justify-center items-center flex h-screen'>
  <div className={classes.loader2}></div>
  </div> ) :(
  <div className='bg-black justify-center items-center flex h-screen'>
  <div className={classes.loader}></div>
  </div>
  )}</>)
}
