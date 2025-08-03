import React, { createContext, useContext ,useState} from 'react'
import './CartContext.module.css'
import { OtherContext } from './OtherContext'
import axios from 'axios'
export const CartContext = createContext()
export default function CartContextProvider({children}) {
   const {token1}=useContext(OtherContext)
   const endpoint = `https://ecommerce.routemisr.com/api/v1/cart`
   const token=token1;
   const [cinfo,SetCinfo]=useState({})
  async function RemoveI(productId)
  {
    try {
     
      const res= await axios.delete(`${endpoint}/${productId}`,{headers:{token:token}});
      console.log(res)
      SetCinfo(res.data.data)
      return res.data
    } catch (error) {
      console.error("eror",error)
      return error
    }
  }
  async function UpdatQ(productId,count)
  {
    try {
     
      const res= await axios.put(`${endpoint}/${productId}`,{count},{headers:{token:token}});
      console.log(res)
      SetCinfo(res.data.data)
      return res.data
    } catch (error) {
      console.error("eror",error)
      return error
    }
  }
   async function AddCart(productId) {
    try {
 
    
      const {data}= await axios.post(endpoint,{productId},{headers:{
        token:token1
      }});
    // console.log(data);
     return data;
    } catch (error) {
      console.error("Error adding to cart:", error);
      return error 
    }
  }
    async function GetCart() {
      try {
        
     
      const  detail =await axios.get(endpoint,{headers: {token:token1}});
     // console.log(detail)
     SetCinfo(detail.data.data)
      return detail.data;
       }
        catch (error) {
          console.log("Error addding to cart : " , error);
          return error ;
        
      }
    }
  return (
    <CartContext.Provider value={{AddCart, GetCart,RemoveI,UpdatQ,cinfo}}>
        {children}
    </CartContext.Provider>
  )
}
