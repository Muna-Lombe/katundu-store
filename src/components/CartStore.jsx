import React from 'react'
import CartItem from './CartItem'
import { Link } from 'react-router-dom'
import Logo from './Logo';
import { titleTagTypes as tags } from "./icons";
import { imagepath, no_img_path } from '../assets/images';

const CartStore = ({ keyId, storeName, orders, total, isOrdered, handleItemOrdered, handleSelectStore}) => {
  const disableItem = isOrdered
  const state = { from: "/cart", storeName, cartItemIds: orders.map(o => o.uuid), total, orderedItems: orders.map(oi => ({ productId: oi.product.uuid, price: oi.product.price, quantity: oi.itemCount })) }
  
  // const handleSelectStore = (e, id) => {
  //   // e.preventDefault()

  //   const cart = document.getElementById("cart_container")


  //   const storeItems = cart.querySelector("#" + id).parentElement.querySelectorAll('input[type="checkbox"]:not(:disabled).select-item');
  //   e.target.checked ? e.target.setAttribute("checked", "") : e.target.removeAttribute("checked");
  //   storeItems.forEach((item) => {
  //     item.checked = e.target.checked
  //   });
  //   // handleSetCheckedItems(e)

  // }
  const CartStoreHeaderPrice = () => (
    <div id="cart_store__total_price"
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
  const CartStoreCheckoutBtn = () => (
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

  const CartStoreHeader = () => (
    <div id={"cart_store__header" + keyId}
      className=" flex flex-row p-2 justify-start items-center gap-3 border-[1px] border-gray-300 rounded-lg text-xl font-raleway lining-nums tabular-nums ">
      <div className="select-store">
        <input disabled={isOrdered} type="checkbox" id={"select_store" + keyId} name={"select_store" + keyId} value={"select_store" + keyId} className='select_store w-[20px] flex  scale-125' onClick={(e) => handleSelectStore(e, "cart_store__header" + keyId)} />
        <label htmlFor={"select_store" + keyId} className='absolute top-0 right-0 w-0 h-0 hidden text-md text-orange-600 font-raleway lining-nums tabular-nums  font-semibold'>{storeName.replace(" ", "").replace("'", "")}</label>
      </div>
      <Logo logo={storeName} addText={false} bgColor="bg-slate-500" />
      <div id="item_name"
        className="w-full sm:w-max md:w-max lg:w-max xl:w-max  font-bold flex justify-between  items-center">
        <div className="text-base greater-than-md:text-xl">{storeName}</div >
        {/* <CartStoreCheckoutBtn/> */}
      </div>
      {/* <CartStoreHeaderPrice/> */}

    </div>
  )
  return (
    <div id={"store_" + storeName.replace(" ", "").replace("'", "")}
      className={"cart_store__wrapper w-full flex flex-col mb-2" + (disableItem ? " filter grayscale contrast-50" : "")}>
      <CartStoreHeader />
      {
        orders.map((orderItem) => <CartItem key={orderItem.id} isOrdered={isOrdered} orderItem={orderItem} />)
      }

    </div>
  )
}

export default CartStore