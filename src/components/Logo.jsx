import React from 'react'
import { setTextBg } from '../assets'

const Logo = ({ children, logo = "Logo Store", textColor = "text-orange-600", bgColor ="bg-orange-600", textHoverColor ="text-orange-500", size = { h: 40, w: 40, x: 1, y: 30, font: 35 }, addLogo=true, addText=true  }) => (
  !children
    ? <p className={"logo-logo -py-1 w-max " + textColor + " flex items-center gap-2 child-hover:" + textHoverColor +"  child-hover:cursor-pointer border rounded-lg"}>
        {addLogo 
          ? <span className={"px-1 w-["+size.h+"px] aspect-square border rounded-lg invert-0 bg-center bg-no-repeat " + bgColor} style={setTextBg(logo.split(" ").map((i, x) => i[0]).join("").toString().toLocaleUpperCase(),textColor="white", size)}>
            </span>
          :""
        }
        { addText 
          ? <span className={"logo-text px-1 text-2xl font-normal "+ textColor}>
              {logo}
            </span>
          :""
        }
        
      </p>
    : children
  
)

export default Logo