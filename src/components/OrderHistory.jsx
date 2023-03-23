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
import { useDispatch } from 'react-redux'
import { createdOrder } from '../orm/models/OrderModel'

const OrderHistory = ({ itemsOrdered}) => {
  const dispatch = useDispatch()


  const handleLoadTest =()=>{
    const finalOrderData = [{
      "type": "orm/Order/CREATE",
      "payload": { "id": "aqr5hr7e-1", "DateCreated": "2023-2-23,08:29:51 GMT+0300 (Moscow Standard Time)", "productIds": [2001, 2017, 2011], "OrderProps": { "quantity": [{ "productId": 2001, "price": "329", "quantity": 1 }, { "productId": 2017, "price": "44", "quantity": 1 }, { "productId": 2011, "price": "408", "quantity": 1 }], "deliveryDate": "2023-03-23", "deliveryTime": "11:33", "deliveryAddress": "Ylitsa Dement'yeva", "receiver": "Tony valeska", "receiverPhone": "+79656229755", "orderCost": 781, "deliveryCost": 200, "totalCost": 981, "storeName": "Davies' Store" }, "status": ["ordered", "complete"] }
    },
    {
      "type": "orm/Order/CREATE",
      "payload": { "id": "q1ndxo6p-2", "DateCreated": "2023-2-23,08:30:50 GMT+0300 (Moscow Standard Time)", "productIds": [2012], "OrderProps": { "quantity": [{ "productId": 2012, "price": "9", "quantity": 1 }], "deliveryDate": "2023-03-23", "deliveryTime": "09:32", "deliveryAddress": "Ylitsa Dement'yeva", "receiver": "Tony valeska", "receiverPhone": "+79656229755", "orderCost": 9, "deliveryCost": 200, "totalCost": 209, "storeName": "Clear fawn" }, "status": ["ordered", "complete"] }
    },
    {
      "type": "orm/Order/CREATE",
      "payload": { "id": "n3z6tjk7-3", "DateCreated": "2023-2-23,08:31:21 GMT+0300 (Moscow Standard Time)", "productIds": [2010], "OrderProps": { "quantity": [{ "productId": 2010, "price": 104, "quantity": 1 }], "deliveryDate": "2023-03-23", "deliveryTime": "11:33", "deliveryAddress": "Ylitsa Dement'yeva", "receiver": "Tony valeska", "receiverPhone": "+79656229755", "orderCost": 104, "deliveryCost": 200, "totalCost": 304, "storeName": "Avita" }, "status": ["ordered", "complete"] }
    }]
    finalOrderData.forEach(od=>dispatch(createdOrder(od.payload)))
    
  }
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
      
      const shadowDiv = document.getElementById("shadow-div")
      const contentWrapper = document.getElementById("content_wrapper")
      const item = document.getElementById(itemId)
      const itemContent = item?.querySelector("#item_content")
      const prevActiveElem = document.querySelector(".active-open")
      const prevItemContent = prevActiveElem?.querySelector("#item_content")
      const openState = "active-open"
      const [itemOrder, prevActOrder] = [
        item?.className.match(/\b(order)[-][0-9]/)[0] ||"null",
        prevActiveElem?.className.match(/\b(order)[-][0-9]/)[0] ||"null"
      ]
      console.log(shadowDiv, contentWrapper)
      prevActiveElem?.classList.toggle(openState)
      item.classList.toggle(openState)
      
      const elems = {
        isOpen: [prevActiveElem, item].filter(el => el?.classList.contains("active-open"))[0] || false,
        notOpen: [prevActiveElem, item].filter(el => !el?.classList.contains("active-open"))[0] || false
      }
    
      const toggleShowContent =(elem,ignore )=>{
        elem?.querySelector("#item_content").classList.contains("hidden")
          ? ignore||elem?.querySelector("#item_content").classList.replace("hidden", "flex")
          : elem?.querySelector("#item_content").classList.replace("flex", "hidden")
      }
      const toggleMoveContent = (parent, elem, {ignoreAdd=false, ignoreRemove=false}) => {
        if (!elem) return
        parent.contains(elem)
          ? ignoreRemove || parent.removeChild(elem)
          : ignoreAdd || parent.appendChild(elem)
      }
    
      const toggleActiveState =(elem)=>{
       
        if (elems.notOpen){
          // remove class
          elems.isOpen.classList.remove(itemOrder)
          elems.notOpen.classList.remove("col-span-1")
          elems.notOpen.classList.remove("row-span-1")
          elems.notOpen.classList.remove(prevActOrder)
          toggleShowContent(elems.notOpen, "ignore")
          // toggleMoveContent(contentWrapper, elems.isOpen, {ignoreAdd:true})
          // toggleMoveContent(shadowDiv, elems.notOpen,{ignoreAdd : true})

          
        }
        // add classes
        elems.notOpen?.classList?.add(itemOrder)
        elems.isOpen.classList.add("col-span-1")
        elems.isOpen.classList.add("row-span-1")
        elems.isOpen.classList.add(prevActOrder)
        toggleShowContent(elems.isOpen)
        // toggleMoveContent(contentWrapper, elems.notOpen, {ignoreRemove : false})
        // toggleMoveContent(shadowDiv, elems.isOpen, {ignoreRemove : false})
        
      }
      
      toggleActiveState()
    }
    const Item = ({ idx, order})=>{
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
      <div id="item_content" className=" hidden child:p-0  flex-col justify-center gap-2 font-raleway text-sm child:gap-[3px]">
        <OrderDetails/>
      </div>
    )


    return (
    <div id={"item-"+order.id} className={("order-"+(+idx+1))+" max-w-[400px] mx-1 px-2 pt-2 pb-2  border-[1px] border-gray-300 rounded-2xl lining-nums tabular-nums"}>
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
                <div id="show_more" onClick={(e) => handleReadMore(e, ("item-" + order.id))} className="flex items-baseline text-[12.2px] text-[#2967FF] font-semibold cursor-pointer">
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
          <ItemContent/>
      
          
        
      </div>
      
    </div>
  )}

  return (
    <div id="order_history__container" className="w-full px-2 flex flex-col justify-center gap-2  ">
      <div id="order_history__header" className="text-xl text-black font-raleway font-semibold">
        <p>
          {tags.orderHistory.mainText}
        </p>
        <p onClick={handleLoadTest} className="test-order accent-red-600 underline text-sm font-semibold cursor-pointer">load test data</p>
      </div>
      <div id="order_history__content" className="w-full ">
        <div id='shadow-div' className="shadow-div"></div>
        <div id="content_wrapper" className="w-full grid  grid-flow-cols grid-cols-[repeat(auto-fit,minmax(14rem,1fr))] gap-6">
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