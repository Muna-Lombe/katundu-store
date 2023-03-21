import React, { useState } from 'react'
import { useDispatch, useSelector} from 'react-redux';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BasketIco, CouponIco, calcDisc, titleTagTypes as tags } from '../assets';
import IMG, { imagepath } from '../assets/images';
import no_product_img from '../assets/tests/jsonServer/img/placeholders/no_product_img.png'
// assets
import { createdOrder } from '../orm/models/OrderModel';
import { momentDate } from '../orm/utilities';
import types from '../orm/actions/actionTypes';
import { authenticatedUsers, isAlreadyOrdered, isAuthedUser, isInCart } from '../orm/selectors';
import { createdCartItem } from '../orm/models/CartModel';


const Product = ({ product, noPrd, isSearchOrMain, minW =8}) => {
  
  let img = new IMG()
  const dispatch = useDispatch()
  const goto = useNavigate()
  const location = useLocation()
  const isOrdered = useSelector(isInCart(product?.id))
  const authSessions = useSelector(authenticatedUsers)
  const userAuthed = useSelector(isAuthedUser(authSessions[0]?.id))
  // let cats = useSelector(filteredCategoriesFromModel(product?.categoryIds))
  const textStyle = {
    maxWidth: '100%',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }

  
  const handleAddToCart=(id)=>{
    dispatch(createdCartItem({
      DateCreated: momentDate().full,
      product: id,
      productCount:1,
      ItemStatus:types.IN_CART
    }))
    
  }
  
  const handleRedirect = () => {
    goto("/signin", {   state: { ...location } })
  }
  const DiscountTag = ({product})=>(
     product?.isDiscounted[0]
      ? <span id="discount" className={" absolute bottom-0 right-1 p-[2px] w-max flex flex-row items-baseline gap-[0px] bg-orange-400 border-1 rounded-md text-slate-500 text-xs  font-semibold  greater-than-md:text-[1.0rem] lining-nums tabular-nums "}>
        {/* <span className="less-than-sm:hidden">save</span> */}
        <span className=" less-than-sm:flex fill-slate-500" ><CouponIco /> </span>

      {'-' + product?.isDiscounted[1] + '%'}
      </span>
      : <></>
  )
  const PriceTag =({children, product})=>{
    // const disc = product.isDiscounted[1] 
    const old_price = product.priceRange.sort((a, b) => a - b)[0] 
    const price = product.isDiscounted[0] ? calcDisc(product.priceRange.sort((a, b) => a - b)[0], product.isDiscounted[1]) : product.priceRange.sort((a, b) => a - b)[0] 
    
    return(
      
       <span className='py-1 flex gap-2 less-than-xs:justify-end items-baseline less-than-xs:text-xs text-md '>
        <span className=" py-1 px-[0.25rem] flex gap-1  border-1 rounded-md text-orange-600 text-lg leading-[8px]   font-bold items-baseline">
          {tags.currencyType + price}
          {product.isDiscounted[0] === true
            ? <span id="old_price" className="text-slate-400 line-through font-[600] text-[10px] leading-[8px]  greater-than-md:text-[0.9rem] ">
              {tags.currencyType + old_price}
            </span>
            : ""
          }
        </span>
          
      </span>
    )
  }
  
  // const BuyBtn=({})=>(
  //   <button
  //     id="add_to_cart_btn"
  //     // bg-[#2967FF]
  //     // border-[#2967FF]
  //     className={(isOrdered ? "relative " : " group   hover:bg-orange-600   hover:text-white ") + " hidden greater-than-xs:flex  py-[3px] px-1 w-full h-max  flex-row-reverse justify-center border-orange-600 rounded-lg border-[1px] bg-orange-500 text-white stroke-blue-500 cursor-pointer"}
  //     disabled={isOrdered}
  //     onClick={() => userAuthed ? handleAddToCart(product.id) : handleRedirect()}
  //   >
  //     <span className={(isOrdered ? "peer " : " ")}>
  //       <BasketIco strokeColor={"white"} isBurgerMenu={false} />
  //     </span>
  //     <span className={(isOrdered ? "peer ": " ") +' px-1 h-full md:flex lg:flex xl:flex   text-sm  font-raleway font-[600] text-center'}>
  //       {tags.buyBtn.mainText}
  //     </span>
  //     <span className="is-ordered-tooltip peer-hover:flex absolute hidden -top-5 -right-2  px-1 rounded-lg text-xs text-slate-500 font-raleway font-[600] text-center transition-transform ease-in-out delay-500">
  //       {"Item already in cart"}
  //     </span>
  //   </button>
  // )


  const Image = ({ imagepath }) => (
    <div className={"  flex items-end  " + (noPrd ? " min-w-[100px] min-h-[100px] border rounded animate-pulse " : " ")}>
      <img alt="gallery" className="min-w-[80%] min-h-[100px] w-auto aspect-square object-cover object-center z-0" src={imagepath} />
      </div>
  
    )
    // console.log("prod", product)
  return (
    // width={'180'} height={'150'}
    // md:m-w-[14rem] lg:m-w-[14rem] xl:m-w-[14rem]
    // md:w-[14rem] lg:w-[14rem] xl:w-[14rem]
    // md:h-[21rem] lg:h-[21rem] xl:h-[21rem]
    // min - w - [8rem] w - full max - w - [12rem] md: max - w - [14rem] lg: max - w - [14rem] xl: max - w - [14rem] h - [14rem] md: h - [24rem] lg: h - [24rem] xl: h - [24rem]
    <div id={"product_card_" + product?.id} className={(noPrd ? " " : " ")  + (isSearchOrMain ? " min-w-[6rem] " : " min-w-[8rem] " ) +"greater-than-md:min-w-[10rem] greater-than-lg:min-w-[13rem] w-auto max-w-[15rem] h-full max-h-[20rem] flex flex-nowrap  flex-col justify-start bg-white shadow-md border border-gray-200 rounded-md font-raleway "}>
      <div id="product_header" className="relative px-1 w-[100%] h-[100%]  justify-center items-end  ">
        <Link to={"/product/" + product?.id} id="product_image" className="flex  justify-center items-end" >
          {
            noPrd
              ? <Image imagepath={no_product_img}/>
              : <Image imagepath={imagepath(product?.images[0]?.image_url) || img[product?.img_path_id] || no_product_img} />
          }
        </Link>
        <DiscountTag product={product}/>  
      </div>
      <div id="product_content" className=" px-2 py-1 w-full max-h-[50%] flex flex-wrap  justify-between bg-white rounded-md">
        <h2 id="product_price" className=" w-full text-sm greater-than-md:text-[1.2rem]   lining-nums tabular-nums">
          {
            noPrd
              ? <>
                <div className="no-prd-field w-[4rem] h-6 border rounded-md bg-gradient-to-tr from-slate-400 to-slate-500 animate-pulse opacity-30"></div>
                <div className="no-prd-field w-[6rem] h-6 border rounded-md bg-gradient-to-tr from-slate-400 to-slate-500 animate-pulse opacity-30"></div>
              </>
              : <>
                {
                  isSearchOrMain
                    ? <span className="price py-1 font-medium">
                      <PriceTag product={product} />
                    </span>
                    : ""
                }

              </>}
        </h2>
        <div id="name_store_price__wrapper" className="w-full  h-max flex flex-col justify-between">
          <div id="name_store__wrapper" className="w-full h-full flex flex-col justify-between ">
            <h1 id='store_name' className="w-full flex justify-end rounded-[4px]  text-slate-500  text-xs greater-than-md:text-sm font-[600]">
              {
                noPrd
                  ? <div className="no-prd-field w-[20%] h-6 border rounded-md bg-gradient-to-tr from-slate-400 to-slate-500 animate-pulse opacity-30"></div>
                  : <span>
                    {product?.store.name.length > 16 ? product?.store.name.slice(0, 16) + '...' : product?.store.name}
                  </span>
              }
            </h1>
            <h4 id='product_name' className=" h-12 bg-white text-[#2D2D2F] text-ran text-sm greater-than-md:text-base hover:text-orange-500 font-medium ">
              {
                noPrd
                  ? <div className="no-prd-field w-[70%] h-6 border rounded-md bg-gradient-to-tr from-slate-400 to-slate-500 animate-pulse opacity-30"></div>
                  : <Link to={"/product/" + product?.id}  style={textStyle} >
                      {product?.name}
                    </Link>
              }
                
            </h4>
          </div>
        </div>
        {
          noPrd
            ? <div className="no-prd-field mx-auto w-[10rem] h-6  border rounded-md bg-gradient-to-tr from-slate-400 to-slate-500 animate-pulse opacity-30"></div>
            : ""
        }
          
        
      </div>
    </div>
  )
}

export default Product;
