import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";

// assets
import { DeleteIco } from '../assets'
import { useDispatch, useSelector } from 'react-redux';
import  { imagepath } from '../assets/images';
import { checkedOutCartItem, removedCartItem, updatedCartItem } from '../orm/models/CartModel';
import types from '../orm/actions/actionTypes';
import { titleTagTypes as tags } from "../assets";



const Cart = ({ unOrd, ord }) => {

  
  const dispatch = useDispatch() 
  
 
  const handleDelete = (id) => {
    dispatch(removedCartItem({id}))
  }

  const handleItemOrdered = (e, item) => {
  
    e.preventDefault()

    item[1].forEach(ci => dispatch(checkedOutCartItem( Object.assign({id:ci.id, set: {ItemStatus: types.ORDERED_PENDING}}))) )
  
  }
  


  const CartOrderItem = ({ isOrdered, orderItem, promoQty = "120",  promoDeadline = "12:48:35", cartedQty = "150" }) => {
      const handleCounter = (type)=>{
        if (type === "plus"){
          
          dispatch(updatedCartItem({id:orderItem.id, set:{productCount: orderItem.productCount + 1}}))
        }
        
        if (type === "minus") {
          
          dispatch(updatedCartItem({ id: orderItem.id, set: { productCount: (orderItem.productCount > 1 ? orderItem.productCount - 1:1) } }))

        }
      }
      const Line = () => (
        <div className="absolute w-[90%] h-[0px] my-[40px] z-0 ">
          <svg  width="552" height="2" viewBox="0 0 552 2" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="0.000905796" y1="0.500001" x2="551.001" y2="1.49819" stroke="black"/>
          </svg>
        </div>
      )
      return (
        <div id="product_wrapper" 
          className="relative  w-auto py-3 mx-2 md:mx-8  lg:py-6 lg:mx-8  xl:py-6 xl:mx-8 p-1 flex justify-between gap-0 md:gap-4 lg:gap-8 xl:gap-8 border-b-[1px] border-b-gray-300 ">
          <div id="product_item__wrapper" className="w-auto sm:w-[95%] md:w-[99%] lg:w-[95%] xl:w-[95%] flex flex-col flex-nowrap xs:flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row  justify-between gap-1 md:gap-2 lg:gap-4 xl:gap-4">  
            <div id="product_details" 
              className=" w-auto  md:max-w-[312px] lg:max-w-[450px] xl:w-full flex flex-wrap xs:flex-wrap sm:flex-nowrap md:flex-nowrap lg:flex-nowrap xl:flex-nowrap  justify-start ">
              <div id="product_image" 
                className="w-max max-h-[5rem] px-2 flex justify-center items-center">
                <img 
                  className=" max-w-[5rem] max-h-[5rem] md:w-full md:h-full lg:w-full lg:h-full xl:w-full xl:h-full object-contain" src={imagepath(orderItem.product.images[0].image_url)} alt="IGM" />
              </div>
              <div id="product_description" 
                className="w-auto max-w-[352px] flex flex-col justify-between"  >
                <p 
                  className=" h-auto max-h-[5rem] flex-wrap overflow-y-clip">
                  {orderItem.product.name.toString().length > 6 ? orderItem.product.name.slice(0,30) + "..." : orderItem.product.name}
                </p>
                <div id="product_tags" 
                  className="w-max mt-4 flex flex-col lg:flex-row xl:flex-row justify-between gap-2">
                  <div 
                    className="w-max flex  lg:flex-row xl:flex-row justify-between -gap-1 ">
                    <div 
                      className="w-max h-[2rem] p-2 flex justify-center items-center border-[1px] border-[#2967FF] rounded-r-3xl rounded-bl-xl text-md text-[#2967FF] font-raleway font-semibold" >
                      <p> {promoQty+tags.cart.qtyType} </p>
                    </div>
                    <div 
                      className="w-max h-[2rem] p-2 flex justify-center items-center -z-10 border-t-[1px] border-r-[1px] border-b-[1px] border-[#FF2D87] rounded-r-3xl ext-md text-[#FF2D87] font-raleway font-semibold lining-nums tabular-nums ">
                      <p>{tags.cart.promoCountdown+promoDeadline}</p> 
                    </div>
                  </div>
                  <div id="purchased_count" 
                    className=" w-max flex justify-between items-center gap-1 font-raleway">
                    <p>
                      {"Carted:"}
                    </p>
                    <p 
                      className="font-semibold">
                      {cartedQty + tags.cart.qtyType}
                    </p>
                  </div>
                </div>  
              </div>
            </div>
            
            <div id="product_quantity" 
            // md:flex-col-reverse  lg:flex lg:flex-row xl:flex xl:flex-row
              className=" w-full md:w-max lg:w-max xl:w-max flex flex-nowrap justify-around items-center  sm:justify-center md:justify-center    lg:justify-center xl:justify-center gap-2 sm:gap-14 md:gap-14 lg:gap-28 xl:gap-14">
              <div id="product_count" 
                className="less-than-xs:w-auto w-[6rem] md:w-[8rem] lg:w-[8rem] xl:w-[8rem]  h-[2.5rem] p-2 flex justify-around gap-[0.2rem] md:gap-2 lg:gap-4 xl:gap-4 border-[1px] items-center border-gray-300 rounded-3xl">
                <p 
                  className="less-than-xs:px-2 px-3 cursor-pointer" onClick={()=>handleCounter("minus")}>-</p>
                <input type="text" value={orderItem.productCount} disabled="disabled" 
                  className="w-[1.4rem] flex justify-center items-center text-center decoration-transparent bg-transparent "  />
                <p 
                  className="less-than-xs:px-2 px-3 cursor-pointer" onClick={() => handleCounter("plus")}>+</p>
              </div>
              <div id="product_price" 
                className="w-max  mx-2">
                <h2 id="new_price" 
                  className=" text-[#2967FF] less-than-xs:text-[18px] text-[1.2rem] md:text-[1.3rem] lg:text-[1.3rem] xl:text-[1.3rem] font-semibold">
                    
                  {
                    
                    orderItem.product.isDiscounted
                      ? tags.cart.priceMinTag + ' ' + tags.currencyType + ( orderItem.product.isDiscounted * orderItem.productCount).toFixed(1) 
                      : tags.cart.priceMinTag + tags.currencyType + (orderItem.product.price * orderItem.productCount).toFixed(1) 
                  }
                </h2>
                <div id="discounted_price" 
                  className="w- flexauto pr-2 justify-between ">
                  <h4 id="old_price" 
                    className="text-[#8D8D8E] text-sm line-through font-extralight">
                    {orderItem.product.isDiscounted ? tags.currencyType + orderItem.product.price : ''}
                  </h4>
                </div>
              </div>
            </div>
          </div>
          <button id="delete_btn"
            onClick={() => handleDelete(orderItem.id)}
            className=" relative top-[0.3rem] right-[0rem] md:relative   lg:relative   xl:relative   w-max h-min  px-2 py-2 flex flex-col justify-start" >
              <DeleteIco />
          </button>
          
        </div>
     )
   }

   const CartStoreItem = ({keyId,storeName,orders, total, isOrdered})=> { 
     const disableItem = isOrdered
     const state = { storeName, cartItemIds:orders.map(o=> o.id),total, orderedItems: orders.map(oi=> ({productId: oi.product.id, price:oi.product.isDiscounted || oi.product.price, quantity: oi.productCount})) }

     return (
          <div id="cart_item__wrapper"
            className={"w-full flex flex-col mb-2"+(disableItem ? " filter grayscale contrast-50" : ""  ) }>
            <div id="cart_item__header" 
              className=" flex flex-wrap p-2 justify-around items-center gap-3 border-[1px] border-gray-300 rounded-lg text-xl font-raleway">
              <div id="item_name" 
                className="w-full sm:w-max md:w-max lg:w-max xl:w-max  font-bold flex justify-between  items-center">
                <h4>{storeName}</h4> 
                <button id="Checkout_btn"
                onClick={(e)=>handleItemOrdered(e,[storeName, orders])} 
                disabled={disableItem}
                className="flex sm:hidden md:hidden lg:hidden xl:hidden" 
                >
                  <Link 
                    to={ "/checkout"} 
                    state={{...state,from:"/cart"}} 
                    
                    className={" less-than-xs:w-[5rem] less-than-xs:h-[1rem] w-[7rem] h-[2.1rem] md:w-[10rem] md:h-[2.5rem] lg:w-[10rem] lg:h-[2.5rem] xl:w-[10rem] xl:h-[2.5rem] px-8 py-5 bg-[#2967FF] border-[1px] border-[#2967FF]  flex justify-center items-center rounded-2xl less-than-xs:text-base text-lg md:text-xl lg:text-xl xl:text-xl text-white font-medium" + (disableItem ? " pointer-events-none cursor-auto": "") }    
                  > 
                    {tags.cart.checkoutTag} 
                  </Link>
                </button>          
              </div>
              <div id="cart_item__total_price" 
                className=" flex justify-between gap-8 items-center lining-nums tabular-nums">
                <p 
                  className=" less-than-xs:text-base">
                  {tags.cart.totalInCartTag}:
                </p>
                <p 
                  className=" text-black less-than-xs:text-base text-xl font-bold">
               {tags.currencyType + total} 
                </p>
                <button id="Checkout_btn"
                onClick={(e)=>handleItemOrdered(e,[storeName, orders])} 
                disabled={disableItem}
                className="hidden sm:flex md:flex lg:flex xl:flex" 
                >
                  <Link 
                    to={{pathname: "/checkout"}} 
                    state={state} 
                    className={"w-[7rem] h-[2.1rem] md:w-[10rem] md:h-[2.5rem] lg:w-[10rem] lg:h-[2.5rem] xl:w-[10rem] xl:h-[2.5rem] px-8 py-5 bg-[#2967FF] border-[1px] border-[#2967FF]  flex justify-center items-center rounded-2xl text-lg md:text-xl lg:text-xl xl:text-xl text-white font-medium" + (disableItem ? " pointer-events-none cursor-auto": "") }    
                  > 
                    {tags.cart.checkoutTag} 
                  </Link>
                </button>
              </div>
              
            </div>
            {
              orders.map((orderItem) => <CartOrderItem key= {orderItem.id} isOrdered={isOrdered}  orderItem = {orderItem}  /> )
            }
             
          </div>
        )
    }

    const NoItems = ()=>(
      <div id="no_items" 
        className="w-full flex flex-col justify-center items-center">
        <div id="no_items_banner__header" 
          className="text-base text-black font-raleway font-semibold">
          <h3>
            🙅 looks like no items here 👀
          </h3>
        </div>
        <div id="no_items_banner__footer" 
          className="text-lg text-black font-raleway font-bold text-center">
          <h3>
            <span> {"😃 "} <Link to={"/"} className='text-blue-500 hover:underline text-center'>{"Buy something"} </Link>  {" to start your shopping journey 😃"} </span>
          </h3>
        </div>
      </div>
    )
    return (
      <div id="cart_container" 
        className="w-full flex flex-col justify-center ">
        <div id="cart_header" 
          className=" flex justify-start gap-6 items-baseline">
          <div 
            className="text-lg text-black font-raleway font-[800]">
              {tags.cart.cartTag}
          </div>
          <div className="text-md text-[#FF2D87] font-raleway font-semibold">
            {tags.cart.emptyCartBtnTag}
          </div>
        </div>
        <div id="cart_content" 
          className="w-[98%] flex flex-col pb-1 border-[1px] border-gray-300 rounded-lg ">
          


          { unOrd.length > 0
            
            ? unOrd.map((store,idx) => {return <CartStoreItem key={idx} keyId={idx} storeName={store.storeName}  orders={store.orders} total={store.currentCummulativeTotal}/> })
            : <NoItems/>
          }
          { ord.length > 0
            
            ? <div id="cart_history__wrapper" className="w-full mt-4 ">
                <div id="cart_history__header" className=" text-lg text-black font-raleway font-medium">
                  <h3>{"Cart History"}</h3>
                </div>
              {ord.map((store, idx) => { return <CartStoreItem key={idx} storeName={store.storeName} orders={store.orders} isOrdered={true} total={store.currentCummulativeTotal} />  })}
              </div> 
            
            : null //<NoItems/>
          }      
        </div>
      </div>
    
    )
    
  }

  export default Cart
