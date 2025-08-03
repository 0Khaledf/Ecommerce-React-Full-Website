import React, { useState, useEffect, useCallback, useContext } from 'react';
import './MainSlider.module.css';
import cover from '../../assets/shopping-bag-cart.jpg'
import { OtherContext } from '../CartContext/OtherContext';

export default function MainSlider() {
 
    const {dar}= useContext(OtherContext);
   
    
return (
    <>

    <div data-theme={dar} className='dark:bg-black'>
    <div className="relative overflow-hidden h-120 rounded-lg dark:bg-black shadow-sm transition hover:shadow-lg ">
  <img
    alt=""
    src={cover}
    className="absolute inset-0 w-full   object-cover"
  />

  <div className="relative bg-gradient-to-t from-gray-950/100 to-gray-950/10 pt-32 sm:pt-48 lg:pt-64 h-full">
    <div className="p-4 sm:p-6">

      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
        Welcome to My E-commerce Store
      </h1>
      <p className="mt-2 line-clamp-3  text-white/95 font-bold w-1/2">
           Welcom to My New Ecommerce Website! Discover a world of shopping convenience and style. Explore our wide range of products, from fashion to electronics, all at your fingertips. Enjoy seamless browsing, secure payments, and fast delivery. Join us today and elevate your shopping experience with exclusive deals and personalized recommendations. Happy shopping!
      </p>
    </div>
    </div>
    </div>
    </div>
    </>
  )
}

