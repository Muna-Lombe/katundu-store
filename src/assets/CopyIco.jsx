
import React, { useState } from 'react'
import { copyToClipboard } from '../orm/utilities'

const CopyIco = ({text, size=13}) => {
  const [isCopied, setIsCopied] = useState(false)
  let color = "#727280"
 
  

  const CopyNotice = ()=> {
      return(
        // (isCopied ? "flex": "hidden")+
          <span className={ (isCopied ? "flex": "hidden")+" absolute -top-5 -right-8 px-[1.5px] bg-slate-100 border border-gray-400 rounded-md text-xs text-gray-400 "}>
            copied!
          </span>
        
      )
    }
  return (
    <span id="copy_icon" className="relative flex gap-2">
      
      <svg className={"cursor-pointer less-than-xs:hidden  "+(isCopied ? "stroke-[#2967FF]" : "stroke-[#727280]"+" hover:stroke-[#2967FF]")} onClick={(e)=>copyToClipboard(e,text, setIsCopied)} width={size} height={size} viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M8.375 12.1251H2.125C1.43437 12.1251 0.875 11.5657 0.875 10.8751V4.62506C0.875 3.93444 1.43437 3.37506 2.125 3.37506H8.375C9.06563 3.37506 9.625 3.93444 9.625 4.62506V10.8751C9.625 11.5657 9.06563 12.1251 8.375 12.1251Z" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3.37512 3.375V2.125C3.37512 1.43437 3.9345 0.875 4.62512 0.875H10.8751C11.5657 0.875 12.1251 1.43437 12.1251 2.125V8.375C12.1251 9.06563 11.5657 9.625 10.8751 9.625H9.62512" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <CopyNotice />
      
    </span>
    

  )
}

export default CopyIco
