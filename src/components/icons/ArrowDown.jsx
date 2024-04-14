
import React from 'react'

const ArrowDown = ({size=20, defaultPos, handleClick}) => {
  const rotate =()=>{
    switch (defaultPos) {
      case "down":
        return "rotate-90"
        break;
      case "up":
        return "-rotate-90"
      default:
        return ""
        break;
    }
  }
  return (
    // <svg fill="currentColor" version="1.1" id="Layer_1" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" space="preserve"> 
    //   <path d="M98.9,184.7l1.8,2.1l136,156.5c4.6,5.3,11.5,8.6,19.2,8.6c7.7,0,14.6-3.4,19.2-8.6L411,187.1l2.3-2.6 c1.7-2.5,2.7-5.5,2.7-8.7c0-8.7-7.4-15.8-16.6-15.8v0H112.6v0c-9.2,0-16.6,7.1-16.6,15.8C96,179.1,97.1,182.2,98.9,184.7z"/> 
    // </svg>
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"  onClick={(e) => handleClick(e)} className={" arrow-"+defaultPos+" p-0 m-0 max-w-"+size+" h-max transition-transform "+rotate()+" z-30 cursor-pointer"}>
      <path d="M5.29308 12.293C5.19757 12.3852 5.12139 12.4956 5.06898 12.6176C5.01657 12.7396 4.98898 12.8708 4.98783 13.0036C4.98668 13.1364 5.01198 13.268 5.06226 13.3909C5.11254 13.5138 5.18679 13.6255 5.28069 13.7194C5.37458 13.8133 5.48623 13.8875 5.60913 13.9378C5.73202 13.9881 5.8637 14.0134 5.99648 14.0122C6.12926 14.0111 6.26048 13.9835 6.38249 13.9311C6.50449 13.8787 6.61483 13.8025 6.70708 13.707L11.7071 8.70698C11.8946 8.51945 11.9999 8.26514 11.9999 7.99998C11.9999 7.73482 11.8946 7.48051 11.7071 7.29298L6.70708 2.29298C6.51848 2.11082 6.26588 2.01003 6.00368 2.01231C5.74148 2.01458 5.49067 2.11975 5.30526 2.30516C5.11985 2.49057 5.01469 2.74138 5.01241 3.00358C5.01013 3.26578 5.11092 3.51838 5.29308 3.70698L9.58608 7.99998L5.29308 12.293Z" fill="black" className="pointer-events-none"  />
    </svg>

  )
}

export default ArrowDown