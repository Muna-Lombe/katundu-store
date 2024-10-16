
import React from 'react'
import img_path from '../../assets/tests/jsonServer/img/placeholders/avatar.png'

const AvatarIco = ({size="2.1rem", maxSize="max-w-[2.5rem]"}) => {
  
  
  return (
    <div id="avatar_image" className={"w-auto "+maxSize+"  aspect-square  lg:flex  "}>
      <img src={img_path} alt="" /> 
    </div>
  )
}

export default AvatarIco
