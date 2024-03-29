import { useDispatch, useSelector } from "react-redux";
import types from "../orm/actions/actionTypes";
import { momentDate } from "../orm/utilities";
import { authenticatedUsers, isAuthedUser, isInCart } from "../orm/selectors";
import { createdCartItem } from "../orm/models/CartModel";
import { NoStockIco, titleTagTypes as tags } from "../assets";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ClassWatcher } from "../orm/utilities/classWatcher";

const BuyBtns = ({ id, deliveryInfo, onlyBtn, children, prodVars }) => {
  const [prodInStok, setProdInStok] = useState({status:true})
  const goto = useNavigate()
  const location = useLocation()
  const isOrdered = useSelector(isInCart(id))
  const authSessions = useSelector(authenticatedUsers)
  const userAuthed = useSelector(isAuthedUser(authSessions[0]?.id))
  // const prodInStok = useRef({status:false})
  const getPriceId = () => {
    const activePrice = document.querySelector(".variation-image.product-variation-active")
    // console.log("activePrice", activePrice )
    return Number.parseInt(activePrice.id.split("_")[1])
  }
  
  const checkStockStatus = () =>{
    return prodVars?.find(v=> v.id === getPriceId()).stock > 0
  }
  const dispatch = useDispatch()
  
  const handleRedirect = () =>{
    goto("/signin", { state: { ...location}})
  }
  const handleAddToCart = (id) => {
    dispatch(createdCartItem({
      DateCreated: momentDate().full,
      product: id,
      productVarId:getPriceId(),
      productCount:1,
      ItemStatus: types.IN_CART
    }))
    
  }
  useEffect(() => {
    
    const currPrice = document.querySelector(".product-variations")
    let watcher
    currPrice?.childNodes.forEach((child, x) => {
      watcher = new ClassWatcher(
        child, 
        "product-variation-active", 
        () => {setProdInStok({ status: checkStockStatus() })}, 
        () => "");
    })
    return () => {
      watcher?.disconnect()
    }
  }, [])
  
  const TruckIco =()=>(
    <svg fill="currentColor" stroke="currentColor" strokeWidth={0.1} xmlns="http://www.w3.org/2000/svg" width="25" height="25" class="bi bi-truck" viewBox="0 0 16 16"> <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" /> </svg>
    )
    return (
      
      !children
      ? <div className={" buy-btns   my-3 flex flex-col items-center gap-2 "}>
          
              <button onClick={() => userAuthed ? handleAddToCart(id) : handleRedirect()} onSubmit={() => ""} disabled={(isOrdered||!prodInStok.status)} className={((isOrdered||!prodInStok.status) ? "bg-slate-400 " : " bg-orange-500 active:bg-orange-400  ") + "buy-now  h-max py-1 px-2  max-w-xs flex justify-center rounded-xl text-white " + (onlyBtn ? "" :" w-10/12 font-raleway lining-nums tabular-nums  font-thin ")+" cursor-pointer transition-transform"}>
                <span className={" flex text-center leading-5"}>
                  { onlyBtn
                    ? isOrdered 
                      ? tags.buyBtn.miniTooltip  
                      : prodInStok.status 
                        ? tags.buyBtn.miniMainText 
                        : <NoStockIco/>
                    : isOrdered 
                      ? tags.buyBtn.tooltip  
                      : prodInStok.status 
                          ? tags.buyBtn.mainText 
                          : tags.buyBtn.noStockStatus
                  }
                </span>
              </button>
              {
                onlyBtn
                ? ""
                : <div className="delivery-type px-2 flex justify-center items-center gap-2  text-slate-500  less-than-xs:text-sm text-base font-raleway lining-nums tabular-nums  ">
                  
                    <span>
                      { prodInStok.status ?
                        deliveryInfo?.hasOwnProperty("data")
                          ? deliveryInfo.data.options[2].text 
                          : tags.buyBtn.subText
                        : ""
                      }
                    </span>
                      <TruckIco/>
                  </div>
              }
            
            </div>
          : <button onClick={() => userAuthed ? handleAddToCart(id) : handleRedirect()} onSubmit={() => ""} disabled={(isOrdered||!prodInStok.status)} className={((isOrdered||!prodInStok.status) ? "bg-slate-400 " : " bg-orange-500 active:bg-orange-400  ") + "buy-now  h-max py-1 px-2  max-w-xs flex justify-center text-white " + (onlyBtn ? "" : " w-10/12 font-raleway lining-nums tabular-nums  font-thin ") + " cursor-pointer transition-transform"}>
              {
                isOrdered 
                ? tags.buyBtn.miniTooltip
                : prodInStok.status
                    ? children
                  : <NoStockIco />
                
              }
            </button>
            
        
        
  )
}
export default BuyBtns;