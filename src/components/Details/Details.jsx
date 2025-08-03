import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useContext } from 'react'    
import { Link, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import './Details.module.css'
import Loader from '../Loader/Loader'
import Relatedc from '../Relatedc/Relatedc'
import { useRef } from 'react';
import clas from './Details.module.css'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { OtherContext } from '../CartContext/OtherContext'
import { CartContext } from '../CartContext/CartContext'
import { toast } from 'react-toastify'
export default function Details() {
   const [pDetails, setPDetails] = useState({})
    const {dar}= useContext(OtherContext);
    const [loading, setLoading] = useState(false);
    const [eror, setEror] = useState(null);
    const x= useParams();
   const carouselRef = useRef(null);

   const {AddCart}=useContext(CartContext);
  const idd = x.productId;
  const scroll = (direction) => {
    const scrollAmount = direction === 'left' ? -carouselRef.current.offsetWidth : carouselRef.current.offsetWidth;
    carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };
  async function AddCartR(id){
        const result = await AddCart(id);
        console.log(result);
         if(result.status === "success") {
          console.log("Product added to cart successfully");
        toast(result.message, {type: "success"});}
          else{
          console.log("Failed to add product to cart");
          console.log(res);
          toast(result.message, {type: "error"});
          }
      }
async function getProductsDetails(idd) {
  
  try {
    setLoading(true);
    
    const{data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${idd}`);
   // console.log(data);
    const mydata  =data.data ;
    setEror(null)
    setPDetails(mydata);

    
  } catch (error) {
    console.log("Error fetching products:", error);
    setPDetails({})
    setEror(error.response.data.message);

  }
  finally {
    setLoading(false);
  }
}
  useEffect(() => {
    getProductsDetails(idd);
  }, [idd]);
  
    return (
    <>
     {loading ? <div><Loader/></div> : eror ? (<div className='bg-red-300 border-red-900 text-red-900 p-3 m-10 rounded-b-lg'>{eror}</div>):(
    <div data-theme={dar}>
     <div className="bg-white dark:bg-black max-w-full pb-10">
      <div className=" grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4  sm:px-6  lg:max-w-7xl lg:grid-cols-2 lg:px-8">
        <div className='relative w-full max-w-5xl mx-auto px-4  '>
          <h2 className="text-3xl p-5 font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">{pDetails.title}</h2>
          <p className="mt-4 text-gray-500 p-3 dark:text-gray-400">
            {pDetails.description}
          </p>
          <p className=" text-gray-900 font-bold p-3 dark:text-white">
             {pDetails.category?.name} </p>
          <p className=" text-gray-900 p-3 font-bold dark:text-white">
            Price: ${pDetails.price} </p>
            <p className="mt-4 text-sm text-gray-900 font-bold p-3  dark:text-white">{pDetails.ratingsAverage}
                  <FontAwesomeIcon icon={faStar} className="text-yellow-500 ml-1" />
                </p>
            <button className="mt-4 inline-flex items-center justify-center rounded-md border border-transparent bg-gray-900 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:bg-white dark:text-black dark:hover:bg-gray-200"
            onClick={() => AddCartR(pDetails.id)}>
              Add to Cart </button>
          
        </div>
        <div className="relative w-full max-w-5xl mx-auto px-4   lg:ml-30 xl:ml-30  ">
      {/* Left Arrow */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/70 hover:bg-white shadow px-2 py-1 rounded-full"
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>

      {/* Carousel Container */}
      <div
        ref={carouselRef}
        className={` flex overflow-x-auto scroll-smooth snap-x snap-mandatory gap-4 rounded-lg ${clas.noscrollbar} `}
      >
         {pDetails?.images?.map((image, index) => (
          <img
            alt="Walnut card tray with white powder coated steel divider and 3 punchout holes."
            src={image}
            key={index}
            className="rounded-lg bg-gray-100"
            
          />
        ))}
      </div>

      {/* Right Arrow */}
      <button
        onClick={() => scroll('right')}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/70 hover:bg-white shadow px-2 py-1 rounded-full"
      >
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
    </div>
   
       
      
        
      </div>
    </div>
    <Relatedc />
    </div>
    )}
    </>
  )
}
