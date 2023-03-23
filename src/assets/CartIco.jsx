
import React from 'react'
import { useSelector } from 'react-redux'
import { itemIdsInCart, selectcartIds } from '../js/slices/cart/cartSlice'
import BasketIco from './BasketIco'
import { cartItemsCount } from '../orm/selectors'


const CartIco = ({size, isBurgerMenu,isCartBtn=false}) => {
  
  let itemsInCart = useSelector(cartItemsCount()) 
  const AddCartCount = () =>(
      <h2 id="cart_count" className=" absolute top-0 -right-[0.6rem] min-w-[15px] w-auto max-w-[20px] less-than-sm:h-[10px] greater-than-xs:aspect-square  flex justify-start items-center rounded-md bg-white text-sm text-[#2967FF] font-raleway font-semibold" >
        {itemsInCart < 10 ? itemsInCart : '10+'}
      </h2>
  )
  return (
 
    <div id="border_circle" className={"p-2 less-than-xs:p-[0.3rem] max-w-[1.6rem] greater-than-sm:max-w-[2.8rem]   relative sm:flex md:flex lg:flex border-[0.9px] border-[#727280] rounded-[2rem] flex justify-center items-center"} >
        <BasketIco isBurgerMenu={isBurgerMenu} />
        {
          isCartBtn && <AddCartCount/>
        }
     </div>
     
  )
}

export default CartIco
