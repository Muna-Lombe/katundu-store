import React, { Children, useState } from 'react'

// assets 
import { CopyIco, ArrowDown, titleTagTypes as tags, OpenIco, ArrowLeft, ArrowRight} from './icons'
import ContentDetails from './contents/ContentDetails'
import NameTag from './NameTag'
import ProductDescriptor from './ProductDescriptor'
import ContentDescription from './contents/ContentDescription'
import Logo from './Logo'
import NoItems from './NoItems'
import { Link } from 'react-router-dom'
import ToggleableField from './ToggleableField'
import { useDispatch } from 'react-redux'
import { createdOrderItem } from '../orm/models/OrderModel'
import { handleLoadTest, handleRotateIco } from '../utilities'

const OrderHistory = ({ itemsOrdered, listStyle}) => {
  const dispatch = useDispatch()
  // console.log("", itemsOrdered)

  // handleLoadTest(dispatch, createdOrderItem)
  // handleRotateIco()
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
        item?.className.match(/\b(order)[-][0-9]/)?.0 :"null",
        prevActiveElem?.className.match(/\b(order)[-][0-9]/)?.0 : "null"
      ]
      // console.log(shadowDiv, contentWrapper)
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
      
      const onlyIfNotMobile=(action)=>{
        if(window.innerWidth > 500){
          action()
        }
      }
      const toggleActiveState =(elem)=>{
       
        if (elems.notOpen){
          // remove class
          
          elems.isOpen.classList.remove(itemOrder)
          elems.notOpen.classList.remove("col-span-1")
          elems.notOpen.classList.remove("row-span-1")
          elems.notOpen.classList.remove(prevActOrder)
          elems.notOpen.classList.add("h-[143.1px]") 
          
          onlyIfNotMobile(()=>elems.isOpen.classList.remove(itemOrder))
          onlyIfNotMobile(()=>elems.notOpen.classList.remove(prevActOrder))
          toggleShowContent(elems.notOpen, "ignore")
          // toggleMoveContent(contentWrapper, elems.isOpen, {ignoreAdd:true})
          // toggleMoveContent(shadowDiv, elems.notOpen,{ignoreAdd : true})

          
        }
        // add classes
        onlyIfNotMobile(() => elems.notOpen?.classList?.add(itemOrder))
        elems.isOpen.classList.add("col-span-1")
        elems.isOpen.classList.add("row-span-1")
        elems.isOpen.classList.remove("h-[143.1px]")
        onlyIfNotMobile(() => elems.isOpen.classList.add(prevActOrder))
        toggleShowContent(elems.isOpen)
        // toggleMoveContent(contentWrapper, elems.notOpen, {ignoreRemove : false})
        // toggleMoveContent(shadowDiv, elems.isOpen, {ignoreRemove : false})
        
      }
      
      toggleActiveState()
    }
  const ListItem = ({ idx, order })=>{
    // need order number, order status, items ordered count, order cost
    // make order number clickable to redirect to history page
    const id = '#' + order.uuid
    const status = order.orderStatus[0] + "/" + order.orderStatus[1]
    
    return(
      // minmax(0, max-content) minmax(50%, 1fr) auto
      <tr>
        <td class="px-2 py-4 max-w-[8rem] truncate whitespace-nowrap ">
            {idx+1}
        </td>
        <td class="px-2 py-4 max-w-[8rem] truncate whitespace-nowrap cursor-pointer">
          <Link to={"/history"}>
            {id}
          </Link>
        </td>
        <td class="px-2 py-4 max-w-[8rem] truncate whitespace-nowrap">
          {status}
        </td>
        <td class="px-2 py-4 max-w-[8rem] truncate whitespace-nowrap">
          {order.orderQuantity} Qty
        </td>
        <td class="px-2 py-4 max-w-[8rem] truncate whitespace-nowrap">
          K {order.orderCost}
        </td>
      </tr>
      
      )
    }
    const CardItem = ({ idx, order})=>{
      const [isDrawn, setIsDrawn] = useState(false)
      const id = '#'+ order.uuid
      let date = order.deliveryDate

      const OrderSummary = () =>(
        <div id={"order-summary-"+order.uuid} className="visible  flex flex-row flex-wrap gap-2">
          <div id="quatity_ordered">
            <p className="text-xs text-[#727280] font-medium">{tags.orderHistory.quantityOrderedText}</p>
            <p className="text-xs text-black dark:text-white  font-semibold">{order?.productQuantity} шт.</p>
          </div>
          <div id="order_cost">
            <p className="text-xs text-[#727280] font-medium"> {tags.orderHistory.orderCostText}</p>
            <p className="text-xs text-black dark:text-white  font-semibold"> {tags.currencyType + (order?.orderCost||order?.orderItems?.reduce((acc, oi)=> acc + oi.price * oi.quantity, 0))}</p>
          </div>
          <div id="delivery_address">
            <p className="text-xs text-[#727280] font-medium"> {tags.orderHistory.deliveryAddressText} </p>
          <p className="text-xs text-black dark:text-white  font-semibold"> {order?.deliveryAddress} </p>
          </div>
        </div>
      )
      
      const OrderList = ()=>{
        const contentType =  "toggle-ordered-items"
        const contentArray = order?.orderItems?.map(oi => ({ 
            ...oi, 
            specificId: oi.uuid, 
            nameTag: { 
              modelName: "Product", 
                item: { id: oi.product.uuid, prop: "     x" + oi.quantity }
            }, 
            valuesArray: [tags.currencyType + Number.parseInt(oi.price * oi.quantity)] 
          })) || [] 
        const variations = order?.orderItems.map((o, x) => ({ uuid: o.uuid, text: x+1 }))
        // console.log("order list", variations, contentArray)

          return (
            <div id={"order-list-"+order.uuid} className=" child:m-0 child:p-0 w-max child:gap-1 text-xs transition-transform ">
            <ToggleableField contentType={contentType}  contentArray={contentArray} variations={variations}/>
            </div>
        )
      }
      const OrderDetails =()=>{
        const contentType = "toggle-orders-details"
        const variations = [{ uuid: order.uuid+"-list-" + 0, text: "list" }, { uuid: order.uuid+"-summary-"+1, text:"summary"}]
        const contentArray = variations.map((v,x) => ({
          specificId: v.uuid,
          ChildElement: v.text === "list" ? OrderList : OrderSummary 
        }))
        // console.log("order details", variations, contentArray)
        return(
            <ToggleableField contentType={contentType}  contentArray={contentArray} variations={variations} hasChildElement={true}/>
        )
      }

      const ItemContent =()=>(
        <div id="item_content" className=" hidden child:p-0  flex-col justify-center gap-2 font-raleway lining-nums tabular-nums  text-sm child:gap-[3px]">
          <OrderDetails/>
        </div>
      )


      return (
        <div id={"item-" + order.uuid} className={("order-" + (+idx + 1)) + " max-w-[400px] h-[143.1px]  mx-1   border-[1px] border-gray-300 rounded-2xl lining-nums tabular-nums"}>
        <div id="item_wrapper" className="p-2 flex flex-col justify-center gap-2">
          <div id="item_header" className=" flex flex-col less-than-xs:flex-wrap justify-between gap-2">
            <div id="item_img" className="w-auto flex flex-row items-center gap-1 border-[1px] border-transparent rounded-2xl">
              {/* <img className="border-[1px] border-transparent rounded-[25px]" src={logo} alt="" /> */}
                <Logo logo={order?.orderItems[0]?.storeName} size={{ font:30, h:40, w:40, x: 5, y: 30 }} addLogo addText={false}/>
                <div id="item_name" className="text-base text-slate-600 font-semibold ">
                  <p>{order?.orderItems[0]?.storeName} </p>
                </div>
            
            </div>
            <div id="item_description" className=" px-1 less-than-xs:w-full less-than-xs:order-3 max-w-[21rem] flex flex-wrap  justify-start gap-1 font-raleway lining-nums tabular-nums ">
              <div id="item_details" className=" flex justify-start gap-4">
                <div id="order_date" className="flex items-center text-[12px] text-[#727280] font-semibold">
                  <p> {date} </p>
                </div>
                  <div id="show_more" onClick={(e) => {handleReadMore(e, ("item-" + order.uuid)) }} className="flex items-baseline text-[12.2px] text-[#2967FF] font-semibold cursor-pointer">
                  <p className="flex items-end"> {tags.orderHistory.showMoretext} </p>
                </div>
              </div>
              
            </div>
          </div>
            <div id="order_header" className=" w-full flex flex-row justify-start items-start less-than-xs:gap-2 less-than-sm:gap-3 ">
              <div id="order_status" className='w-full'>
                <p className="text-xs text-[#727280] font-medium">{tags.orderHistory.orderStatusText}</p>
                <p className="text-xs text-black dark:text-white  font-semibold">{order?.orderStatus[0] + '/' + order?.orderStatus[1]} </p>
              </div>
              <div id="order_number" className="w-full">
                <p className=" flex text-xs text-[#727280] whitespace-nowrap font-medium gap-1 "> 
                  <span>
                    {tags.orderHistory.orderNumberText} 

                  </span>
                  <span className='hidden less-than-xs:flex'>
                    <CopyIco text={id.toString()} /> 

                  </span>

                </p>
                <p className="w-full  flex flex-row less-than-xs:gap-[2px] gap-2 text-xs text-[#2967FF] font-semibold" > 
                  <span className='w-full overflow-clip'>
                    {
                      id.toString().length > 10 
                        ? id.toString().slice(0, 10) + "..." 
                        : id.toString()
                    } 
                  </span>
                  <span className='flex less-than-xs:hidden'>
                    <CopyIco text={id.toString()} />

                  </span> 
                </p>
              </div>

            </div>
            <ItemContent/>
        
            
          
        </div>
        
      </div>
    )
  }

  const GridCards = ({listStyle})=>(
    <div id="content_wrapper" className="w-full grid  grid-flow-cols grid-cols-[repeat(auto-fit,minmax(14rem,1fr))] gap-2">
      {
        itemsOrdered?.length
          ? itemsOrdered?.map((item, x) => <CardItem listStyle={listStyle} key={x} idx={x} order={item} />)
          : <NoItems subText={"🙅 looks like you have no orders yet 👀"} mainText={<span> {"😃 "} <Link to={"/"} className='text-blue-500 hover:underline'>{"Buy something"} </Link>  {" to start your shopping journey 😃"} </span>} />
      }
    </div>
  )
  
  const ListItems = ({listStyle})=>(
    
    <div id="content_wrapper" className="bg-white shadow w-full overflow-hidden sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-2 py-3 max-w-[7rem] truncate text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              
            </th>
            <th scope="col" className="px-2 py-3 max-w-[7rem] truncate text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Order Number
            </th>
            <th scope="col" className="px-2 py-3 max-w-[7rem] truncate text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Order Status
            </th>
            <th scope="col" className="px-2 py-3 max-w-[7rem] truncate text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Order Count
            </th>
            <th scope="col" className="px-2 py-3 max-w-[7rem] truncate text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total Cost
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
        
          
          {
            itemsOrdered?.length
              ? itemsOrdered?.map((item, x) => <ListItem listStyle={listStyle} key={x} idx={x} order={item} />)
              : <></>
          }
      
        </tbody>
      </table>
    </div>
  )
  const OrdersWrapper = ()=>{
    switch (listStyle) {
      case "grid":
        return <GridCards listStyle={listStyle} />
        
      case "list":
        return <ListItems listStyle={listStyle} />
        
      default:
        return <></>
    }
  }
  return (
    <div id="order_history__container" className="w-full px-2 flex flex-col justify-center gap-2  ">
      <div id="order_history__header" className="text-xl text-black dark:text-white  font-arial lining-nums tabular-nums  font-semibold">
        <p>
          {tags.orderHistory.mainText}
        </p>
        {/* <p onClick={handleLoadTest} className="test-order accent-red-600 underline text-sm font-semibold cursor-pointer">load test data</p> */}
      </div>
      <div id="order_history__content" className="w-full py-4">
        <div id='shadow-div' className="shadow-div"></div>
        <OrdersWrapper/>
      </div>

    </div>
  )
}

export default OrderHistory