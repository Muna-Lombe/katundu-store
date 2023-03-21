
import React from 'react'
import img_path from '../assets/tests/jsonServer/img/placeholders/avatar.png'

const AvatarIco = ({size="2.1rem"}) => {
  
  
  return (
    <div id="avatar_image" className={"w-auto greater-than-sm:max-w-[2.8rem]  max-w-[1.6rem] aspect-square  lg:flex  "}>
      <img src={img_path} alt="" /> 
    </div>
  )
}

export default AvatarIco
