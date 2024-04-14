
import React from 'react'

const BasketIco = ({strokeColor="black"}) => {
 
  return (
   <span className=''>
      <svg className={"w-full max-w-[20px] aspect-square stroke-current group-hover:stroke-white"} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.45172 17.9355C7.89711 17.9355 8.25817 17.5745 8.25817 17.1291C8.25817 16.6837 7.89711 16.3226 7.45172 16.3226C7.00632 16.3226 6.64526 16.6837 6.64526 17.1291C6.64526 17.5745 7.00632 17.9355 7.45172 17.9355Z"  strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16.3226 17.9355C16.768 17.9355 17.129 17.5745 17.129 17.1291C17.129 16.6837 16.768 16.3226 16.3226 16.3226C15.8772 16.3226 15.5161 16.6837 15.5161 17.1291C15.5161 17.5745 15.8772 17.9355 16.3226 17.9355Z"  strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M1 1H4.22581L6.3871 11.7984C6.46084 12.1697 6.66283 12.5032 6.9577 12.7406C7.25257 12.9779 7.62153 13.104 8 13.0968H15.8387C16.2172 13.104 16.5861 12.9779 16.881 12.7406C17.1759 12.5032 17.3779 12.1697 17.4516 11.7984L18.7419 5.03226H5.03226"  strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
   </span>
  )
}

export default BasketIco
