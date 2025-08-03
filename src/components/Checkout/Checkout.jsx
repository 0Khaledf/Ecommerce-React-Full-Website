import React, { useEffect, useState } from 'react'
import './Checkout.module.css'
import axios from 'axios';
import { useContext } from 'react';
import { OtherContext } from '../CartContext/OtherContext';
import { useFormik } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import * as Yup from 'yup'
import { CartContext } from '../CartContext/CartContext';
import {toast} from 'react-toastify'
export default function Checkout() {

const [eror,setEror]=useState(null);
const {dar,setDark,token1,setToken1}=useContext(OtherContext)
const [isLoading,setIsLoading]=useState(false)
const {cinfo}=useContext(CartContext)
//console.log(cinfo)
const InitialValues={
    details:"",
    phone:"",
    city:""

  }
const validationSchema=Yup.object().shape(
  {city : Yup.string().min(3).max(28).required('Required '),}
)

const formik=useFormik({
  initialValues:InitialValues,
  validateForm:validateForm,
  //validationSchema,
  onSubmit:hReg,
})
async function hReg(values){
  const shippingAddress=values
  console.log('hi')
  setIsLoading(true)
  try

  { console.log(cinfo._id)
    const reg= await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cinfo["_id"]}`,{shippingAddress},{headers:{token:token1}});
  console.log(reg);
  toast.success("Your order has confirmed")
  console.log(reg.data)
  
}
  catch (error) {
   toast.error(error.responses.data.message)
   setEror(error.response.data.message);}
   finally{
    setIsLoading(false)
   }
}
function validateForm(values)
{
  
  
  let errors={}
  if(!values.City)
  {
    errors.city="City Is Required"
  }
  else if(values.name.length<3)
  {
    errors.city="Must be more than 3 ch and less than 28"
  }
  else if(values.name.length>=28)
  {
    errors.city="Must be more than 3 ch and less than 28"
  }
  else{
    errors.city=""
  }
  
  if(!values.details)
  {
    errors.details="Address Details Is Required"
  }
  
  else{
    errors.details=""
  }
  
  if(!values.phone)
  {
    errors.phone="Phone Number Is Required"
  }
  
  else if(!/^(002)?01[0125]{1}[0-9]{8}$/i.test(values.phone))
    {errors.phone="Invalid Phone Number"}
  else{
    errors.phone=""
  }
  
  
  
 return errors
}


  return (
    
<div data-theme={dar}  className='pt-25 pb-25 dark:bg-black'>
  {eror&& (<div className='bg-red-300 border-red-900 border-2 text-red-900 rounded  m-3 mb-5 p-3'>{eror}</div>)}
<form  className="lg:max-w-2xl mx-auto max-w-sm  " onSubmit={formik.handleSubmit}>
  <div  className="relative z-0 w-full mb-5 group dark:">
      <input onBlur={formik.handleBlur} type="text" name="details" id="details"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={formik.handleChange} value={formik.values.details} />
      <label for="floating_email"  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Address details</label>
  </div>
      {formik.errors.details&& formik.touched.details && (<div className='bg-red-300 border-red-900 border-2 text-red-900 rounded  m-3 mb-5 p-3'>{formik.errors.details}</div>)}

 
    <div  className="relative z-0 w-full mb-5 group">
        <input onBlur={formik.handleBlur} type="text" name="city" id="city"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={formik.handleChange} value={formik.values.name}  />
        <label for="floating_first_name"  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" onChange={formik.handleChange} value={formik.values.city} >City</label>
    </div>
        {formik.errors.city&& formik.touched.city &&(<div className='bg-red-300 border-red-900 border-2 text-red-900 rounded  m-3 mb-5 p-3'>{formik.errors.city}</div>)}


    <div  className="relative z-0 w-full mb-5 group">
        <input onBlur={formik.handleBlur} type="tel"  name="phone" id="phone"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={formik.handleChange} value={formik.values.phone} />
        <label for="floating_phone"  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number</label>
    </div>
    {formik.errors.phone&& formik.touched.phone &&(<div  className='bg-red-300 border-red-900 border-2 text-red-900 rounded  m-3 mb-5 p-3' >{formik.errors.phone}</div>)}
   
  <button type="submit"  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{isLoading? <>
          <FontAwesomeIcon icon={faSpinner} spin />
        </>:"Checkout"}</button>
</form>
</div>
   
  )
}
