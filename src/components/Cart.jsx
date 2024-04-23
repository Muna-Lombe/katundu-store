import React, { useEffect, useRef, useState } from 'react'
import { Link } from "react-router-dom";

// assets
import { CouponIco, DeleteIco } from './icons'
import { useDispatch, useSelector } from 'react-redux';
import  { imagepath, no_img_path } from '../assets/images';
import { checkedOutCartItem, removedCartItem, updatedCartItem } from '../orm/models/CartModel';

import { titleTagTypes as tags } from "./icons";
import randomizer from '../js/utils/randomizer';
import { useRemoveCartItemMutation, useUpdateCartItemMutation, useBeginItemCheckoutQuery } from '../js/middleware/queryHandler';
import Logo from './Logo';



const Cart = ({ unOrd, ord, handleSelectAll, handleSelectStore, handleCheckedItems, setRef }) => {

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
    
    
    return(
      <div id="cart_item__total_price"
        className="hidden w-auto  less-than-sm:flex flex-row flex-wrap justify-between less-than-xs:justify-end less-than-sm:gap-4  items-center text-base greater-than-md:text-xl lining-nums tabular-nums">
        <p
          className=" less-than-xs:text-base whitespace-nowrap">
          {tags.cart.totalInCartTag}:
        </p>
        <p
          className=" text-orange-600 less-than-xs:text-base font-bold">
          {tags.currencyType + total}
        </p>

        <CheckoutBtn disabled={total <= 0}/>
      </div>
    )
  }
  const CartOrderItem = ({ isOrdered, orderItem, promoQty = "120",  promoDeadline = "12:48:35", cartedQty = "150", }) => {

      const state = { from: "/cart", cartItemIds: [orderItem.uuid] }

      const handleCounter = async (e,type)=>{
        e.preventDefault()
        if (type === "plus"){
          
          // dispatch(updatedCartItem({uuid:orderItem.uuid, productCount: orderItem.productCount + 1}))
          await updateCartItem({ itemUpdate: { product_count: orderItem.productCount + 1}, cartId:orderItem.uuid})
        }
        
        if (type === "minus") {
          
          // dispatch(updatedCartItem({ uuid: orderItem.uuid, productCount: (orderItem.productCount > 1 ? orderItem.productCount - 1:1) } ))
          await updateCartItem({ itemUpdate: { product_count: (orderItem.productCount > 1 ? orderItem.productCount - 1 : 1) }, cartId: orderItem.uuid })
        }
      }
      const Line = () => (
        <div className="absolute w-[90%] h-[0px] my-[40px] z-0 ">
          <svg  width="552" height="2" viewBox="0 0 552 2" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="0.000905796" y1="0.500001" x2="551.001" y2="1.49819" stroke="black"/>
          </svg>
        </div>
      )
      const CartProductTags =()=>(
        <div id="product_tags"
          className="w-max mt-4 flex flex-col lg:flex-row xl:flex-row justify-between gap-2">
          <div className="promo-tag hidden px-2 less-than-sm:flex items-baseline gap-2 border rounded-lg bg-orange-400 fill-white text-white">
            <CouponIco size={32}/>
            <p className="text-base  font-raleway lining-nums tabular-nums  font-semibold">
              {"Hot Sale!"}
            </p>
          </div>
          <div
            className="hidden w-max greater-than-sm:flex  lg:flex-row xl:flex-row justify-between -gap-1 ">
            <div
              className="w-max h-[2rem] p-2 flex justify-center items-center border-[1px] border-orange-600 rounded-r-3xl rounded-bl-xl text-md text-orange-600 font-raleway lining-nums tabular-nums  font-semibold" >
              <p> {promoQty + tags.cart.qtyType} </p>
            </div>
            <div
              className="w-max h-[2rem] p-2 flex justify-center items-center -z-10 border-t-[1px] border-r-[1px] border-b-[1px] border-slate-400 rounded-r-3xl ext-md text-slate-400 font-raleway  font-semibold lining-nums tabular-nums ">
              <p>{tags.cart.promoCountdown + promoDeadline}</p>
            </div>
          </div>
          {/* <div id="purchased_count"
            className=" w-max flex justify-between items-center gap-1 font-raleway lining-nums tabular-nums ">
            <p>
              {"Carted:"}
            </p>
            <p
              className="font-semibold">
              {cartedQty + tags.cart.qtyType}
            </p>
          </div> */}
        </div>
      )
      const CartProductDescription = () => (
          <div id="product_description"
            className="w-auto max-w-[352px] flex flex-col justify-between"  >
            <Link state={{ uuid: orderItem.product?.uuid }} to={"/products/" + orderItem.product?.name + "-" + orderItem.product?.uuid}
              className=" h-auto max-h-[5rem] flex-wrap overflow-x-clip truncate">
              {orderItem.product.name}
            </Link>
            
            <CartProductTags/>
          </div>
        )
      const CartProductDetails =() =>{

        

        return(
          <div id="product_details"
            className=" w-auto  md:max-w-[312px] lg:max-w-[450px] xl:w-full flex flex-wrap greater-than-logo-min:flex-nowrap xs:flex-nowrap sm:flex-nowrap md:flex-nowrap lg:flex-nowrap xl:flex-nowrap  justify-start gap-x-2 ">
           
            <div className="product-details-header w-auto flex flex-row justify-between">
              <Link state={{ uuid: orderItem?.product?.uuid }} to={"/products/" + orderItem?.product?.name + "-" + orderItem?.product?.uuid} id="product_image" className="w-max max-h-[5rem] px-2 flex justify-center items-center">

                <img className=" max-w-[5rem] max-h-[5rem]  greater-than-md:max-w-[25rem] greater-than-md:max-h-[8rem] md:w-full md:h-full lg:w-full lg:h-full xl:w-full xl:h-full object-contain" src={"https://placehold.co/600x400/orange/" + randomizer(["black", "white", "gray", "red"])} alt="IGM" />
              </Link>
              {/* <div className="hidden less-than-logo-min:flex">
                <ActionBtns />

              </div> */}
            </div>


            <CartProductDescription/>
          </div>
        )
      }

      const CartProductQuantity =()=>{
        
        const CartProductCounter =()=>(
          <div id="product_count"
            className="less-than-logo-min:w-auto w-fit md:w-[8rem] lg:w-[8rem] xl:w-[8rem]  h-[2rem] p-2 flex justify-around gap-[0.2rem] md:gap-2 lg:gap-4 xl:gap-4 border-b greater-than-xs:border-[1px] items-center border-gray-300 greater-than-xs:rounded-3xl">

            <span className=" text-xl fill-slate-500 cursor-pointer" onClick={(e) => isOrdered ? "" :handleCounter(e, "minus")}>
              <svg width="24" height="24"  xmlns="http://www.w3.org/2000/svg"   viewBox="0 0 512 512" ><path d="M417.4,224H94.6C77.7,224,64,238.3,64,256c0,17.7,13.7,32,30.6,32h322.8c16.9,0,30.6-14.3,30.6-32 C448,238.3,434.3,224,417.4,224z" /></svg>
            </span>

            <input type="text" value={orderItem.productCount} disabled="disabled"
              className="w-[2rem] flex justify-center items-center text-center text-xl text-orange-700 decoration-transparent bg-transparent " />

            <span className=" text-xl fill-slate-500 cursor-pointer" onClick={(e) => isOrdered ? "" : handleCounter(e,"plus")}>
              <svg width="24" height="24"  xmlns="http://www.w3.org/2000/svg"   viewBox="0 0 512 512" ><path d="M417.4,224H288V94.6c0-16.9-14.3-30.6-32-30.6c-17.7,0-32,13.7-32,30.6V224H94.6C77.7,224,64,238.3,64,256 c0,17.7,13.7,32,30.6,32H224v129.4c0,16.9,14.3,30.6,32,30.6c17.7,0,32-13.7,32-30.6V288h129.4c16.9,0,30.6-14.3,30.6-32 C448,238.3,434.3,224,417.4,224z" /></svg>
            </span>
          </div>
        )
        
        const CartProductPrice =()=>(
          <div id="product_price"
            className="w-max  flex items-center gap-2 font-raleway  lining-nums tabular-nums leading-8 text-center less-than-xs:border-b">
            <h2 id={"price_"+orderItem.uuid}
              className="new_price text-orange-600 less-than-xs:text-[18px] text-[1.2rem] md:text-[1.3rem] lg:text-[1.3rem] xl:text-[1.3rem] font-semibold">

              {

                orderItem.product.discount
                  ? ' ' + tags.currencyType + (orderItem.product.discount * orderItem.productCount).toFixed(0)
                  : tags.currencyType + (orderItem.product.price * orderItem.productCount).toFixed(0)
              }
            </h2>
            <div id="discounted_price"
              className="w- flexauto pr-2 justify-between ">
              <h4 id="old_price"
                className="text-[#8D8D8E] text-sm line-through font-extralight ">
                {orderItem.product.discount ? tags.currencyType + orderItem.product.price : ''}
              </h4>
            </div>
          </div>
        )

        return(
          <div id="product_quantity"
            // md:flex-col-reverse  lg:flex lg:flex-row xl:flex xl:flex-row
            className=" greater-than-xs:w-full md:w-max lg:w-max xl:w-max flex  less-than-logo-in:flex-col-reverse xs:flex-wrap-reverse flex-wrap  items-center  xs:justify-center md:justify-center    lg:justify-center xl:justify-center gap-4 sm:gap-8 md:gap-12 lg:gap-28 xl:gap-14 ">
              <CartProductCounter/>
              <CartProductPrice/>
          </div>
        )
      }
      
      const DeleteBtn =() =>(
        <button id="delete_btn"
          onClick={() => handleDelete(orderItem.uuid)}
          className="w-max h-min  px-2 py-2 flex flex-col justify-start" >
          <DeleteIco size={20} />
        </button>
      )
      const BuyOneBtn =()=>(
        <button id="buy_one_btn" className='w-[4rem] h-[1.5rem] ' 
          disabled={isOrdered}
          >
          <Link  to={"/checkout"} state={state} className="w-full h-full   bg-orange-600 active:bg-orange-500 border-[1px] border-orange-600  flex justify-center items-center rounded-lg text-base greater-than-md:text-xl text-white dark:text-black dis  font-medium" >
            Buy
          </Link>

        </button>
      )
      const ActionBtns =()=>(
        <div id="action_btns" className='w-max h-full flex flex-col px-2 justify-between items-end'>
          <DeleteBtn />
          {
            isOrdered ?
              <></>
              :
              <BuyOneBtn/>
          }

        </div>
        
      )
      return (
        <div id={ orderItem.uuid} 
          className="product_wrapper relative  w-auto py-3 mx-2 md:mx-8  lg:py-6 lg:mx-8  xl:py-6 xl:mx-8 p-1 flex justify-between gap-0 md:gap-4 lg:gap-8 xl:gap-8 border-b-[1px] border-b-gray-300 ">
          <div className="select-item">
            <input  disabled={isOrdered} on type="checkbox" id={"select_item_" + orderItem.uuid} name={"select_item_" + orderItem.uuid} value={"select_item_" + orderItem.uuid} className='select-item w-[20px] flex scale-125' />
          </div>
          
          <div id="product_item__wrapper" className="w-auto sm:w-[95%] md:w-[99%] lg:w-[95%] xl:w-[95%] flex flex-row flex-wrap greater-than-xs:flex-nowrap greater-than-xs:flex-row  justify-between gap-1 md:gap-2 lg:gap-4 xl:gap-4">  
          {/* <div id="product_item__wrapper" className="w-auto sm:w-[95%] md:w-[99%] lg:w-[95%] xl:w-[95%] flex flex-row less-than-xs:grid grid-cols-2  gap-1 md:gap-2 lg:gap-4 xl:gap-4">  */}
            <CartProductDetails/>

            <CartProductQuantity/>

            
            
          </div>
          <div className="flex less-than-logo-min:hidden ">
            <ActionBtns />
          </div>
          
        </div>
     )
   }

   const CartStoreItem = ({keyId,storeName,orders, total, isOrdered})=> { 
     const disableItem = isOrdered
     const state = {  from: "/cart" , storeName, cartItemIds:orders.map(o=> o.uuid),total, orderedItems: orders.map(oi=> ({productId: oi.product.uuid, price: oi.product.price, quantity: oi.productCount})) }
  
     const CartStoreHeaderPrice = () =>(
       <div id="cart_item__total_price"
         className=" flex justify-between less-than-sm:gap-4 gap-8  items-center text-base greater-than-md:text-xl lining-nums tabular-nums">
         <p
           className=" less-than-xs:text-base whitespace-nowrap">
           {tags.cart.totalInCartTag}:
         </p>
         <p
           className=" text-orange-600 less-than-xs:text-base font-bold">
           {tags.currencyType + total}
         </p>

         <button id="Checkout_btn"
           onClick={(e) => handleItemOrdered(e, [storeName, orders], state)}
           disabled={disableItem}
           className="less-than-xs:hidden"
         >
           <Link
             to={{ pathname: "/checkout" }}
             state={state}
             className={"w-[7rem] h-[2.1rem] md:w-[10rem] md:h-[2.5rem] lg:w-[10rem] lg:h-[2.5rem] xl:w-[10rem] xl:h-[2.5rem] px-8 py-5 bg-orange-600 active:bg-orange-500 border-[1px] border-orange-600   flex justify-center items-center rounded-2xl text-base greater-than-md:text-xl text-white dark:text-black  font-medium" + (disableItem ? " pointer-events-none cursor-auto" : "")}
           >
             {tags.cart.checkoutTag}
           </Link>
         </button>
       </div>
     )
     const CartStoreCheckoutBtn = () =>(
       <button id="Checkout_btn"
         onClick={(e) => handleItemOrdered(e, [storeName, orders], state)}
         disabled={disableItem}
         className="greater-than-xs:hidden "
       >
         <Link
           to={"/checkout"}
           from={"/cart"}
           state={state}
           className={" less-than-xs:w-[5rem] less-than-xs:h-[1rem] w-[7rem] h-[2.1rem] md:w-[10rem] md:h-[2.5rem] lg:w-[10rem] lg:h-[2.5rem] xl:w-[10rem] xl:h-[2.5rem] px-8 py-5 bg-orange-600 active:bg-orange-500 border-[1px] border-orange-600  flex justify-center items-center rounded-2xl text-base greater-than-md:text-xl text-white dark:text-black  font-medium" + (disableItem ? " pointer-events-none cursor-auto" : "")}
         >
           {tags.cart.checkoutTag}
         </Link>
       </button>
     )

     const CartStoreHeader = () =>(
       <div id={"cart_item__header"+keyId}
         className=" flex flex-row p-2 justify-start items-center gap-3 border-[1px] border-gray-300 rounded-lg text-xl font-raleway lining-nums tabular-nums ">
         <div className="select-store">
           <input disabled={isOrdered} type="checkbox" id={"select_store" + keyId} name={"select_store" + keyId} value={"select_store" + keyId} className='w-[20px] flex  scale-125' onClick={(e) => handleSelectStore(e, "cart_item__header" + keyId)}/>
            <label htmlFor={"select_store" + keyId} className='text-md text-orange-600 font-raleway lining-nums tabular-nums  font-semibold'></label>
         </div>
         <Logo  logo={storeName} addText={false} bgColor="bg-slate-500" />
         <div id="item_name"
           className="w-full sm:w-max md:w-max lg:w-max xl:w-max  font-bold flex justify-between  items-center">
           <div className="text-base greater-than-md:text-xl">{storeName}</div >
           {/* <CartStoreCheckoutBtn/> */}
         </div>
         {/* <CartStoreHeaderPrice/> */}

       </div>
     )
     return (
          <div id="cart_item__wrapper"
            className={"w-full flex flex-col mb-2"+(disableItem ? " filter grayscale contrast-50" : ""  ) }>
            <CartStoreHeader/>
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
        className="w-full max-w-[1000px] flex flex-col justify-center ">
        <div id="cart_header" 
          className=" p-2 flex justify-between items-center">
          <div className="select-all w-auto flex gap-x-2 justify-center items-center">

            <input type="checkbox" id="select_all" name="select_all" value="select_all" className='w-[20px] scale-125 flex ' onClick={(e)=> handleSelectAll(e) }/>

            <label htmlFor="select_all" className='text-md text-orange-600 font-raleway lining-nums tabular-nums  font-semibold leading-normal'>Select All {`(${0})`}</label>

          </div>

          <CartHeaderPrice total={totalRef.current}/>
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
                  return <CartStoreItem 
                            key={"unord"+idx} 
                            keyId={idx} 
                            storeName={uno.storeName}  
                            orders={uno.orders} 
                            total={uno.currentCummulativeTotal}
                            
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
                    return <CartStoreItem 
                              key={"ord"+idx} 
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
    
  }

  export default Cart
