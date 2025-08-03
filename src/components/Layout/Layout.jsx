import React, { useEffect, useState } from 'react'
import './Layout.module.css'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
import ScrollToTop from '../ScrollToTop/ScrollToTop'
export default function Layout() {

  return (
    <>
    <ScrollToTop />
   <Navbar />
    <Outlet />
    <Footer />
    </>
  )
}
