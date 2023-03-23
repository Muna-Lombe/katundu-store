import React from 'react'
import { titleTagTypes as tags } from '../assets'
const NoItems = ({ subText, mainText }) => {
  return (
    <div
      className="loading-product w-full min-w-[200px] flex flex-col justify-center items-center">
      <div id="no_items_banner__header"
        className=" less-than-xs:text-base text-lg text-black font-raleway font-semibold">
        <h4>
          {subText || tags.noItem.subText}
        </h4>
      </div>
      <div id="no_items_banner__footer"
        className=" less-than-xs:text-sm text-base text-black font-raleway font-bold">
        <h3>
          {mainText || tags.noItem.mainText}
        </h3>
        
      </div>
    </div>
  )
}

export default NoItems