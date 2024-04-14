
import React from 'react'
import { useSelector } from 'react-redux'
// import { itemIdsInCart, selectcartIds } from '../../js/slices/cart/cartSlice'
import BasketIco from './BasketIco'
import { authenticatedUsers, cartItemsCount, isAuthedUser } from '../../orm/selectors'


const CartIco = ({size, isBurgerMenu,isCartBtn=false}) => {
  const authSessions = useSelector(authenticatedUsers)
  const userAuthed = useSelector(isAuthedUser(authSessions[0]?.uuid))
  let itemsInCart = useSelector(cartItemsCount())
  
  // console.log(itemsInCart)
  const AddCartCount = () =>(
      userAuthed ?
      <h2 id="cart_count" className=" absolute top-0 -right-[0.6rem] min-w-[15px] w-auto max-w-[20px] less-than-sm:h-[10px] greater-than-xs:aspect-square  flex justify-start items-center rounded-md bg-white text-xs greater-than-sm:text-sm text-[#2967FF] font-raleway lining-nums tabular-nums  font-semibold" >
        {itemsInCart < 10 ? itemsInCart : '10+'}
      </h2>
      : <></>
  )
  return (
    
    <div id="border_circle" className={"relative w-full aspect-square sm:flex md:flex lg:flex flex justify-center items-center"} >
        <BasketIco isBurgerMenu={isBurgerMenu} />
        {
          isCartBtn && <AddCartCount/>
        }
     </div>
     
  )
}

export default CartIco
