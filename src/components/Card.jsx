import React from 'react'

import { titleTagTypes as tags } from "../assets";

const Card = ({ imgBg}) => {
  return (
    // lg:w-[25.5rem] lg:h-48 md:w-[22rem] md:h-[10rem]
    <div className=" relative m-2 rounded-3xl">
      <img className="w-full h-full rounded-3xl" src={imgBg} alt="" />
      <h2 className="absolute top-[50%] right-[50%] text-xl text-white font-raleway lining-nums tabular-nums  font-bold">
        {tags.collectionCard.text}
      </h2>
    </div>
  )
}

export default Card
