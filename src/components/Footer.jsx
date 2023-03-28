import React from 'react'
import { FbIco, InstaIco, VkIco, titleTagTypes as tags } from '../assets'
import Google_Play_Link from '../assets/tests/jsonServer/img/placeholders/Google_Play_Lnk.png'
import Apple_Store_Link from '../assets/tests/jsonServer/img/placeholders/App_Store_Lnk.png'
import Logo from './Logo'
import { Link } from 'react-router-dom'

const Footer = ({}) => {
  return (
    <div id="footer_wrapper" className="w-full h-full flex flex-col justify-around">
      <div id="footer_top" className="w-auto flex flex-wrap justify-between items-center">
        <div id='footer_logo' className="">
          {/* <h3 className=" text-3xl md:text-5xl lg:text-5xl xl:text-5xl  font-bold font-raleway lining-nums tabular-nums ">
            {tags.footer.storename}
          </h3> */}
          <Link to="" >
            <Logo logo={tags.footer.storename} size={{ h: 40, w: 40, x: 10, y: 32, font: 38 }} />
          </Link> 
        </div>
        {/* <div id="footer_links" className="w-auto max-w-[400px] mx-4 flex flex-wrap gap-2"> */}
          <div id="footer_socials" className="w-max flex flex-wrap flex-col gap-2 text-xs  md:text-base lg:text-base xl:text-base text-slate-600 font-raleway lining-nums tabular-nums  font-semibold ">
            <p>{tags.footer.joinus}</p>
            <span className="flex gap-2 child:cursor-pointer">
              <span className="w-full  min-w-[20px] md:w-full lg:w-full xl:w-full  aspect-square">
                <FbIco />
              </span>
              <span className="w-full  min-w-[20px] md:w-full lg:w-full xl:w-full aspect-square">
                <InstaIco />

              </span>
              <span className="w-full  min-w-[20px] md:w-full lg:w-full xl:w-full aspect-square">
                <VkIco />

              </span>
              
            </span>
          </div>
          <div id="footer_app_links" className=" flex flex-wrap flex-col gap-2 text-xs md:text-base lg:text-base xl:text-base text-slate-600 font-raleway lining-nums tabular-nums  font-semibold">
            <p>{tags.footer.appInstall+":"}</p>
            <span className="flex flex-wrap gap-2 contrast-150 child:cursor-pointer">
              <img src={Google_Play_Link} className=" max-w-[7rem] h-[2rem] " alt="" />
              <img src={Apple_Store_Link} className=" max-w-[7rem] h-[2rem] " alt="" />
            </span>
            
          </div>
        {/* </div> */}
        
      </div>
      <div id="footer_bottom" className=" flex flex-row flex-nowrap justify-center gap-3 text-[12px] child:cursor-pointer child-hover:text-blue-500 md:text-base lg:text-base xl:text-base text-gray-500 font-raleway lining-nums tabular-nums  font-light">
        <p>{tags.footer.trademark}</p>
        <p>{tags.footer.legal}</p>
        <p>{tags.footer.privacy}</p>
      </div>
    </div>

  )
}

export default Footer