import React, { useEffect, useRef, useState } from 'react'
import { Link } from "react-router-dom";

// assets
import { CouponIco, DeleteIco } from './icons'
import { useDispatch, useSelector } from 'react-redux';

import { checkedOutCartItem, removedCartItem, updatedCartItem } from '../orm/models/CartModel';

import { titleTagTypes as tags } from "./icons";

import { useRemoveCartItemMutation, useUpdateCartItemMutation, useBeginItemCheckoutQuery } from '../js/middleware/queryHandler';

import { ClassWatcher } from '../utilities/classWatcher';
import CartStore from './CartStore';


const Cart = ({ unOrd, ord, handleSelectAll, handleCheckedItems, setRef, TotalBuy, handleSelectStore }) => {
  
  
    const [updateCartItem, { isLoading: updating }] = useUpdateCartItemMutation()
    const [removeCartItem, { isLoading: removing }] = useRemoveCartItemMutation()
    // const [beginCheckout, { isLoading: checkingout }] = useBeginItemCheckoutQuery()
    
    const dispatch = useDispatch() 
    const totalRef = useRef(0)
  
    const handleDelete = async (id) => {
      removeCartItem({cartId:id})
    }

    const handleItemOrdered = (e, item, state) => {
    
      e.preventDefault()

      item[1].forEach(async (ci) =>{
        // try {
        //   // await beginCheckout({cartId:ci.uuid})
        //   // console.log("html?",data)
        //   // state['html'] = data
        // } catch (error) {
        //   console.log("err", error)
        // }
        
        // dispatch(
        //   checkedOutCartItem( 
        //     Object.assign({
        //       id:ci.uuid, 
        //       set: {ItemStatus: types.ORDERED_PENDING}
        //     })
        //   )
        // )

      })
    
    }
    
    
    const CheckoutBtn = ({disabled}) => (
      <button id="Checkout_btn"
        onClick={(e) => disabled ? "" : handleCheckedItems(e)}
        disabled={disabled}
        className={" disabled:bg-gray-400 disabled:opacity-30 disabled:border-none less-than-xs:w-[5rem] less-than-xs:h-[1rem] w-[7rem] h-[2.1rem] md:w-[10rem] md:h-[2.5rem] lg:w-[10rem] lg:h-[2.5rem] xl:w-[10rem] xl:h-[2.5rem] px-8 py-3 bg-orange-600 active:bg-orange-500 border-[1px] border-orange-600  flex justify-center items-center rounded-lg text-base greater-than-md:text-xl text-white dark:text-black  font-medium"}
      >
          {tags.cart.checkoutTag}
      
      </button>
    )
    useEffect(() => {
      setRef()
      return () => {
        "second"
      }
    }, [])
    
    const CartHeaderPrice = ({total}) => {
      
      // hidden w - auto  less - than - sm:flex flex - row flex - wrap justify - between less - than - xs: justify - end less - than - sm: gap - 4  items - center text - base greater - than - md: text - xl lining - nums tabular - nums
      return(
        
        <div id="cart_store__total_price"
          className="px-3">
            {TotalBuy}
          {/* <p
            className=" less-than-xs:text-base whitespace-nowrap">
            {tags.cart.totalInCartTag}:
          </p>
          <p
            className=" text-orange-600 less-than-xs:text-base font-bold">
            {tags.currencyType + total}
          </p>

          <CheckoutBtn disabled={total <= 0}/> */}
        </div>
      )
    }
    
    const CartItemsCount = ({unOrd, ord}) => (
      <div id="cart_items_count" 
        className="text-lg text-orange-600 dark:text-white  font-raleway lining-nums tabular-nums  font-semibold">
        Items: {`(${unOrd.reduce((acc, curr)=> acc + curr.orders.length, 0)})`}
      </div>
    )

    const NoItems = ()=>(
      <div id="no_items" 
        className="w-full flex flex-col justify-center items-center">
        <div id="no_items_banner__header" 
          className="text-base text-black dark:text-white  font-raleway lining-nums tabular-nums  font-semibold">
          <h3>
            🙅 looks like no items here 👀
          </h3>
        </div>
        <div id="no_items_banner__footer" 
          className="text-lg text-black dark:text-white  font-raleway lining-nums tabular-nums  font-bold text-center">
          <h3>
            <span> {"😃 "} <Link to={"/"} className='text-blue-500 hover:underline text-center'>{"Buy something"} </Link>  {" to start your shopping journey 😃"} </span>
          </h3>
        </div>
      </div>
    )
    
    

    return (
      <div id="cart_container" 
        className=" w-full @md:w-auto max-w-[1000px] flex flex-col justify-center ">
        <div id="cart_header" 
          className=" p-2 flex justify-between items-center">
          <div className="select-all w-auto flex gap-x-2 justify-center items-center">

            <input  type="checkbox" id="select_all" name="select_all" value="select_all"  className='w-[20px] scale-125 flex ' onClick={(e)=> handleSelectAll(e) }/>

            <label htmlFor="select_all" className='text-md text-orange-600 font-raleway lining-nums tabular-nums  font-semibold leading-normal'>Select All {`(${0})`}</label>

          </div>

          <CartItemsCount unOrd={unOrd} ord={ord}/>
          <CartHeaderPrice total={totalRef.current} />
          {/* <div 
            className="text-lg text-black dark:text-white  font-raleway lining-nums tabular-nums  font-[800]">
              {tags.cart.cartTag}
          </div>
          <div className="text-md text-orange-600 font-raleway lining-nums tabular-nums  font-semibold">
            {tags.cart.emptyCartBtnTag}
          </div> */}
        </div>
        <div id="cart_content" 
          className="w-[98%] flex flex-col pb-1 border-[1px] border-gray-300 rounded-lg ">

          { unOrd.length > 0
            
            ? 
             <div className="unordered-items flex flex-col items-end">
               {
                unOrd.map((uno,idx) => {
                  return <CartStore
                            key={"unord"+idx} 
                            keyId={idx} 
                            storeName={uno.storeName}  
                            orders={uno.orders} 
                            total={uno.currentCummulativeTotal}
                            handleSelectStore={handleSelectStore}
                          /> 
                  })
                }
             </div>
            : <NoItems/>
          }
          { ord.length > 0
            
            ? <div id="cart_history__wrapper" className="w-full mt-4 ">
                <div id="cart_history__header" className=" px-2 text-lg text-black dark:text-white  font-raleway lining-nums tabular-nums  font-medium">
                  <h3>{" Cart History"}</h3>
                </div>
                {
                  ord.map((or, idx) => { 
                    return <CartStore
                              key={"ord"+idx} 
                              storeName={or.storeName} 
                              orders={or.orders} 
                              isOrdered={true} 
                              total={or.currentCummulativeTotal}
                              tags={tags}
                              handleItemOrdered={handleItemOrdered}
                              
                            /> 
                    })
                }
              </div> 
            
            : null //<NoItems/>
          }      
        </div>
      </div>
    
    )
    
}

  export default Cart
