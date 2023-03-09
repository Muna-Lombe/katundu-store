import React from 'react'
import { setTextBg } from '../assets'

const Logo = ({ children, logo = "Logo Store", size = { h: 40, w: 40, x: 0, y: 30, font: 30 }, addLogo=true, addText=true  }) => (
  !children
    ? <p className=" -py-1 w-max text-[#8f8f91] flex items-end gap-2 child-hover:text-blue-500 child-hover:cursor-pointer ">
        {addLogo 
          ? <span className={"px-1 w-["+size.h+"px] aspect-square border rounded-lg bg-center bg-no-repeat"} style={setTextBg(logo.split(" ").map((i, x) => i[0]).join("").toString().toLocaleUpperCase(),size)}>
            </span>
          :""
        }
        <span>
          { addText ? logo:""}
        </span>
      </p>
    : children
  
)

export default Logo