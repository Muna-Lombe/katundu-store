import React from 'react'
import {  DiscountIco, SidebarBanner } from '../assets'
import Card from './Card'
import imgBg1 from '../assets/tests/jsonServer/img/placeholders/newCollection1.png'
import imgBg2 from '../assets/tests/jsonServer/img/placeholders/newCollection2.png'

const Sidebar = () => {
  return (
    <div id="sidebar" className=" hidden xl:w-full xl:h-full xl:flex xl:flex-col gap-8 justify-start items-center">
      <div id="sidebar_hero_banner" className="mt-2 p-2 w-full h-max   relative flex flex-col justify-center ">
    
        {/* <DiscountIco /> */}
        <SidebarBanner />

      </div>
      <div id="sidebar_content" className="w-full h-[60%] m-0 flex flex-col items-center overflow-y-scroll scroll-m-0 " >
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