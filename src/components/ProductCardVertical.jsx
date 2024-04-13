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
import randomizer from '../js/utils/randomizer';


const Product = ({ product, forwardRef, noPrd, isSearchOrMain, minW =8}) => {
  // console.log("prd", product)
  let img = new IMG()
  const dispatch = useDispatch()
  const goto = useNavigate()
  const location = useLocation()
  const isOrdered = useSelector(isInCart(product?.uuid))
  const authSessions = useSelector(authenticatedUsers)
  const userAuthed = useSelector(isAuthedUser(authSessions[0]?.uuid))
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
  const calculateDiscount = (price, discount) => {
    return price - (price * discount)
  }
  const handleRedirect = () => {
    goto("/signin", {   state: { ...location } })
  }
  const DiscountTag = ({product})=>(
     (product?.discountTag)
      ? <span id="discount" className={" absolute bottom-0 right-1 p-[2px] w-max flex flex-row  items-baseline gap-[0px] bg-orange-400 border-1 rounded-md text-slate-500 text-xs  font-semibold  greater-than-md:text-[1.0rem] lining-nums tabular-nums "}>
        {/* <span className="less-than-sm:hidden">save</span> */}
        <span className=" p-[1.5px] less-than-sm:flex fill-slate-500" ><CouponIco /> </span>
        {
          // product?.newPrice === 0
          // ?  
          product?.discountTag
          // : '-' + ( parseFloat((product?.newPrice/product.oldPrice )*100)).toFixed(0)+ '%'
        }
        
      </span>
      : <></>
  )
  const PriceTag =({children, product})=>{
    // const disc = product.isDiscounted[1] 
    // const oldPrice = product.priceRange.sort((a, b) => a - b)[0] 
    // const price = product.isDiscounted[0] ? calcDisc(product.priceRange.sort((a, b) => a - b)[0], product.isDiscounted[1]) : product.priceRange.sort((a, b) => a - b)[0] 
    
    return(
      
       <span className='py-1 flex gap-2  items-baseline less-than-xs:text-xs text-md '>
        <span className=" py-1 px-[0.25rem] flex gap-1  border-1 rounded-md text-orange-600 text-lg leading-[8px]   font-bold items-baseline">
          {tags.currencyType +(product?.discountTag? product?.newPrice :product?.oldPrice)}
          {product?.discountTag
            ? <span id="oldPrice" className="text-slate-400 line-through font-[600] text-[10px] leading-[8px]  greater-than-md:text-[0.9rem] ">
              {tags.currencyType +product?.oldPrice}
            </span>
            : ""
          }
        </span>
          
      </span>
    )
  }

  const Image = ({ imagepath }) => (
    <div className={" py-1  flex items-end  " + (noPrd ? " min-w-[100px] min-h-[100px] border rounded animate-pulse " : " ")}>
      <img alt="gallery" className="min-w-[80%] min-h-[100px] w-auto aspect-square object-cover object-center z-0" src={imagepath} />
      </div>
  
    )
  
  return (
   
    <div id={"product_card_" + product?.uuid} ref={forwardRef} className={(noPrd ? " " : " ")  + (isSearchOrMain ? " min-w-[6rem] " : " min-w-[8rem] " ) +" min-w-[8rem] w-auto max-w-[15rem] h-full max-h-[20rem] flex flex-nowrap shrink flex-col justify-start bg-white shadow-md border border-gray-200 rounded-md font-raleway lining-nums tabular-nums  overflow-y-hidden"}>
      <div id="product_header" className="relative px-1 w-[100%] h-[100%]  justify-center items-end  ">
        <Link state={{ uuid: product?.uuid }} to={"/products/" + product?.name + "-" + product?.uuid} id="product_image" className="flex  justify-center items-end" >
          {
            noPrd
              ? <Image imagepath={no_product_img}/>
              : <Image imagepath={("https://placehold.co/600x400/orange/" + randomizer(["black", "white", "gray", "red"])) || no_product_img} />
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
                    {product?.storeName?.length > 16 ? product?.storeName?.slice(0, 16) + '...' : product?.storeName}
                  </span>
              }
            </h1>
            <h4 id='product_name' className=" h-12 bg-white text-[#2D2D2F] text-ran text-sm greater-than-md:text-base hover:text-orange-500 font-medium ">
              {
                noPrd
                  ? <div className="no-prd-field w-[70%] h-6 border rounded-md bg-gradient-to-tr from-slate-400 to-slate-500 animate-pulse opacity-30"></div>
                  : <Link state={{uuid:product?.uuid}} to={"/products/" + product?.name+"-"+product?.uuid}  style={textStyle} >
                      {product?.name}
                    </Link>
              }
                
            </h4>
          </div>
        </div>
        {
          noPrd
            ? ""//<div className="no-prd-field mx-auto w-[10rem] h-6  border rounded-md bg-gradient-to-tr from-slate-400 to-slate-500 animate-pulse opacity-30"></div>
            : ""
        }
          
        
      </div>
    </div>
  )
}

export default Product;
