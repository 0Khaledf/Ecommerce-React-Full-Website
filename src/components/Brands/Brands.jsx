import React, { useEffect, useState } from 'react'
import './Brands.module.css'
import axios from 'axios'
import { OtherContext } from '../CartContext/OtherContext'
import Loader from '../Loader/Loader'
import { useContext } from 'react'
import { CartContext } from '../CartContext/CartContext'

export default function Brands() {

  
    const [brand, setBrand] = useState([])
    const {dar}= useContext(OtherContext);
    const [loading, setLoading] = useState(false);
    const [eror, setEror] = useState(null);
 
async function getProductsBrands() {
  
  try {
    setLoading(true);
    const{data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/`);
   
    const mydata  =data.data
    setEror(null)
    setBrand(mydata);
    console.log(mydata);
    
  } catch (error) {
    console.log("Error fetching products:", error);
    setBrand([])
    setEror(error.response.data.message);
  }
  finally {
    setLoading(false);
  }
}
  useEffect(() => {
    getProductsBrands();
  }, []);
  
 console.log(brand);
   
  return (
    <>
         {loading ? <div><Loader/></div> : eror ? (<div className='bg-red-300 border-red-900 text-red-900 p-3 m-10 rounded-b-lg'>{eror}</div>):(
    
    <div data-theme={dar}>
    <div className='pt-10 pb-10 dark:bg-black' >
    
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 dark:bg-black dark:text-white ">
      {brand.map((product) => (
        <a href="#" className="group relative block bg-black border-2 border-black rounded-2xl dark:text-black dark:border-2 dark:border-white dark:rounded-2xl">
  <img
    alt=""
    src={product.image}
    className="absolute inset-0 h-full w-full object-fill opacity-75 transition-opacity group-hover:opacity-50 rounded-2xl"
  />

  <div className="relative p-4 sm:p-6 lg:p-8">

    <p className="text-xl font-bold text-white sm:text-2xl">{product.name}</p>

    <div className="mt-32 sm:mt-48 lg:mt-64">
      <div
        className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"
      >
        <p className="text-sm text-white">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis perferendis hic asperiores
          quibusdam quidem voluptates doloremque reiciendis nostrum harum. Repudiandae?
        </p>
      </div>
    </div>
  </div>
</a>
      ))}
      </div>
    
     
    </div>
    </div>)}
    </>
  )
}
