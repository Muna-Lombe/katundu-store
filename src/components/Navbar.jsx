import React, {  useEffect, useRef, useState } from 'react';
import { Link, createSearchParams, useLocation, useNavigate } from "react-router-dom";

// assets
import { AvatarIco, CartIco, PinIco, SearchIco, titleTagTypes as tags } from '../assets';
import { useDispatch, useSelector } from 'react-redux';
import { selectProductNamesThatMatch, setSearchedProductId } from '../js/slices/products/productsSlice';
import Logo from './Logo';
import { imagepath } from '../assets/images';
const Navbar = ({children}) => {
  
  const prodNames = useSelector(selectProductNamesThatMatch());
  const dispatch = useDispatch();
  const searchProductText = prodNames[0]?.name || "" //"false"
  const ref = useRef(null)
  const goto = useNavigate()
  const location = useLocation()
  // const handleClick =(e)=>{
  //   e.stopPropagation()
  //   dispatch( setSearchedProductId([e.target.value]))
  //   const inp = document.querySelector('input.search')
  //   // console.log(inp)
  //   // inp.value = 
  //   inp.value = prodNames.find((i)=> i.name === e.target.value).name
  // }
  
  const textStyle = {
    maxWidth: 'inherit',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }
  const handleBlur = (e, type) =>{

    e?.stopPropagation()
    
    const hideSuggestions = () => {
      const optgrp = document.querySelector("optgroup");
      const toggle = (classList, token) => ({
        on: () => {
          classList.replace(token.curr, token.tar)
        },
        off: () => {
          classList.replace(token.tar, token.curr)
        }
      });
      optgrp.replaceChildren("")
     

      const toggleBoarder = toggle(optgrp.previousElementSibling.classList, { curr: "rounded-3xl", tar: "rounded-t-3xl" });
      const toggleVisibility = toggle(optgrp.classList, { curr: "hidden", tar: "visible" });
      toggleBoarder.off()
      toggleVisibility.off()
    }
    // console.log("can trigger hide", e.relatedTarget === null)
    if(e?.relatedTarget === null || !e) hideSuggestions()
  }
  
  const handleSubmit = (arr) =>{
    // console.log("submit", arr)
    dispatch(setSearchedProductId(arr[0].name ? arr.map((i)=> i.name) : arr))
    handleBlur()
    goto("/search?" + createSearchParams({ query: JSON.stringify(arr[0].name ? arr.map((i) => i.name) : arr) }))
  }
  const isNotAllowed = () => (
    location.pathname.includes("checkout" )
    || location.pathname.includes("history") 
    
  )
  const isShowProductPath = () => (
    location.pathname.includes("product")
  )
  

  const handleChange = (e) => {
    e.preventDefault()
    const suggestions = ((str) =>
      str.toString().length > 1 ? prodNames.filter(i => 
        i.name.toLowerCase().includes(str.toLowerCase())
        ) : []
    );
    // UNCOMMENT BEFORE COMMIT
    if( e.target.value.length < 1){
      dispatch(setSearchedProductId([]))
    }
    if (e.key === "Enter" && e.code === "Enter") {
      // console.log("suggestions ", suggestions(e.target.value), e.target.value)
      handleSubmit([e.target.value])
      return
    }
    ///////////////////////////////////////////////
    const optgrp = document.querySelector("optgroup");
    const toggle=(classList, token) =>({
      on: ()=>{
        classList.replace(token.curr, token.tar)
      }, 
      off:()=>{
        classList.replace(token.tar, token.curr)
      }
    });
   
    const toggleBoarder = toggle(optgrp.previousElementSibling.classList, { curr: "rounded-3xl", tar: "rounded-t-3xl" });
    const toggleVisibility = toggle(optgrp.classList, { curr: "hidden", tar: "visible" });
    
    optgrp.childNodes.forEach(i=>optgrp.removeChild(i));
    if(suggestions(e.target.value).length > 0){
      
      toggleBoarder.on()
      toggleVisibility.on()
      
    }else{
      toggleBoarder.off()
      toggleVisibility.off()
    };
    suggestions(e.target.value)?.forEach((prod, i) =>{
      const optElem = document.createElement('option')
      optElem.className = "w-[15.5rem] greater-than-sm:w-full whover:text-black hover:bg-slate-200 text-ellipsis overflow-x-clip";
      optElem.style = textStyle
      optElem.value = prod.name
      optElem.innerText = prod.name //prod.name.length > 36 ? prod.name.slice(0, 36) + "..." : prod.name
      optElem.key = i
      optElem.addEventListener("click", (ev) => { handleSubmit([ev.target.innerText]) })
      optgrp.insertAdjacentElement("beforeend", optElem)  
    })
  };
  const Menu= ({children})=>{
      const handleClick =(e)=>{
        e.preventDefault()

        const child = document.getElementById("open-menu-icon")
        const nearChild = document.getElementById("closed-menu-icon")
        // const nearChild = findNear(child)
        child.parentElement.toggleAttribute("open")//classList.toggle("open")
        child.classList.toggle("active")
        child.classList.toggle("flex")
        child.classList.toggle("hidden")
        child.classList.toggle("absolute")

        nearChild.classList.toggle("active")
        nearChild.classList.toggle("hidden")
        nearChild.classList.toggle("absolute")
        child.classList.toggle( "flex")
        
      }
      return(
        <div id="navbar_menu__wrapper" className="menu max-h-[40px] flex flex-col items-end z-10  top-9 overflow-visible  right-2 ">
          <menu  className='burger-menu -top relative peer w-[20px] less-than-xs:flex  hidden cursor-pointer'>
            <svg onClick={handleClick} id="closed-menu-icon" className="top-1/2 left-1/2  w-[1.6rem] aspect-square active flex  transition-transform" fill="currentColor"  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"> <path fillRule="evenodd" clipRule="evenodd" d="M4 7C4 6.44772 4.44772 6 5 6H19C19.5523 6 20 6.44772 20 7C20 7.55228 19.5523 8 19 8H5C4.44772 8 4 7.55228 4 7ZM4 12C4 11.4477 4.44772 11 5 11H19C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H5C4.44772 13 4 12.5523 4 12ZM4 17C4 16.4477 4.44772 16 5 16H19C19.5523 16 20 16.4477 20 17C20 17.5523 19.5523 18 19 18H5C4.44772 18 4 17.5523 4 17Z" />
            </svg>
            <svg onClick={handleClick} id="open-menu-icon" className=" top-[-12px] right-[-4px]  w-[0.8rem] aspect-square hidden  transition-transform" fill="currentColor"  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"> <path fillRule="evenodd" clipRule="evenodd" d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z" /> 
            </svg>
          </menu>
          <div className=" hidden peer-open:flex flex-row greater-than-xs:flex greater-than-xs:flex-row max-w-[8rem]  h-max md:items-end md:justify-end greater-than-lg:items-center greater-than-lg:justify-center greater-than-lg:m-0 greater-than-lg:p-0 less-than-sm:gap-1 gap-4 " >
            {children}
          </div>
        </div>
    )
  }
  const GoToCartIco = ({isBurgerMenu=true,size="2.5rem"}) => (
   
      <Link id='cart' to="cart/" className=' w-[2rem] aspect-square flex justify-center '> 
        <CartIco size={size} isBurgerMenu={isBurgerMenu} isCartBtn={true} /> 
      </Link> 
  )
  
  const GoToAvatarIco = ({size})=> (

    <div className="avtr min-w-[40px] flex justify-center items-center">
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

  const SearchField =({children})=>{
    const [curtext, setCurtext] =useState("")
    const setParams = () =>{
      return createSearchParams({ query: JSON.stringify([curtext]) })
    }
    return(
      
      <div id="search_field" tabIndex={0} className="relative min-w-[12rem]  greater-than-md:min-w-[28rem] w-full max-w-[28rem] greater-than-md:max-w-[32rem] less-than-xs:h-[2rem] h-[2.8rem] max-h-[3.2rem] flex justify-between border-[1px] rounded-3xl">
        {/* <div className="search-input relative w-full max-w-[22rem]  flex   justify-between p-[1px]"> */}
          <input type="text" ref={ref}  name="search" defaultValue={curtext} placeholder={searchProductText||""} onKeyUp={(e) => {handleChange(e); setCurtext(e.target.value)}} className=" search autofill:selection bg-white w-full rounded-bl-3xl rounded-tl-3xl bg-transparent px-2  text-black text-[1rem] focus:outline-none" />
    
          <Link to={"search?" + setParams()} onClick={() => handleBlur()} className=" top-0 right-0 w-1/5 h-full rounded-3xl m-[0.00rem] px-2 bg-[#F0F4FB] flex justify-center items-center">
            <SearchIco />
          </Link> 
      </div>
    )
  }

  const Location = ({locations})=>{
    const [location, setLocation]=useState({loc:locations[0]})
    const handleToggleLocation =(e)=>{
      e.preventDefault()

      const autoTog = () => document.getElementById("location-text").classList.toggle("less-than-sm:hidden")

      const t_o = setTimeout(() => {
        console.log(1)
        autoTog()
        clearTimeout(t_o)
      }, 10000);
      console.log(2)
      autoTog()
  

    }
    return(
      <div id="address" className=" px-1 relative flex flex-row items-center gap-2">
        <span onClick={handleToggleLocation} className="child:pointer-events-none">
          <PinIco />
        </span>

      < h2 id = 'location-text' className ="less-than-xs:flex less-than-sm:hidden  less-than-xs:top-3 less-than-xs:left-6 greater-than-sm:text-[0.9] less-than-xs:text-[10px] leading-[16px] greater-than-xs:p-2  greater-than-xs:relative greater-than-xs:w-auto flex flex-row  truncate ">
           

          <select name="location" id="location_select" className="w-full min-w-[80px] outline-none appearance-none  bg-inherit less-than-xs:text-sm less-than-xs:text-[10px] leading-[16px] truncate">

            {
              locations.map((loc,x)=>
                <option key={x} value={loc.idx}>{loc.city},{loc.state}</option>
              )
            }
          </select>
        </h2>
      </div>
    )
  }
  
  const LogoImg = ()=>{
    const [activeLogo, setActiveLogo] = useState("long")

    const toggleOnResize = () => {
      const logoParent = document.getElementById("logo_location")
      const logoLongPng = document.getElementById("logo_long_png")
      const logoShortPng = document.getElementById("logo_short_png")
      const logoTransToLong = document.getElementById("logo_gif_trans_to_long")
      const logoTransToShort = document.getElementById("logo_gif_trans_to_short")
      
      let tm = ""
      const canBeToggledTrue = (classList, classname)=>{
        return classList.contains(classname) 
        ? undefined
        : {toggle: () =>classList.toggle(classname, true)}
      }
      const canBeToggledFalse = (classList, classname) => {
        return classList.contains(classname) 
        ? {toggle: () =>classList.toggle(classname, false)} 
        : undefined
          
      }
      const delay=(x,time)=>{
        const t_o = setTimeout(() => {
          x()
        }, time);
        return t_o
      }
      const toggleShortLogo =() =>{
        
          canBeToggledTrue(logoLongPng.classList, "hidden")?.toggle()
            
          delay(() => {
              canBeToggledTrue(logoTransToShort.classList, "hidden")?.toggle()
              canBeToggledFalse(logoShortPng.classList, "hidden")?.toggle()
              // console.log("shrunk")

            }, 2340)

          canBeToggledFalse(logoTransToShort.classList, "hidden")?.toggle()
          
      }

      const toggleLongLogo =()=>{
        canBeToggledTrue(logoShortPng.classList, "hidden")?.toggle()
         
        delay(() => {
            canBeToggledTrue(logoTransToLong.classList, "hidden")?.toggle()
            canBeToggledFalse(logoLongPng.classList, "hidden")?.toggle()
            // console.log("expanded")

          }, 2340)

        canBeToggledFalse(logoTransToLong.classList, "hidden")?.toggle()
      }

      const toggleForContentBox =(entries)=>{
        const box = entries[0]?.contentBoxSize
        if (Math.floor(box[0]?.inlineSize) <= 350 && canBeToggledFalse(logoShortPng.classList, "hidden") ) {
          toggleShortLogo()
          console.log("<-- toShort trigger count")
          
        }
        if (Math.floor(box[0]?.inlineSize) > 350 && canBeToggledFalse(logoLongPng.classList, "hidden")) {
          toggleLongLogo()
          console.log("<-- toLong trigger count")
          }
        }

                
        const toggleForContentRect =(entries)=>{
          const rect = entries[0]?.contentRect
          if (Math.floor(rect[0]?.width) <= 350 && canBeToggledFalse(logoShortPng.classList, "hidden")) {
            toggleShortLogo()
          }
          if (Math.floor(rect[0]?.width) > 350 && canBeToggledFalse(logoLongPng.classList, "hidden")) {
              toggleLongLogo()

            }
          }
      const resizeObserver =new ResizeObserver((entries) => {
          if(entries[0]?.contentBoxSize){
            clearTimeout(tm)
            tm = setTimeout(() => {
              toggleForContentBox(entries)
              // console.log("is box size?:")

            }, 0);
          } else if (entries[0].contentRect){
            
            clearTimeout(tm)
            tm = setTimeout(() => {
              toggleForContentRect(entries)
              // console.log("is rect size?:",entries[0]?.contentRect.width === 270)

            },0);

        }
       
      })
      resizeObserver.observe(logoParent)
      return (() => resizeObserver.unobserve(logoParent))
  }
    useEffect(() => {
      // console.log("jsdhffdalfj")
      toggleOnResize()
    },[])

    return(
      <>
        <img id="logo_long_png" src={imagepath("/img/placeholders/Katundu.png")} className="max-w-[14rem]" alt="" />
        <img id="logo_gif_trans_to_short" src={imagepath("/img/placeholders/Katundu.gif")} className="max-w-[14rem] hidden absolute top-0 left-0 z-10 " loading='eager' alt="" />
        <img id="logo_gif_trans_to_long" src={imagepath("/img/placeholders/Katundu_reverse.gif")} className="max-w-[14rem] hidden absolute top-0 left-0 z-10 " loading='eager' alt="" />
        <img id="logo_short_png" src={imagepath("/img/placeholders/Katundu_short.png")} className="max-w-[2.8rem] hidden  object-scale-down object-center" loading='lazy' alt="" />
      </>
    )
  }
  return (
    //  md:items-center
    <>
      <nav id="nav_container" className=" px-3 pt-2 pb-1 relative w-full h-full flex justify-center gap-2 items-start  lg:items-center xl:items-center ">
        {/* " w-full flex  gap-4 lg:flex lg:flex-row xl:flex xl:flex-row justify-start items-center transition-all" */}
        <div id="navbar_left__wrapper" className="w-full flex less-than-sm:flex-wrap items-center justify-between gap-2 less-than-logo-min:gap-3 ">
          {/* lg:w-auto xl:auto flex  less-than-xs:gap-4 */}
          {/* m-1 align-start  w-full flex less-than-xs:flex-wrap justify-start gap-4 transition-all ease-in-out delay-700 */}
          <div id="logo_location" className="order-1 w-min  relative flex justify-center insert-previous-classes-here first:h-[44px]">
              {/* <Logo clickEv={()=>""} logo={tags.footer.storename} size={{ h: 40, w: 40, x:10, y: 32, font: 38 }}/> */}
              <Logo>
                <Link to={''} className='cursor-pointer  '>
              {/* <img src={ imagepath("/img/placeholders/Katundu.png") } alt = "" /> */}
                <LogoImg/>
                </Link>
              </Logo>
           
            <Location locations={tags.locations}/>
          </div>
          {
            isNotAllowed()
            ? ""
            // less-than-sm:mt-4 greater-than-md:w-max max-h-14 lg:min-w-[2rem] xl:min-w-[2rem] py-2 flex flex-col justify-start items-start
            :<div id="search_field_wrapper"  className="w-full order-2 less-than-sm:order-3 less-than-logo-min:w-full less-than-logo-min:block  insert-previous-classes-here transition-all">
              <div id="search_field_box" className='w-full flex flex-col items-center' onBlur ={(e) => handleBlur(e, "blur")}>
                <SearchField/>
                <optgroup name="search-suggestions" tabIndex={1} id="search-suggestions" className="min-w-[12rem] greater-than-md:min-w-[28rem] w-full max-w-[28rem] greater-than-md:max-w-[32rem]  p-2 overflow-ellipsis border bg-black opacity-70 rounded-b-3xl text-white cursor-pointer hidden">
                </optgroup>
              </div>
              
            </div>
          
          }
          <div className="navbar_right__wrapper order-3 less-than-sm:order-2">
            <Menu>
              <GoToCartIco size={'1.5rem'}/>
              <GoToAvatarIco size={'1.5rem'}/>
            </Menu>
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