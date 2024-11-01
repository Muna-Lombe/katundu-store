
import React from 'react'
import { useSelector } from 'react-redux'
// import { itemIdsInCart, selectcartIds } from '../../js/slices/cart/cartSlice'
import BasketIco from './BasketIco'
import { authenticatedUsersV2, cartItemsCountV2, isAuthedUserV2 } from '../../orm/selectors'


const CartIco = ({size, isBurgerMenu,isCartBtn=false}) => {
  const authSessions = useSelector(authenticatedUsersV2)
  const userAuthed = useSelector(isAuthedUserV2(authSessions[0]?.uuid))
  let itemsInCart = useSelector(cartItemsCountV2())
  
  // console.log(itemsInCart)
  const AddCartCount = () =>(
      userAuthed ?
      <h2 id="cart_count" className=" absolute top-0 left-[94%] h-[10px] greater-than-xs:aspect-square  flex justify-start items-center rounded-md bg-white text-xs greater-than-sm:text-sm text-[#2967FF] font-raleway lining-nums tabular-nums  font-semibold" >
        {itemsInCart < 10 ? itemsInCart : '10+'}
      </h2>
      : <></>
  )
  return (
    
    <div id="border_circle" className={"relative w-full max-w-[1.8rem] h-10  flex justify-center items-center child:max-w-[2.0rem] "} >
        <BasketIco className={""}  isBurgerMenu={isBurgerMenu} />
        {
          isCartBtn && <AddCartCount/>
        }
     </div>
     
  )
}

export default CartIco
