import React, { Suspense, memo, useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Cart, NoItems } from '../components'
// import { titleTagTypes as tags } from "./icons";

import { filteredCartItemsFromModel } from '../orm/selectors'
import types from '../orm/actions/actionTypes'
import { useGetShoppingCartQuery } from '../js/middleware/queryHandler'
import { createdToastMessage } from '../orm/models/ToastMessageModel'
import { useLocation, useNavigate } from 'react-router-dom'
import { titleTagTypes as tags } from '../components/icons'
import { AttributeWatcher, ClassWatcher } from '../utilities/classWatcher'


const ShoppingCartV2 = () => {
  const cartItemsReadyForDisplay = useSelector(cartItemsReadyForDisplay())
  
  const unOrd = cartItemsReadyForDisplay.unordered
  const ord = cartItemsReadyForDisplay.ordered
  
  const CartHeaderPrice = ({ total }) => {

    // hidden w - auto  less - than - sm:flex flex - row flex - wrap justify - between less - than - xs: justify - end less - than - sm: gap - 4  items - center text - base greater - than - md: text - xl lining - nums tabular - nums
    return (

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
  const NoItems = () => (
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

          <input type="checkbox" id="select_all" name="select_all" value="select_all" className='w-[20px] scale-125 flex ' onClick={(e) => handleSelectAll(e)} />

          <label htmlFor="select_all" className='text-md text-orange-600 font-raleway lining-nums tabular-nums  font-semibold leading-normal'>Select All {`(${0})`}</label>

        </div>

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

      {unOrd.length > 0

        ?
        <div className="unordered-items flex flex-col items-end">
          {
            unOrd.map((uno, idx) => {
              return <CartStoreItem
                key={"unord" + idx}
                keyId={idx}
                storeName={uno.storeName}
                orders={uno.orders}
                total={uno.currentCummulativeTotal}

              />
            })
          }
        </div>
        : <NoItems />
      }
      {ord.length > 0

        ? <div id="cart_history__wrapper" className="w-full mt-4 ">
          <div id="cart_history__header" className=" px-2 text-lg text-black dark:text-white  font-raleway lining-nums tabular-nums  font-medium">
            <h3>{" Cart History"}</h3>
          </div>
          {
            ord.map((or, idx) => {
              return <CartStoreItem
                key={"ord" + idx}
                storeName={or.storeName}
                orders={or.orders}
                isOrdered={true}
                total={or.currentCummulativeTotal}
              />
            })
          }
        </div>

        : null //<NoItems/>
      }
      </div>
    </div>
  )
  return (
    <>
      <Suspense fallback={<NoItems />}>
        <div className="ShoppingCart-wrapper flex flex-row gap-x-2 ">
          
          <Cart
            unOrd={unOrd} ord={ord} handleCheckedItems={handleCheckedItems} 
            handleSelectAll={handleSelectAll} 
            handleSelectStore={handleSelectStore} 
            setRef={handleSetCheckedItems} 
            TotalBuy={<TotalBuy list={unOrd}  exclude={{"card":true}} />}
          /> 
          <TotalBuy exclude={{"header":true}} list={unOrd}  />
        </div>
      </Suspense>
    </>
  )
  
}




export default ShoppingCartV2