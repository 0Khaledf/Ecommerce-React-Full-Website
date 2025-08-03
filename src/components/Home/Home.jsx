import React, { useEffect, useState } from 'react'
import './Home.module.css'
import MainSlider from '../MainSlider/MainSlider'
import CatSlider from '../CatSlider/CatSlider'
import Recent from '../Recent/Recent'
export default function Home() {

  return (
    <>
     <MainSlider />
     <CatSlider />
     <Recent />
    </>
  )
}
