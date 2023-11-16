import React, { useEffect } from 'react'
import { FbIco, InstaIco, VkIco, titleTagTypes as tags } from '../assets'
import Google_Play_Link from '../assets/tests/jsonServer/img/placeholders/Google_Play_Lnk.png'
import Apple_Store_Link from '../assets/tests/jsonServer/img/placeholders/App_Store_Lnk.png'
import Logo from './Logo'
import { Link } from 'react-router-dom'
import { imagepath } from '../assets/images'

const Footer = ({}) => {
  const LogoImg = () => {
    const toggleOnResize = () => {
      const logoParent = document.getElementById("footer_top")
      const logoLongPng = document.getElementById("logo_long_png")
      const logoShortPng = document.getElementById("logo_short_png")
      const logoGif = document.getElementById("logo_trans_gif")
      const logoGifRev = document.getElementById("logo_trans_gif_reverse")
      // logoParent.clientWidth
      let tm = ""
      const canBeToggledTrue = (classList, classname) => {
        return classList.contains(classname)
          ? ""
          : classList.toggle(classname, true)
      }
      const canBeToggledFalse = (classList, classname) => {
        return classList.contains(classname)
          ? classList.toggle(classname, false)
          : ""

      }
      const toggleForward = () => {
        // logoLongPng.classList.toggle("hidden", true)
        canBeToggledTrue(logoLongPng.classList, "hidden")
        setTimeout(() => {
          // logoGif.classList.toggle("hidden", true)
          // canBeToggledTrue(logoGif.classList, "hidden")
          // logoShortPng.classList.toggle("hidden", false)
          canBeToggledFalse(logoShortPng.classList, "hidden")
        }, 300);
        // logoGif.classList.toggle("hidden", false)
        // canBeToggledFalse(logoGif.classList, "hidden")
      }

      const toggleReverse = () => {
        // logoShortPng.classList.toggle("hidden", true)
        canBeToggledTrue(logoShortPng.classList, "hidden")
        setTimeout(() => {
          // logoGifRev.classList.toggle("hidden", false)
          // canBeToggledFalse(logoGifRev.classList, "hidden")


          // logoLongPng.classList.toggle("hidden", false)
          canBeToggledFalse(logoLongPng.classList, "hidden")

        }, 300);
        // logoGifRev.classList.toggle("hidden", true)
        // canBeToggledTrue(logoGifRev.classList, "hidden")
      }

      const toggleForContentBox = (entries) => {
        const box = entries[0]?.contentBoxSize
        if (Math.floor(box[0]?.inlineSize) <= 350) {
          toggleForward()
        }
        if (Math.floor(box[0]?.inlineSize) > 350) {
          toggleReverse()
        }
      }


      const toggleForContentRect = (entries) => {
        const rect = entries[0]?.contentRect
        if (Math.floor(rect[0]?.width) < 350) {
          toggleForward()
        }
        if (Math.floor(rect[0]?.width) > 350) {
          toggleReverse()

        }
      }
      const resizeObserver = new ResizeObserver((entries) => {
        // console.log(entries)
        if (entries[0]?.contentBoxSize) {
          clearTimeout(tm)
          tm = setTimeout(() => {
            toggleForContentBox(entries)
            // console.log("is box size?:",entries[0]?.contentBoxSize[0].inlineSize === 270)

          }, 100);
        } else if (entries[0].contentRect) {

          clearTimeout(tm)
          tm = setTimeout(() => {
            toggleForContentRect(entries)
            // console.log("is rect size?:",entries[0]?.contentRect.width === 270)

          }, 100);

        }

      })
      resizeObserver.observe(logoParent)
      return (() => resizeObserver.unobserve(logoParent))
    }
    useEffect(() => {
      // console.log("jsdhffdalfj")
      // toggleOnResize()
    }, [])

    return (
      <>
        <img id="logo_long_png" src={imagepath("/img/placeholders/Katundu.png")} className="less-than-xs:max-w-[10rem] max-w-[14rem]  " alt="" />
        {/* <img id="logo_short_png" src={imagepath("/img/placeholders/Katundu_short.png")} className="max-w-[2.8rem] hidden  object-scale-down object-center" loading='lazy' alt="" /> */}
      </>
    )
  }
  return (
    <div id="footer_wrapper" className="w-full h-full flex flex-col justify-around">
      <div id="footer_top" className="w-auto flex flex-wrap justify-between items-center">
        <div id='footer_logo' className="less-than-xs:child:w-[4rem]">
          {/* <h3 className=" text-3xl md:text-5xl lg:text-5xl xl:text-5xl  font-bold font-raleway lining-nums tabular-nums ">
            {tags.footer.storename}
          </h3> */}
          <Logo>
            <Link to="" >
              <LogoImg/>
              {/* <Logo logo={tags.footer.storename} size={{ h: 40, w: 40, x: 10, y: 32, font: 38 }} /> */}
            </Link> 
          </Logo>
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
            <span className="flex flex-wrap flex-shrink gap-2 contrast-150 child:cursor-pointer">
              <img src={Google_Play_Link} className="less-than-xs:w-[4rem]  max-w-[7rem] aspect-auto " alt="" />
              <img src={Apple_Store_Link} className="less-than-xs:w-[4rem] max-w-[7rem] aspect-auto " alt="" />
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