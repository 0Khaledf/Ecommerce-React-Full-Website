import React, { createContext, useContext, useEffect, useState } from 'react'
import './Recent.module.css'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import Loader from '../Loader/Loader'
import { Link } from 'react-router-dom'
import { OtherContext } from '../CartContext/OtherContext'
import { CartContext } from '../CartContext/CartContext'
import { toast } from 'react-toastify'
export default function Recent() {
    const [products, setProducts] = useState([])
    const {dar}= useContext(OtherContext);
    const [loading, setLoading] = useState(false);
    const [eror, setEror] = useState(null);
    const {AddCart} = useContext(CartContext);
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
async function getProducts() {
  
  try {
    setLoading(true);
    const{data} = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
    //console.log(data);
    const mydata  =data.data ;
    setEror(null)
    setProducts(mydata);
    
    
  } catch (error) {
    console.log("Error fetching products:", error);
    setProducts([])
    setEror(error.response.data.message);
  }
  finally {
    setLoading(false);
  }
}
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
    {loading ? <div><Loader/></div> : eror ? (<div className='bg-red-300 border-red-900 text-red-900 p-3 m-10 rounded-b-lg'>{eror}</div>):(
    <div data-theme={dar}>
       <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-6 gap-4 p-4 dark:bg-black dark:text-white">
        {products.map((product) => (
          <div>
        <Link  key={product.id} to={`/details/${product.id}/${product.category.name}`} className="group relative block overflow-hidden h-110 content-stretch dark:bg-black dark:text-white">
  <button
    className="absolute end-4 top-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-red-500 hover:bg-black dark:bg-black dark:text-white dark:hover:text-red-500 dark:hover:bg-white "
  >
 
    <span className="sr-only">Wishlist</span>

    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="size-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
      />
    </svg>
  </button>

  <img
    src={product.images[0]} alt=""
    className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
  />

  <div className="relative border rounded border-gray-100  bg-white p-6 dark:bg-black dark:text-white dark:border-gray-700">
    <span className="bg-yellow-400 px-3 py-1.5 text-xs font-medium whitespace-nowrap"> New </span>
  
    <h3 className="mt-4 text-base font-medium text-gray-900 line-clamp-1  dark:text-white">{product.title}</h3>
     <p className="mt-1.5 text-sm text-gray-700 dark:text-white">{product.category.name}</p>
    <p className="mt-1.5 text-sm text-gray-700 inline dark:text-white">{product.price}$</p>
    <p className="mt-1.5 text-sm text-gray-700 float-right inline dark:text-white">{product.ratingsAverage}
      <FontAwesomeIcon icon={faStar} className="text-yellow-500 ml-1" />
    </p>
    </div>
  </Link>
    
      <button
        className="block w-full rounded-sm bg-yellow-400 p-4 text-sm font-medium transition hover:scale-105 dark:text-black"
        onClick={()=> AddCartR(product.id)}
      >
        Add to Cart
      </button>
  </div>
 ))}
       </div>
       </div>)}
    </>
  )
}
