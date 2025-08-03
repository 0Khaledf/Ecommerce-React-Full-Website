import React, { useEffect, useState } from 'react'
import './Cart.module.css'
import { CartContext } from '../CartContext/CartContext'
import { OtherContext } from '../CartContext/OtherContext'
import Loader from '../Loader/Loader'
import { useContext } from 'react'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
export default function Cart() {
    const [edit,SetEdit]=useState(false);
    const {dar,token1}= useContext(OtherContext);
    const [lloading, setLloading] = useState(false);
    const [eror, setEror] = useState(null);
    const {AddCart,GetCart ,RemoveI,UpdatQ}=useContext(CartContext);
    const [mydata, setMydata] = useState([]);
    const [detai,setDetai]=useState({})
    
    async function getCardItems() {
      try{
      setLloading(true);
      const res= await GetCart();
      //console.log(res.data.products);
      const mdata=res.data.products;
      const de=res.data;
      setMydata(mdata);
      setDetai(de);
      //console.log(mdata);
      //console.log(de);
      setEror(null);}
      catch (error) {

        console.error("Error fetching cart items:", error);
        setEror(error);
        setMydata([]);
      }
      finally{
        setLloading(false);
      }
    }
    async function  Remo(productId) {
        try {
           
            const res=await RemoveI(productId);
            console.log(res);
            const datat=res.data.products;;
            const datatt =res.data;
            console.log(datatt);
            console.log(datat)
            setMydata(datat);
           setDetai(datatt)
            toast("item deleted successfully")

        } catch (error) {
            console.error(error)
            toast.error("error");
            
        }
    }
    async function  UpdateQ1(productId,count) {
        try {
           
            const res=await UpdatQ(productId,count);
            console.log(res);
            const datat=res.data?.products;
            const datatt =res.data;
            console.log(datatt);
            console.log(datat)
            setMydata(datat);
           setDetai(datatt)
            

        } catch (error) {
            console.error(error)
            toast.error("error");
            
        }
    }
  useEffect(() => {
    token1 && getCardItems();
  }, [token1]);
  
  return (
    <>
    <div data-theme={dar}>
        {lloading ? <div><Loader/></div> : eror ? (<div className='bg-red-300 border-red-900 text-red-900 p-3 m-10 rounded-b-lg'>{eror}</div>):(
          <div className='dark:bg-black'>
         
       

<div className="relative overflow-x-auto shadow-md sm:rounded-lg pr-5 pl-5">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-16 py-3">
                    <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                    Product
                </th>
                <th scope="col" className="px-6 py-3">
                    Qty
                </th>
                <th scope="col" className="px-6 py-3">
                    Price
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
          {mydata.map((item,index)=>(

            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="p-4">
                    <img src={item.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={item.product.title}/>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {item.product.title}
                </td>
                <td className="px-6 py-4">
                    <div className="flex items-center">
                        <button onClick= { ()=>{UpdateQ1(item.product.id,((item.count)-1))}} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                            <span className="sr-only">Quantity button</span>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
                            </svg>
                        </button>
                        <div>
                            <input type="number" id="first_product" className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={item.count} required />
                        </div>
                        <button onClick= { ()=>{UpdateQ1(item.product.id,((item.count)+1))}} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                            <span className="sr-only">Quantity button</span>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor"  strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                            </svg>
                        </button>
                    </div>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                   {item.price} EGP
                </td>
                <td className="px-6 py-4">
                    <button onClick={()=>{Remo(item.product.id)}} className="font-medium text-red-600 dark:text-red-500 hover:underline">
                        Remove</button>
                </td>
            </tr>
          ))}
        </tbody>
    </table>
</div>
<div className='text-center p-5 mt-5'>
  <span className='bg-green-100 p-5 text-green-600 border-2 rounded-lg '>
   Total Price : {detai.totalCartPrice}
   </span>
   
</div>
<div className='text-center p-5 mt-5'>
   <Link to="/checkout" className='text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>Checkout</Link>  
   </div>

        
          </div>)}
    </div>
    </>
  )
}
