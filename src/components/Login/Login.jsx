import React, { useContext, useEffect, useState } from 'react'
import './Login.module.css'
import { useFormik } from 'formik'
import axios from 'axios'
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { OtherContext } from '../CartContext/OtherContext'
export default function Login() {
 const navi=useNavigate();
const [eror,setEror]=useState(null);
const {dar,setDark,token1,setToken1}=useContext(OtherContext)
const [isLoading, setIsLoading]=useState(false)
const InitialValues={
   
    password:"",
   
    email:"",

  }
const validationSchema=Yup.object().shape(
  {name : Yup.string().min(3).max(28).required('Required '),}
)
const formik=useFormik({
  initialValues:InitialValues,
  validateForm:validateForm,
  //validationSchema,
  onSubmit:hReg,
})
async function hReg(values){
  setIsLoading(true)
  try
  {const reg= await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',values);
   console.log(reg.data)
  if(reg.data.message="success")
  {

    setEror(null);
    console.log(reg.data)
    setToken1(reg.data.token)
    localStorage.setItem("token1",reg.data.token)
    localStorage.setItem("name1",reg.data.user.name)
    navi("/");

  }
}
  catch (error) {
   {console.log(error)}
   setEror(error.response.data.message);}
   finally{
    setIsLoading(false)
   }
}
function validateForm(values)
{
  
  
  let errors={};
  if(!values.email)
  {
    errors.email="Email Is Required"
  }
  
  else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email))
    errors.email="Invalid email address "
  else{
    errors.email=""
  }
  
  
  
  if(!values.password)
  {
    errors.password="Password Is Required"
  }
  else if(values.password.length<8)
  {
    errors.password="Must be more than 8 ch and less than 28"
  }
  else if(values.password.length>=28)
  {
    errors.password="Must be more than 8 ch and less than 28"
  }
  else{
    errors.password=""
  }
  
 
  
 return errors
}


  return (
    
<div data-theme={dar}  className='pt-25 pb-25 dark:bg-black'>
  {eror&& (<div className='bg-red-300 border-red-900 border-2 text-red-900 rounded  m-3 mb-5 p-3'>{eror}</div>)}
<form  className="lg:max-w-2xl mx-auto max-w-sm  " onSubmit={formik.handleSubmit}>
  <div  className="relative z-0 w-full mb-5 group dark:">
      <input onBlur={formik.handleBlur} type="email" name="email" id="email"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={formik.handleChange} value={formik.values.email} />
      <label htmlFor="floating_email"  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
  </div>
      {formik.errors.email&& formik.touched.email && (<div className='bg-red-300 border-red-900 border-2 text-red-900 rounded  m-3 mb-5 p-3'>{formik.errors.email}</div>)}

  <div  className="relative z-0 w-full mb-5 group">
      <input onBlur={formik.handleBlur} type="password" name="password" id="password"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={formik.handleChange} value={formik.values.password}  />
      <label htmlFor="floating_password"  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"  >Password</label>
  </div>
      {formik.errors.password&& formik.touched.password &&(<div className='bg-red-300 border-red-900 border-2 text-red-900 rounded  m-3 mb-5 p-3'>{formik.errors.password}</div>)}

 
 <button type="submit"  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{isLoading? <>
           <FontAwesomeIcon icon={faSpinner} spin />
         </>:"Log In"}</button>
</form>
</div>
   
  )
}
