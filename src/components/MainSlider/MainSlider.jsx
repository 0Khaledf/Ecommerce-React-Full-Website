import React, { useState, useEffect, useCallback, useContext } from 'react';
import './MainSlider.module.css';
import cover from '../../assets/shopping-bag-cart.jpg'
import { OtherContext } from '../CartContext/OtherContext';
import { Link } from 'react-router-dom';

export default function MainSlider() {
 
    const {dar}= useContext(OtherContext);
   
    
return (
    <>
  <div data-theme={dar} className="dark:bg-black">
    <div className="relative overflow-hidden h-[32rem] flex items-center justify-center rounded-lg bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-sm transition hover:shadow-lg">
      <div className="relative text-center px-6 sm:px-12 lg:px-24 max-w-3xl">
        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold text-white drop-shadow-lg">
          Welcome to My E-commerce Store
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-white/90 font-medium leading-relaxed">
          Discover a world of shopping convenience and style. Explore fashion, electronics, and more with secure payments, fast delivery, and exclusive deals made just for you.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
           <Link to="/products">
          <button className="px-6 py-3 rounded-2xl bg-white text-indigo-700 font-bold shadow hover:text-indigo-400 hover:bg-teal-700 transition ">
          Shop Now
          </button>
          </Link>
        </div>
      </div>
    </div>
  </div>
</>
  )
}

