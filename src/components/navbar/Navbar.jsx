import React, {  useEffect, useMemo, useRef, useState } from 'react';
import { Link, createSearchParams, useLocation, useNavigate } from "react-router-dom";

// assets
import { AvatarIco, CartIco, PinIco, SearchIco, titleTagTypes as tags } from '../icons';
import { useDispatch, useSelector } from 'react-redux';
import { selectProductNamesThatMatch, setSearchedProductId } from '../../js/slices/products/productsSlice';
import Logo from '../Logo';
import { imagepath } from '../../assets/images';
import { useGetEmbeddedProductsQuery, useGetPopularSearchesQuery, useGetProductsQuery, useLazyGetProductsQuery, useLazySearchForProductsQuery } from '../../js/middleware/queryHandler';
import types from '../../orm/actions/actionTypes';
import { createdToastMessage } from '../../orm/models/ToastMessageModel';
import NavMenu from './NavMenu';
import SearchField from './SearchField';



const Navbar = ({children}) => {
  
  
  const dispatch = useDispatch();

  const ref = useRef(null)
 
  const location = useLocation()
  
  const { data: popSearchData, isSuccess: isPopSearchSuccess, isLoading: isPopSearchLoading, isError: isPopSearchError, error } = useGetPopularSearchesQuery("filters[popular_searches]=1")
  // { data: [], isError: false, isLoading: false, isSuccess: false }//
  // console.log("forced rerender");
  let popularSearchedProductNames = []
  if (isPopSearchError) {

    dispatch(createdToastMessage(
      {
        text:
        {
          header: "Error",
          body: "Something happened back-stage. Refresh the page and try again."
        },
        status: types.TOAST_VALID,
        type: types.TOAST_ERROR,
        id: "checkout error"
      })
    )

  }

  if (isPopSearchSuccess) {
    // console.log("dadada", popSearchData)
    popularSearchedProductNames = popSearchData
  }
  // console.log("render...")

  
  

  const toggle = (classList, classes={curr:"", tar:""}) => ({
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
  
  
  const GoToCartIco = ({isBurgerMenu=true,size="2.5rem"}) => (
   
      <Link id='cart' to="cart/" className=' w-[2rem] h-10 aspect-square flex justify-center '> 
        <CartIco size={size} isBurgerMenu={isBurgerMenu} isCartBtn={true} /> 
      </Link> 
  )
  
  const GoToAvatarIco = ({size})=> (

    <div className="avtr min-w-[40px] h-10 flex justify-center items-center">
      <Link to="history/" className='peer  flex'> 
        <AvatarIco  size={size}  />
      </Link> 
      {/* <Link id='cart' to="cart/" className='hidden '>
        <CartIco size={size} isBurgerMenu={false} isCartBtn={true} />
      </Link> 
      <Link id='dashboard' to="dashboard/" className='hidden '>
        <CartIco size={size} isBurgerMenu={false} isCartBtn={true} />
      </Link> 
      <Link id='settings' to="settings/" className='hidden '>
        <CartIco size={size} isBurgerMenu={false} isCartBtn={true} />
      </Link> 
      <Link id='logout' to="logout/" className='hidden '>
        <CartIco size={size} isBurgerMenu={false} isCartBtn={true} />
      </Link>  */}
    </div>
  )
  
  const GotoCategories = ({LabelText = "Categories"})=>{
    const CategoriesIcon =()=>(
       <svg fill="currentColor" className="w-[18px] h-[18px] less-than-xs:w-[16px]  " viewBox="0 0 16 16"> <path d="M6 1v3H1V1h5zM1 0a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1H1zm14 12v3h-5v-3h5zm-5-1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-5zM6 8v7H1V8h5zM1 7a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1H1zm14-6v7h-5V1h5zm-5-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1h-5z" /> </svg>
    )
    return (
      <Link to={"categories"} className=" p-2 w-max max-w-[150px] less-than-md:max-w-[40px] h-full less-than-xs:h-[30px] bg-slate-200 rounded-xl m-0 flex justify-center items-center gap-x-1">
        <span className=' less-than-md:hidden text-base text-orange-600 font-raleway font-semibold'>
          {LabelText}
        </span>
        <CategoriesIcon />
      </Link>
    )

  }


  const Location = ({locations})=>{
    const [location, setLocation]=useState({loc:locations[0]})
    const handleToggleLocation =(e)=>{
      e.preventDefault()

      const autoTog = () => document.getElementById("location-text").classList.toggle("less-than-sm:hidden")

      const tOut = setTimeout(() => {
        // console.log(1)
        autoTog()
        clearTimeout(tOut)
      }, 10000);
      // console.log(2)
      autoTog()
  

    }
    return(
      <div id="address" className=" px-1 relative flex flex-row items-center gap-2 visible">
        <span onClick={handleToggleLocation} className="child:pointer-events-none">
          <PinIco />
        </span>

        < h2 id = 'location-text' className ="less-than-xs:hidden   less-than-xs:top-3 less-than-xs:left-6 greater-than-sm:text-[0.9] less-than-xs:text-[10px] leading-[16px] greater-than-xs:p-2  greater-than-xs:relative greater-than-xs:w-auto flex flex-row  truncate ">
 
          <select name="location" id="location_select" className="w-full min-w-[80px] outline-none appearance-none  bg-inherit less-than-xs:text-sm less-than-xs:text-[10px] leading-[16px] truncate">

            {
              locations.map((loc,x)=>
                <option key={x} value={loc.idx}>{loc.city},{loc.state}</option>
              )
            }
          </select>
        </h2>
        <div className="hidden-marker hidden greater-than-sm:flex">

        </div>
      </div>
    )
  }
  
  const NavLogo = ({ toggle }) => {
    const [activeLogoType, setActiveLogoType] = useState("long")
    const sess = {

      getItem: (str) => true,
      setItem: (key, val) => true
    };

    if (!sess?.getItem("canRerender")) {
      sess.setItem("canRerender", true)
    }
    const toggleOnResize = () => {
      const containerParent = document.getElementById("navbar_left__wrapper");
      const logoParent = document.getElementById("logo_animation_container");
      const logoLongPng = document.getElementById("logo_long_png");
      const logoShortPng = document.getElementById("logo_short_png");
      const logoTransToLong = document.getElementById("logo_gif_trans_to_long");
      const logoTransToShort = document.getElementById("logo_gif_trans_to_short");
      const locationComponent = document.getElementById("address");


      let tm = ""

      const classCanBeToggledOffForClasslist = (classList, classname) => {
        return classList.contains(classname)
          ? { toggle: () => classList.toggle(classname, false) }
          : undefined

      }
      const isAlreadyTransitioned = (component) => {
        switch (component) {
          case "toLong":
            return logoLongPng.classList.contains("flex") && logoTransToLong.classList.contains("hidden") &&
              logoShortPng.classList.contains("hidden") && logoTransToShort.classList.contains("hidden")

            break;
          case "toShort":
            return logoShortPng.classList.contains("flex") && logoTransToShort.classList.contains("hidden") &&
              logoLongPng.classList.contains("hidden") && logoTransToLong.classList.contains("hidden")

          default:
            return false;
            break;
        }
      }


      const delay = (x, time) => {
        const tOut = setTimeout(() => {
          x()
        }, time);
        return { clear: () => clearTimeout(tOut) }
      }

      const longComponent = () => {
        const png = toggle(logoLongPng.classList, { curr: "hidden", tar: "flex" })
        const gif = toggle(logoTransToLong.classList, { curr: "hidden", tar: "flex" })
        return {
          png: {

            hide: png.off,
            show: png.on
          },
          gif: {
            hide: gif.off,
            show: gif.on
          }
        }
      }
      const shortComponent = () => {
        const png = toggle(logoShortPng.classList, { curr: "hidden", tar: "flex" })
        const gif = toggle(logoTransToShort.classList, { curr: "hidden", tar: "flex" })
        return {
          png: {

            hide: png.off,
            show: png.on
          },
          gif: {
            hide: gif.off,
            show: gif.on
          }
        }
      }


      const toggleShortLogo = () => {
        // toggle off long logo
        locationComponent.classList.replace("visible", "invisible");
        longComponent().png.hide()

        if (sess.getItem("canRerender") === true) {
          delay(() => {
            // toggle off transition of short logo
            shortComponent().gif.hide()

            // toggle on short logo
            shortComponent().png.show()
            // console.log("shrunk")
            locationComponent.classList.replace("invisible", "visible");

          }, 2000)//.clear()
          // toggle on transition of short logo
          shortComponent().gif.show()

        } else {
          // toggle on logo long instead
          shortComponent().png.show()
        }

      }

      const toggleLongLogo = () => {
        // toggle off short logo
        locationComponent.classList.replace("visible", "invisible");
        shortComponent().png.hide()

        if (sess.getItem("canRerender") === true) {
          delay(() => {
            // toggle off transition to short  logo
            longComponent().gif.hide()
            // toggle on long logo
            longComponent().png.show()
            // console.log("expanded")
            locationComponent.classList.replace("invisible", "visible");

          }, 2000)//.clear()
          // toggle on transition to long logo
          longComponent().gif.show()

        } else {
          // toggle on long logo anyway
          classCanBeToggledOffForClasslist(logoLongPng.classList, "hidden")?.toggle()
          longComponent().png.show()

        }

      }


      const toggleForContentBox = (entries) => {
        const box = entries[0]?.contentBoxSize
        // console.log("box-size", box[0]?.inlineSize);
        // box size in range and short logo is hidden
        if (
          Math.floor(box[0]?.inlineSize) < 724
          && isAlreadyTransitioned("toLong")
        ) {
          toggleShortLogo()

          // console.log("<-- toShort trigger count", "active state", activeLogoType)

        }
        // box size out of range and long logo is hidden
        if (
          Math.floor(box[0]?.inlineSize) > 725
          && isAlreadyTransitioned("toShort")
        ) {

          toggleLongLogo()

          // console.log("<-- toLong trigger count", "active state", activeLogoType)

        }
      }


      const toggleForContentRect = (entries) => {
        const rect = entries[0]?.contentRect
        console.log("rect-size", rect[0]?.width)
        if (
          Math.floor(rect[0]?.width) <= 350
        ) {
        }
        if (
          Math.floor(rect[0]?.width) > 350
        ) {

        }
      }
      const resizeObserver = new ResizeObserver((entries) => {
        if (entries[0]?.contentBoxSize) {
          clearTimeout(tm)
          tm = setTimeout(() => {
            toggleForContentBox(entries)
            sess.setItem("canRerender", false)
            // console.log("is box size?:")

          }, 0);
        } else if (entries[0]?.contentRect) {

          clearTimeout(tm)
          tm = setTimeout(() => {
            toggleForContentRect(entries)
            sess.setItem("canRerender", false)
            // console.log("is rect size?:",entries[0]?.contentRect.width === 270)

          }, 0);

        }

      })
      resizeObserver.observe(containerParent)
      return (() => resizeObserver.unobserve(containerParent))
    }
    useEffect(() => {

      let cleanup = () => { };
      // check if document is fully loaded
      if (document.readyState === "complete") {

        if (window.innerWidth < 744) {
          // hide address
          document.getElementById("address")?.classList.replace("visible", "invisible");
          // show transition to short logo
          document.getElementById("logo_gif_trans_to_short")?.classList.replace("hidden", "flex");

          setTimeout(() => {
            // hide transition to short logo
            document.getElementById("logo_gif_trans_to_short")?.classList.replace("flex", "hidden");
            // show short logo
            document.getElementById("logo_short_png")?.classList.replace("hidden", "flex");
            // show address
            document.getElementById("address")?.classList.replace("invisible", "visible");
          }, 2000);
        } else {
          // hide address
          document.getElementById("address")?.classList.replace("visible", "invisible");
          // show transition to long logo
          document.getElementById("logo_gif_trans_to_long")?.classList.replace("hidden", "flex");
          setTimeout(() => {
            // hide transition to long logo
            document.getElementById("logo_gif_trans_to_long")?.classList.replace("flex", "hidden");
            // show long logo
            document.getElementById("logo_long_png")?.classList.replace("hidden", "flex");
            // show address
            document.getElementById("address")?.classList.replace("invisible", "visible");

          }, 2000);
        }

        cleanup = toggleOnResize()

      }
      return () => {
        cleanup()
      }
    }, [])


    return (
      <Link to={''} id="logo_animation_container" className='cursor-pointer  '>
        <img id="logo_gif_trans_to_long" src={imagepath("/img/placeholders/Katundu_reverse.gif")} className="max-w-[14rem] absolute top-0 left-0 z-10  hidden mix-blend-multiply" loading='eager' alt="" />
        <img id="logo_long_png" src={imagepath("/img/placeholders/Katundu.png")} className="max-w-[14rem] hidden" alt="" />
        <img id="logo_gif_trans_to_short" src={imagepath("/img/placeholders/Katundu.gif")} className="max-w-[14rem] absolute top-0 left-0 z-10 hidden mix-blend-multiply " loading='eager' alt="" />
        <img id="logo_short_png" src={imagepath("/img/placeholders/Katundu_short.png")} className="max-w-[2.8rem] object-scale-down object-center hidden" loading='lazy' alt="" />
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
           
            <Location locations={tags.locations}/>
          </div>
          {
            isNotAllowed()
            ? ""
            // less-than-sm:mt-4 greater-than-md:w-max max-h-14 lg:min-w-[2rem] xl:min-w-[2rem] py-2 flex flex-col justify-start items-start
            :<div id="search_field_wrapper"  className="w-full flex items-center justify-center order-2 less-than-sm:order-3 less-than-logo-min:w-full less-than-logo-min:block  insert-previous-classes-here transition-all">
                
                
              <div className='w-full flex justify-center items-center gap-2'>
                  <GotoCategories />
                  <SearchField fref={ref} popSearchData={popSearchData} popularSearchedProductNames={popularSearchedProductNames}>
                    <optgroup name="search-suggestions" tabIndex={1} id="search-suggestions" className="absolute top-full min-w-[12rem] greater-than-md:min-w-[28rem] w-full max-w-[28rem] greater-than-md:max-w-[32rem]  p-2 truncate border bg-black opacity-70 rounded-b-3xl text-white dark:text-black  cursor-pointer hidden">
                    </optgroup>

                  </SearchField>

              </div>
              
            </div>
          
          }
          <div className="navbar_right__wrapper order-3 less-than-sm:order-2">
            <NavMenu>
              <GoToCartIco size={'1.5rem'}/>
              <GoToAvatarIco size={'1.5rem'}/>
            </NavMenu>
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

export default Navbar