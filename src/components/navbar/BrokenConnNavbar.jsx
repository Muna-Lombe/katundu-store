import React, {  useEffect, useMemo, useRef, useState } from 'react';
import { Link, createSearchParams, useLocation, useNavigate } from "react-router-dom";

// assets
import { AvatarIco, CartIco, PinIco, SearchIco, titleTagTypes as tags } from '../icons';
import { useDispatch, useSelector } from 'react-redux';
import { selectProductNamesThatMatch, setSearchedProductId } from '../../js/slices/products/productsSlice';
import Logo from '../Logo';
import { imagepath } from '../../assets/images';
import { useGetEmbeddedProductsQuery, useGetPopularSearchesQuery, useGetProductsQuery, useLazyGetPopularSearchesQuery, useLazyGetProductsQuery, useLazySearchForProductsQuery } from '../../js/middleware/queryHandler';
import types from '../../orm/actions/actionTypes';
import { createdToastMessage } from '../../orm/models/ToastMessageModel';
import NavMenu from './NavMenu';
import SearchField from './SearchField';



const BrokenConnNavbar = ({children}) => {
  
  


  const location = useLocation()
  
  
  
  const toggle = (classList, classes = { curr: "", tar: "" }) => ({
    on: () => {
      // classList.replace(classes.curr, classes.tar)
      classList.toggle(classes.curr, false)
      classList.toggle(classes.tar, true)
    },
    off: () => {
      // classList.replace(classes.tar, classes.curr)
      classList.toggle(classes.tar, false)
      classList.toggle(classes.curr, true)
    }
  });
  const isNotAllowed = () => (
    location.pathname.includes("checkout")
    || location.pathname.includes("history")

  )
  const isShowProductPath = () => (
    location.pathname.includes("product")
  )
 

  const NavLogo = ({ toggle }) => {
   



    return (
      <Link to={''} id="logo_animation_container" className='cursor-pointer  '>
        <img id="logo_long_png" src={imagepath("/img/placeholders/Katundu.png")} className="max-w-[14rem] " alt="" />
      </Link>
    )
  }
 
  return (
    //  md:items-center
    <>
      <nav id="nav_container" className=" px-3 pt-2 pb-1 relative w-full h-full flex justify-center gap-2 items-center  lg:items-center xl:items-center dark:text-white child:h-full ">
        {/* " w-full flex  gap-4 lg:flex lg:flex-row xl:flex xl:flex-row justify-start items-center transition-all" */}
        <div id="navbar_left__wrapper" className=" w-full flex less-than-sm:flex-wrap items-center justify-between gap-2 less-than-logo-min:gap-3 ">
          {/* lg:w-auto xl:auto flex  less-than-xs:gap-4 */}
          {/* m-1 align-start  w-full flex less-than-xs:flex-wrap justify-start gap-4 transition-all ease-in-out delay-700 */}
          <div id="logo_location" className="container order-1 w-min  relative flex justify-cente gap-2 insert-previous-classes-here  first:h-[44px]">
              {/* <Logo clickEv={()=>""} logo={tags.footer.storename} size={{ h: 40, w: 40, x:10, y: 32, font: 38 }}/> */}
              <Logo>
                <NavLogo toggle={toggle}/>
              </Logo>
           
            
          </div>
          {
            isNotAllowed()
            ? ""
            // less-than-sm:mt-4 greater-than-md:w-max max-h-14 lg:min-w-[2rem] xl:min-w-[2rem] py-2 flex flex-col justify-start items-start
            :<div id="search_field_wrapper"  className="w-full flex items-center justify-center order-2 less-than-sm:order-3 less-than-logo-min:w-full less-than-logo-min:block  insert-previous-classes-here transition-all">
                
                
              <div className='w-full flex justify-center items-center gap-2'>
                  
                  
              </div>
              
            </div>
          
          }
          <div className="navbar_right__wrapper order-3 less-than-sm:order-2">
            
          </div>
        </div>
        
      </nav>
        {isShowProductPath()?
          children
          : ""
        }
    </>
  )
}

export default BrokenConnNavbar