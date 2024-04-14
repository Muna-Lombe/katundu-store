
import React, { useState } from 'react'
import BasketIco from './BasketIco'

const OpenIco = ({className="", size=14}) => {
  const [isRotated, setIsRotated] = useState(false)
  

  return (
    <svg className={className+" cursor-pointer "+(isRotated ? "rotate-180":"")} onClick={()=>(setIsRotated((prevState)=> !prevState))} width={size} height={size-6} viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 7L7 1L13 7" stroke="#AEC2EA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export default OpenIco
