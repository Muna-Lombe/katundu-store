import React from 'react'
import {  DiscountIco, SidebarBanner } from './icons'
import Card from './Card'
import imgBg1 from '../assets/tests/jsonServer/img/placeholders/newCollection1.png'
import imgBg2 from '../assets/tests/jsonServer/img/placeholders/newCollection2.png'

const Sidebar = () => {
  return (
    <div id="sidebar" className="sidebar xl:w-full xl:h-full xl:flex xl:flex-col justify-start items-center bg-[#fcfbfb] border-[0.4px] border-[#f0efef] rounded-2xl">
      <div id="sidebar_hero_banner" className=" w-full    relative flex flex-col justify-center ">
    
        {/* <DiscountIco /> */}
        {/* <SidebarBanner /> */}


      </div>
      <div id="sidebar_content" className="w-full h-[60%] m-0 flex flex-row flex-wrap justify-center items-center overflow-y-scroll scroll-m-0 dark:text-white " >
        <Card imgBg={imgBg1}/>
        <Card imgBg={imgBg2}/>
        <Card imgBg={imgBg1}/>
        <Card imgBg={imgBg1}/>
        <Card imgBg={imgBg2}/>
        <Card imgBg={imgBg1}/>
      </div>
    </div>
  )
}

export default Sidebar