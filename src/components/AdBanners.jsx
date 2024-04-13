import React from 'react'
import Card from './Card'
import GridBanner from './GridBanner'
import imgBg1 from '../assets/tests/jsonServer/img/placeholders/newCollection1.png'
import imgBg2 from '../assets/tests/jsonServer/img/placeholders/newCollection2.png'

const AdBanners = ({grid, mosaic}) => {
  const MosaicBanner = ()=>(
    // make every 4rd card bigger than the rest
    
    <div id="mosaic-banner" className="mosaic-banner w-full max-w-[95%] flex flex-col">
      <div id="mosaic-short-banner" className="mosaic-banner less-than-xs:hidden h-[60%] m-0 flex flex-row flex-nowrap justify-between items-center gap-2   dark:text-white sm:flex-nowrap less-than-sm:child:child:w-auto less-than-sm:child:child:top-1/2 less-than-sm:child:child:left-0 less-than-sm:child:child:pl-0 " >
        <Card imgBg={imgBg1} />
        <Card imgBg={imgBg2} />
        <Card imgBg={imgBg1} />
        <Card imgBg={imgBg2}  />

        {/* <Card imgBg={imgBg1} /> */}
      </div>
      <div id="mosaic-long-banner" className='w-auto child:child:w-full child:child:h-[80px] child:child:object-cover child:child:top-0 child:child:right-0 child:child:pl-0 '>

        <Card imgBg={imgBg1} />
      </div>
    </div>
  )
  if(grid){
    return(
      <GridBanner />
    )
  }
  
  if(mosaic){
    return(
      <MosaicBanner />
    )
  }
}

export default AdBanners