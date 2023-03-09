import React from 'react'
import { titleTagTypes as tags } from '../assets'
const NoItems = ({ }) => {
  return (
    <div
      className="loading-product w-full min-w-[200px] flex flex-col justify-center items-center">
      <div id="no_items_banner__header"
        className="text-lg text-black font-raleway font-semibold">
        <h4>
          {tags.noItem.subText}
        </h4>
      </div>
      <div id="no_items_banner__footer"
        className="text-base text-black font-raleway font-bold">
        <h3>
          {tags.noItem.mainText}
        </h3>
      </div>
    </div>
  )
}

export default NoItems