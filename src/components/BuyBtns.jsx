import { useDispatch, useSelector } from "react-redux";
import types from "../orm/actions/actionTypes";
import { createdOrder } from "../orm/models/OrderModel";
import { momentDate } from "../orm/utilities";
import { authenticatedUsers, isAlreadyOrdered, isAuthedUser, isInCart } from "../orm/selectors";
import { createdCartItem } from "../orm/models/CartModel";
import { titleTagTypes as tags } from "../assets";
import { useLocation, useNavigate } from "react-router-dom";

const BuyBtns = ({ id, onlyBtn }) => {
  const goto = useNavigate()
  const location = useLocation()
  const isOrdered = useSelector(isInCart(id))
  const authSessions = useSelector(authenticatedUsers)
  const userAuthed = useSelector(isAuthedUser(authSessions[0]?.id))

  const dispatch = useDispatch()
  const handleRedirect = () =>{
    goto("/signin", { state: { ...location}})
  }
  const handleAddToCart = (id) => {
    dispatch(createdCartItem({
      DateCreated: momentDate().full,
      product: id,
      productCount:1,
      ItemStatus: types.IN_CART
    }))

  }
  return (
    <div className={" buy-btns   my-3 flex flex-col items-center gap-2 "}>
      <button onClick={() => userAuthed ? handleAddToCart(id) : handleRedirect()} onSubmit={() => ""} disabled={isOrdered} className={(isOrdered ? "bg-slate-400 " : " bg-orange-500 active:bg-orange-400  ") + "buy-now  h-max py-1 px-2  max-w-xs flex justify-center rounded-2xl text-white " + (onlyBtn ? "" :" w-10/12 font-[arial] font-thin ")+" cursor-pointer transition-transform"}>
        <span className={" flex text-center leading-5"}>
          { onlyBtn
            ? isOrdered ? tags.buyBtn.miniTooltip : tags.buyBtn.miniMainText
            : isOrdered ? tags.buyBtn.tooltip : tags.buyBtn.mainText
          }
        </span>
      </button>
      {
        onlyBtn
        ? ""
        : <div className="delivery-type px-2 flex justify-center text-slate-500  text-sm font-[arial] ">
          {tags.buyBtn.subText}
        </div>
      }
    </div>
  )
}
export default BuyBtns;