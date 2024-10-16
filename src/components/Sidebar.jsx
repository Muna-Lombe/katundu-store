import React from 'react'
import {  DiscountIco, SidebarBanner } from './icons'
import Card from './Card'
import imgBg1 from '../assets/tests/jsonServer/img/placeholders/newCollection1.png'
import imgBg2 from '../assets/tests/jsonServer/img/placeholders/newCollection2.png'

const Sidebar = ({tabs, heroBanner}) => {
  return (
    <div id="sidebar" className="sidebar h-full xl:flex xl:flex-col  justify-start items-center bg-[#fcfbfb] border-[0.4px] border-[#f0efef] rounded-2xl">
      {heroBanner && (
        <div id="sidebar_hero_banner" className="w-full relative flex flex-col justify-center">
          {heroBanner()}
        </div>
      )}
      <div id="sidebar_content" className="w-full h-max m-1 py-5 px-2 flex flex-col lg:flex-nowrap justify-center items-start overflow-y-auto scroll-m-0 dark:text-white">
        {tabs.map((tab, index) => (
          <div key={index} className="sidebar-tab w-full flex lg:flex-nowrap">
            {tab}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
