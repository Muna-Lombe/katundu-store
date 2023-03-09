import React from 'react'

// assets 
import { CopyIco, ArrowDown, titleTagTypes as tags, OpenIco} from '../assets'
import ContentDetails from './ContentDetails'
import NameTag from './NameTag'
import ProductDescriptor from './ProductDescriptor'
import ContentDescription from './ContentDescription'
import Logo from './Logo'
import NoItems from './NoItems'
import { Link } from 'react-router-dom'

const OrderHistory = ({ itemsOrdered}) => {
  const handleRotateIco = (e) => {
    const elem = e.target || e
    // console.log(elem)
    if (e.type === "click") e.preventDefault()
    if (e.type === "click") e.stopPropagation()
    const ordSum = document.getElementById("order-summary")
    const ordLst = document.getElementById("order-list")
    const findNear=(child)=>{
      return child.previousSibling || child.nextSibling
    }
    const clickedSvg = () => elem.tagName === "svg"
    const clickedP = () => elem.tagName === "p"
    let child;
    if (clickedSvg()) child = elem
    if (clickedP()) child = elem.firstChild

    if (child.classList.contains("-rotate-90")) {
      child.classList.replace("-rotate-90", "rotate-90")
      // const nearChild = findNear(child)
      // if (nearChild.tagName === "INPUT" && nearChild.type === "checkbox" && nearChild.id === "show-more-checkbox"){
      //   nearChild.checked=true
      // }
      ordLst.classList.replace("visible","hidden", )
      ordSum.classList.replace("hidden", "visible")

    } else {
      child.classList.replace("rotate-90", "-rotate-90")
      // optgrp().classList.replace("visible", "hidden")
      ordSum.classList.replace("visible", "hidden",)
      ordLst.classList.replace("hidden", "visible")

    }

  }
  
  const Item = ({ order})=>{
    const id = '#'+ order.id
    let date = order.DateCreated.split(",")[0]
    const OrderSummary = () =>(
      <div id="order-summary" className="visible flex flex-row flex-wrap gap-2">
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
    const OrderList = ()=>(
        <div id="order-list" className=" hidden child:m-0 child:p-0 w-max text-sm ">
          <ContentDetails contentType={"ordered-items"} variations={(order?.OrderProps.quantity?.map((o, x) => ({ id: o.productId, text:o.productId})))}>
              {order?.OrderProps.quantity.map((oi, x) =>
                <ContentDescription key={x} first={x === 0} id={`${oi.productId}`} >
                  <ProductDescriptor key={x + 10} id={`${oi.productId}${x}`} label={<NameTag modelName={"Product"} item={{ id: oi.productId, prop: "     x" + oi.quantity }} />} values={[tags.currencyType + Number.parseInt(oi.price * oi.quantity)]} />
                </ContentDescription>
              )
              }

          </ContentDetails>
        </div>
    )
    
    return (
    <div id="item" className=" max-w-[400px] mx-1 px-2 pt-2 pb-9  border-[1px] border-gray-300 rounded-2xl lining-nums tabular-nums">
      <div id="item_wrapper" className="p-2 flex flex-col justify-center gap-2">
        <div id="item_header" className=" flex less-than-xs:flex-wrap justify-between gap-2">
          <div id="item_img" className="w-auto flex flex-row items-center border-[1px] border-transparent rounded-2xl">
            {/* <img className="border-[1px] border-transparent rounded-[25px]" src={logo} alt="" /> */}
              <Logo logo={order?.OrderProps.storeName} size={{ font:30, h:40, w:40, x: 0, y: 30 }} addLogo addText={false}/>
              <div id="item_name" className="text-base text-black font-semibold ">
                <p>{order?.OrderProps.storeName} </p>
              </div>
          
          </div>
          <div id="item_description" className="less-than-xs:w-full less-than-xs:order-3 max-w-[21rem] flex flex-col justify-center gap-1 font-raleway">
            <div id="item_details" className="h-[1rem] flex justify-start gap-10">
              <div id="order_date" className="flex items-center text-[12px] text-[#727280] font-semibold">
                <p> {date} </p>
              </div>
              <div id="show_more" className="flex items-baseline text-[12.2px] text-[#2967FF] font-semibold">
                <p className="flex items-end"> {tags.orderHistory.showMoretext} </p>
              </div>
            </div>
            
          </div>
          <div onClick={handleRotateIco} className="show-more w-min relative">
            <OpenIco/>
              {/* <ArrowDown size={18} handleClick={handleRotateIco} /> */}
          </div>
        </div>
        <div id="item_content" className="flex flex-col justify-center gap-2 font-raleway ">
          <div id="order_header" className="flex flex-row justify-start items-start less-than-xs:gap-4 gap-8">
            <div id="order_status">
              <p className="text-xs text-[#727280] font-medium">{tags.orderHistory.orderStatusText}</p>
              <p className="text-xs text-black font-semibold">{order?.status[0]+'/'+order?.status[1]} </p>
            </div>
            <div id="order_number">
              <p className="text-xs text-[#727280] font-medium"> {tags.orderHistory.orderNumberText} </p>
              <p className="flex justify-between gap-2 text-xs text-[#2967FF] font-semibold" > {id} <CopyIco text={id.toString()} /> </p>
              

            </div>
            
          </div>

          <div id="order_details" className=" flex justify-between items-center">
            <OrderList/>
            <OrderSummary/>
          </div>
        </div>
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
        <div id="content_wrapper" className="w-full grid  grid-flow-rows grid-cols-[repeat(auto-fit,minmax(8rem,1fr))] gap-6">
         {
          itemsOrdered.length
          ? itemsOrdered?.map((item,x) => <Item key={x} order={item}/>) 
              : <NoItems subText={"🙅 looks like you have no orders yet 👀"} mainText={<span> {"😃 "} <Link to={"/"} className='text-blue-500 hover:underline'>{"Buy something"} </Link>  {" to start your shopping journey 😃"} </span>} />
        } 
          
        </div>
      </div>

    </div>
  )
}

export default OrderHistory