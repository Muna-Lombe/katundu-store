import React, { useState } from 'react'

// assets 
import { CopyIco, ArrowDown, titleTagTypes as tags, OpenIco, ArrowLeft, ArrowRight} from '../assets'
import ContentDetails from './ContentDetails'
import NameTag from './NameTag'
import ProductDescriptor from './ProductDescriptor'
import ContentDescription from './ContentDescription'
import Logo from './Logo'
import NoItems from './NoItems'
import { Link } from 'react-router-dom'
import ToggleableField from './ToggleableField'

const OrderHistory = ({ itemsOrdered}) => {
  const handleRotateIco = (e, id) => {
    const elem = e.target || e
    // console.log(elem)
    if (e.type === "click") e.preventDefault()
    if (e.type === "click") e.stopPropagation()
    const ordSum = document.getElementById("order-summary"+id)
    const ordLst = document.getElementById("order-list"+id)
    const ico = document.querySelector(".order-item-expand-ico")
    const findNear=(child)=>{
      return child.previousSibling || child.nextSibling
    }
    const toggleReplace=(classList,one, two)=>{
      classList.replace(one, two) ||
      classList.replace(two, one)
    }
    const clickedSvg = () => elem.tagName === "svg"
    const clickedP = () => elem.tagName === "p"
    let child;
    if (clickedSvg()) child = elem
    if (clickedP()) child = elem.firstChild
    
    if (ico.classList.contains("-rotate-180")) {
      ico.classList.replace("-rotate-180", "rotate-180")
      // const nearico = findNear(ico)
      // if (nearico.tagName === "INPUT" && nearico.type === "checkbox" && nearico.id === "show-more-checkbox"){
        //   nearico.checked=true
        // }
        toggleReplace(ordLst.classList,"visible","hidden" )
        toggleReplace(ordSum.classList,"hidden", "visible")
        
      } else {
        ico.classList.replace("rotate-180", "-rotate-180")
        // optgrp().classList.replace("visible", "hidden")
        toggleReplace(ordSum.classList,"visible", "hidden",)
        toggleReplace(ordLst.classList,"hidden", "visible")
        
      }
      
    }
    const handleReadMore=(e, itemId, setter)=>{
      e.preventDefault()
      const item = document.getElementById(itemId)
      const prevActiveElem = document.querySelector(".active-open")
      const openState = "active-open"
      const toggleActiveState =(elem)=>{
        if (prevActiveElem?.id.includes("item")){
          prevActiveElem.classList.toggle(openState)
          prevActiveElem.classList.toggle("col-span-1")
          prevActiveElem.classList.toggle("order-1")
        }
        elem.classList.toggle(openState)
        elem.classList.toggle("col-span-1")
        elem.classList.toggle("order-1")
      }
      toggleActiveState(item)
      setter(prevState=> !prevState)
    }
    const Item = ({ idx, order})=>{
      const [readMore, setReadMore] = useState(false)
      const id = '#'+ order.id
      let date = order.DateCreated.split(",")[0]
    const OrderSummary = () =>(
      <div id={"order-summary-"+order.id} className="visible  flex flex-row flex-wrap gap-2">
        <div id="quatity_ordered">
          <p className="text-xs text-[#727280] font-medium">{tags.orderHistory.quantityOrderedText}</p>
          <p className="text-xs text-black font-semibold">{order?.OrderProps.quantity.map(i => i.quantity).reduce((a, b) => a + b)} шт.</p>
        </div>
        <div id="order_cost">
          <p className="text-xs text-[#727280] font-medium"> {tags.orderHistory.orderCostText}</p>
          <p className="text-xs text-black font-semibold"> {tags.currencyType + order?.OrderProps.totalCost}</p>
        </div>
        <div id="delivery_address">
          <p className="text-xs text-[#727280] font-medium"> {tags.orderHistory.deliveryAddressText} </p>
          <p className="text-xs text-black font-semibold"> ул.{order?.OrderProps.deliveryAddress.length > 41 ? order?.OrderProps.deliveryAddress.slice(0, 41) + "..." + order?.OrderProps.deliveryAddress.slice(-10, -1) : order.OrderProps.deliveryAddress} </p>
        </div>
      </div>
    )
    
    const OrderList = ()=>{
      const contentType =  "ordered-items"
      const contentArray = order?.OrderProps.quantity.map(oi => ({ 
          ...oi, 
          specificId: oi.productId, 
          nameTag: { 
            modelName: "Product", 
            item: { id: oi.productId, prop: "     x" + oi.quantity }
          }, 
          values: [tags.currencyType + Number.parseInt(oi.price * oi.quantity)] 
        }))  
      const variations = order?.OrderProps.quantity?.map((o, x) => ({ id: o.productId, text: o.productId }))
    
        return (
          <div id={"order-list-"+order.id} className=" child:m-0 child:p-0 w-max child:gap-1 text-xs transition-transform ">
          <ToggleableField contentType={contentType}  contentArray={contentArray} variations={variations}/>
          </div>
      )
    }
    const OrderDetails =()=>{
      const contentType = "toggle-orders-details"
      const variations = [{ id: "list-" + 0, text: "list" }, { id: "summary-"+1, text:"summary"}]
      const contentArray = variations.map((v,x) => ({
        specificId: v.text+'-'+x,
        ChildElement: v.text === "list" ? OrderList : OrderSummary 
      }))
      return(
          <ToggleableField contentType={contentType}  contentArray={contentArray} variations={variations} hasChildElement={true}/>
      )
    }

    const ItemContent =()=>(
      <div id="item_content" className="child:p-0 flex flex-col justify-center gap-2 font-raleway text-sm child:gap-[3px]">
        <OrderDetails/>
      </div>
    )


    return (
    <div id={"item-"+order.id} className={(idx===0 ? " order-1 " : "")+" max-w-[400px] mx-1 px-2 pt-2 pb-2  border-[1px] border-gray-300 rounded-2xl lining-nums tabular-nums"}>
      <div id="item_wrapper" className="p-2 flex flex-col justify-center gap-2">
        <div id="item_header" className=" flex flex-col less-than-xs:flex-wrap justify-between gap-2">
          <div id="item_img" className="w-auto flex flex-row items-center gap-1 border-[1px] border-transparent rounded-2xl">
            {/* <img className="border-[1px] border-transparent rounded-[25px]" src={logo} alt="" /> */}
              <Logo logo={order?.OrderProps.storeName} size={{ font:30, h:40, w:40, x: 5, y: 30 }} addLogo addText={false}/>
              <div id="item_name" className="text-base text-slate-600 font-semibold ">
                <p>{order?.OrderProps.storeName} </p>
              </div>
          
          </div>
          <div id="item_description" className=" px-1 less-than-xs:w-full less-than-xs:order-3 max-w-[21rem] flex flex-wrap  justify-start gap-1 font-raleway">
            <div id="item_details" className=" flex justify-start gap-4">
              <div id="order_date" className="flex items-center text-[12px] text-[#727280] font-semibold">
                <p> {date} </p>
              </div>
                <div id="show_more" onClick={(e) => handleReadMore(e, ("item-" + order.id), setReadMore)} className="flex items-baseline text-[12.2px] text-[#2967FF] font-semibold cursor-pointer">
                <p className="flex items-end"> {tags.orderHistory.showMoretext} </p>
              </div>
            </div>
            
          </div>
        </div>
          <div id="order_header" className="flex flex-row flex-wrap justify-start items-start less-than-xs:gap-4 gap-8">
            <div id="order_status">
              <p className="text-xs text-[#727280] font-medium">{tags.orderHistory.orderStatusText}</p>
              <p className="text-xs text-black font-semibold">{order?.status[0] + '/' + order?.status[1]} </p>
            </div>
            <div id="order_number">
              <p className="text-xs text-[#727280] font-medium"> {tags.orderHistory.orderNumberText} </p>
              <p className="flex justify-between gap-2 text-xs text-[#2967FF] font-semibold" > {id} <CopyIco text={id.toString()} /> </p>


            </div>

          </div>
        {
          readMore
          ? <ItemContent/>
          : <></>
        }
        
      </div>
      
    </div>
  )}

  return (
    <div id="order_history__container" className="w-full px-2 flex flex-col justify-center gap-2  ">
      <div id="order_history__header" className="text-xl text-black font-raleway font-semibold">
        <p>
          {tags.orderHistory.mainText}
        </p>
        
      </div>
      <div id="order_history__content" className="w-full ">
        <div id="content_wrapper" className="w-full grid  grid-flow-rows grid-cols-[repeat(auto-fit,minmax(14rem,1fr))] gap-6">
         {
          itemsOrdered.length
          ? itemsOrdered?.map((item,x) => <Item key={x} idx={x} order={item}/>) 
              : <NoItems subText={"🙅 looks like you have no orders yet 👀"} mainText={<span> {"😃 "} <Link to={"/"} className='text-blue-500 hover:underline'>{"Buy something"} </Link>  {" to start your shopping journey 😃"} </span>} />
        } 
          
        </div>
      </div>

    </div>
  )
}

export default OrderHistory