import React from 'react'

import { titleTagTypes as tags } from "../assets";

const Card = ({ imgBg, centered}) => {
  return (
    // lg:w-[25.5rem] lg:h-48 md:w-[22rem] md:h-[10rem]
    <div className=" relative m-2 rounded-3xl">
      <img className=" rounded-2xl" src={imgBg} alt="" />
      {
        centered ?
          <h2 className="absolute top-0 right-0 text-lg pl-4  text-white  font-raleway lining-nums tabular-nums  font-bold">
            {tags.collectionCard.text}
          </h2>
          : <h2 className="absolute top-[40%] right-[10%] flex justify-center items-center text-base pl-4  text-white  font-raleway lining-nums tabular-nums  font-bold">
              {tags.collectionCard.text}
            </h2>
      }
    </div>
  )
}

export default Card
