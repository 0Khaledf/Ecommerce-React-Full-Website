import React, { createContext ,useState,useEffect } from 'react'
export const OtherContext =createContext();
export default function OtherContextProvider({children}) {
    const [dar,setDark]=useState(false);
  const [token1,setToken1]= useState(null)
  const share={dar,setDark,token1,setToken1}
  useEffect(()=>{
      if(localStorage.getItem("token1")){
          setToken1(localStorage.getItem("token1"))
      }
    },[])
  return (
    <OtherContext.Provider value={share}>
        {children}
    </OtherContext.Provider>
  )
}
