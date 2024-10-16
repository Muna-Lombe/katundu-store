import React from 'react'
import {  DiscountIco, SidebarBanner } from './icons'
import Card from './Card'
import imgBg1 from '../assets/tests/jsonServer/img/placeholders/newCollection1.png'
import imgBg2 from '../assets/tests/jsonServer/img/placeholders/newCollection2.png'

const Sidebar = ({tabs, heroBanner}) => {
  tabs ||= [
          <Card imgBg={imgBg1}/>,
          <Card imgBg={imgBg2}/>,
          <Card imgBg={imgBg1}/>,
          <Card imgBg={imgBg1}/>,
          <Card imgBg={imgBg2}/>,
          <Card imgBg={imgBg1}/>
        ]
  return (
    <div id="sidebar" className="sidebar xl:flex xl:flex-col justify-start items-center bg-[#fcfbfb] border-[0.4px] border-[#f0efef] rounded-2xl">
      {
        heroBanner ?
        <div id="sidebar_hero_banner" className=" w-full    relative flex flex-col justify-center ">
          <heroBanner/>
        </div>
        : <></>

      }
      <div id="sidebar_content" className="w-max h-max m-1 py-5 px-2 flex flex-col justify-center items-start overflow-y-scroll scroll-m-0 dark:text-white " >
        {
          tabs?.map((tab, index) => {
            return (
              <div className="sidebar-tab w-full hover:bg-slate-200 hover:border-l hover:border-l-orange-600 hover:font-medium">
                {
                  tab?.content?.subTabs?
                  <tab.link key={index}>
                    {
                      tab.content.subTabs.map((subtab, subindex) => {
                        return (
                          <subtab.link key={subindex}>
                            {subtab.text}
                          </subtab.link>
                          )
                      })
                    }
                  </tab.link>
                  : <tab.link key={index}/>
                }
              </div>
              
             
            )
          })
        }
      </div>
    </div>
  )
}

export default Sidebar