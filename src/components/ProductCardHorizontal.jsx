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
import BuyBtns from './BuyBtns';


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
      ? <span id="discount" className={" absolute top-3 right-1 p-[2px] w-max flex flex-row items-baseline gap-[0px] bg-orange-400 border-1 rounded-md text-slate-500 text-xs  font-semibold  greater-than-md:text-[1.0rem] lining-nums tabular-nums "}>
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
      
       <span className='py-1 flex gap-2  items-baseline less-than-xs:text-xs text-md '>
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
  
  const Image = ({ imagepath }) => (
    <div className={" relative py-1  flex items-end justify-center w-full h-full  " + (noPrd ? "  border rounded animate-pulse " : " ")}>
      <img alt="gallery" className=" w-[70%] greater-than-md:w-[100%] aspect-square object-cover object-center z-0" src={imagepath} />
      <DiscountTag product={product} />
    </div>
  
  )
  const ProductHeader = ()=>(
    <div id="product_header" className=" px-1 w-[45%]  justify-center items-end  ">
      <Link to={"/product/" + product?.id} id="product_image" className="flex w-full justify-center items-end" >
        {
          noPrd
          ? <Image imagepath={no_product_img} />
          : <Image imagepath={imagepath(product?.images[0]?.image_url) || img[product?.img_path_id] || no_product_img} />
        }
      </Link>
    </div>
  )
  
  const ProductPrice = () =>(
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
              ? <span className="price py-1 flex flex-row items-center justify-between font-medium">
                  <PriceTag product={product} />
                  <span className="child:w-16 child:rounded-md">
                    <BuyBtns id={product.id} onlyBtn={"onlyBtn"}>     
                      <BasketIco />
                    </BuyBtns>

                  </span>
                </span>
                : ""
            }

          </>}
    </h2>
  )

  const NameStore = ()=>(
    <div id="name_store__wrapper" className="  h-max flex flex-col justify-between items-start gap-2">
        <h4 id='product_name' className="w-full h-12 bg-white text-[#2D2D2F] text-ran text-sm greater-than-md:text-lg hover:text-orange-500 font-medium ">
          {
            noPrd
              ? <div className="no-prd-field w-[70%] h-6 border rounded-md bg-gradient-to-tr from-slate-400 to-slate-500 animate-pulse opacity-30"></div>
              : <Link to={"/product/" + product?.id} style={textStyle} >
                {product?.name}
              </Link>
          }

        </h4>
        <h1 id='store_name' className="w-full flex justify-start rounded-[4px]  text-slate-500  text-sm greater-than-md:text-base font-[600]">
          {
            noPrd
              ? <div className="no-prd-field w-[20%] h-8 border rounded-md bg-gradient-to-tr from-slate-400 to-slate-500 animate-pulse opacity-30"></div>
              : <span>
                {product?.store.name.length > 16 ? product?.store.name.slice(0, 16) + '...' : product?.store.name}
              </span>
          }
        </h1>
        
    </div>
  )  
  const ProductContent =()=>(
    <div id="product_content" className=" px-2 py-1  w-full max-w-[100%] max-h-[50%] flex grow flex-wrap  justify-between bg-white rounded-md">
      <NameStore/>
      <ProductPrice />
    </div>
  )
  return (
   
    <div id={"product_card_horizontal_" + product?.id} className={(noPrd ? " " : " ")  + (isSearchOrMain ? " min-w[20rem] " : " min-w-\[12rem] " ) +"greater-than-md:min-w-\[20rem] greater-than-lg:min-w-\[20rem] w-full max-w-[40rem]  h-full max-h-[10rem] flex flex-nowrap  flex-row justify-start bg-white shadow-md border border-gray-200 rounded-md font-raleway lining-nums tabular-nums  overflow-y-hidden"}>
      <ProductHeader/>
      <ProductContent/>
        {
          noPrd
            ? ""//<div className="no-prd-field mx-auto w-[10rem] h-6  border rounded-md bg-gradient-to-tr from-slate-400 to-slate-500 animate-pulse opacity-30"></div>
            : ""
        }
          
        
      
    </div>
  )
}

export default Product;
