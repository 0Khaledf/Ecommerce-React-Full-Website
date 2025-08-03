import React, { useEffect, useState } from 'react'
import './CatSlider.module.css'
import axios from 'axios'
import { useContext } from 'react'
import Loader from '../Loader/Loader'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { OtherContext } from '../CartContext/OtherContext'
export default function CatSlider() {

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 300,
    cssEase: "linear",
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024, // under 1024px
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768, // under 768px
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480, // under 480px
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
    const [catego, setCatego] = useState([])
    const {dar}= useContext(OtherContext);
    const [loading, setLoading] = useState(false);
    const [eror, setEror] = useState(null);
 
async function getProductsCelated() {
  
  try {
    setLoading(true);
    const{data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/`);
   
    const mydata  =data.data
    setEror(null)
    setCatego(mydata);
    console.log(mydata);
    
  } catch (error) {
    console.log("Error fetching products:", error);
    setCatego([])
    setEror(error.response.data.message);
  }
  finally {
    setLoading(false);
  }
}
  useEffect(() => {
    getProductsCelated();
  }, []);
  
 console.log(catego);
   
  return (
    <>
         {loading ? <div><Loader/></div> : eror ? (<div className='bg-red-300 border-red-900 text-red-900 p-3 m-10 rounded-b-lg'>{eror}</div>):(
    
    <div data-theme={dar}>
    <div className='pt-10 pb-10 dark:bg-black' >
    <Slider {...settings}>

      {catego.map((product) => (
        <div className="relative overflow-hidden  rounded-lg shadow-sm transition hover:shadow-lg m-4">
  <img
    alt=""
    src={product.image}
    className="absolute inset-0 w-full h-full  object-cover"
  />

  <div className="relative bg-gradient-to-t from-gray-950/100 to-gray-950/10 pt-32 sm:pt-48 lg:pt-64">
    <div className="p-4 sm:p-6">


      <p className="mt-2 line-clamp-3 text-sm/relaxed text-white/95 font-bold">
             {product.name}
      </p>
    </div>
  </div>
</div>
       
      ))}
    
      </Slider>
    </div>
    </div>)}
    </>
  )
}
