import React,{useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'


// assets
import { LocationIco, setTextBg, textBg } from '../assets'
import { createdOrder } from '../orm/models/OrderModel'
import ProductDescriptor from './ProductDescriptor'
import { momentDate, returnOnReload } from '../orm/utilities'
import types from '../orm/actions/actionTypes'
import NameTag from './NameTag'
import { orderedCartItem } from '../orm/models/CartModel'
import { getNextId } from '../orm/selectors'
import { titleTagTypes as tags } from "../assets";


const CheckoutForm = ({ }) => {
  
  let navigate = useNavigate()
  const location = useLocation()
  const dateRef = useRef()
  const timeRef = useRef()
  const dispatch = useDispatch()
  // returnOnReload()()

  const total = Number.parseInt(location.state?.total)
  const id = location.key
  const orderedItems = location.state?.orderedItems
  const ids = location.state?.cartItemIds
  const storeName = location.state?.storeName
  const deliveryPrice = 200
  const nextId = useSelector(getNextId('Order'))

  const handleSubmit=(e)=>{
    e.preventDefault();
    let formData = new FormData(document.forms['checkout_form']);
    let orderData = {}
    formData.forEach((k,v, idx)=> {
      const camelize = (str) => str.toString().toLowerCase().split("_").map((el, x) => x !== 0 ? [el.slice(0, 1)[0].toUpperCase(), el.slice(1)].join("") : el).join("")
      if (["orderCost","deliveryCost","totalCost"].every(i => i!==camelize(k))){
        orderData[camelize(v)] = k
      }
    })
    

    
    let status = types.ORDERED_COMPLETE.toLowerCase().split("_")
    
    let finalOrderData = {id:id+"-"+nextId, DateCreated: momentDate().full, productIds: orderedItems.map(oi => oi.productId), OrderProps: { quantity: orderedItems, ...orderData, storeName, orderCost: total, deliveryCost: deliveryPrice, totalCost: deliveryPrice + total }, status, }
    dispatch(createdOrder(finalOrderData))
    // console.log("ids", ids)
    ids.forEach(id=>dispatch(orderedCartItem({id:id, set:{ItemStatus: types.ORDERED_COMPLETE}})))
    
    setTimeout(() => {
      navigate("../history", { replace: true})
    }, 1000);
  }
 

  const CheckoutForm = ({})=> (
    <>
      <div id="date_time" className="py-2 text-lg font-relaway" >
        <p className="text-md font-semibold ">{tags.checkout.orderWhenText}</p> 
      </div>
      <div id="delivery_date_time__wrapper" className="w-auto  flex less-than-xs:flex-wrap  gap-4">
        <div id="date" className="max-w-[9rem] flex flex-col justify-center border-b-[1px] border-b-gray-300">
          <label htmlFor="delivery_date" className="w-0 h-0"></label>
          <input id="d_date" className=" focus:outline-none" form="checkout_form" type="text" name="delivery_date" placeholder="Выберите дату"  ref={dateRef} onFocus={() => (dateRef.current.type = "date")} onBlur={() => (dateRef.current.type = "text")} required  ></input>
        </div>
        <div id="time" className="max-w-[9rem] flex flex-col justify-center border-b-[1px] border-b-gray-300 ">
          <label htmlFor="delivery_time" className="w-0 h-0"></label>
          <input id="d_time" className="  w-full  px-2 focus:outline-none"  form="checkout_form"  type="text" name="delivery_time" placeholder="Выберите время" ref={timeRef} onFocus={() => (timeRef.current.type = "time")} onBlur={() => (timeRef.current.type = "text")} required ></input>
        </div>
      </div>
      <div id="address__wrapper" className="less-than-xs:min-w-[8rem] min-w-[15rem] py-2 flex flex-col justify-center font-raleway">
        <label htmlFor="delivery_address" className="text-md font-semibold">{tags.checkout.orderToWhereText+"?"}</label>
        <div className="h-[2.5rem] px-2 flex items-center gap-1 border-[1px] border-gray-300 rounded-3xl">
          <LocationIco />
          <input id="d_addr" className=" max-w-[314px] w-full  px-2 focus:outline-none" form="checkout_form" type="text" name="delivery_address"  placeholder="Выберите адрес доставки" required />
        </div>
      </div>
      <div id="name__wrapper" className="less-than-xs:min-w-[8rem] min-w-[15rem]  py-2 flex flex-col justify-center font-raleway">
        <label htmlFor="receiver_name" className="text-md font-semibold">{tags.checkout.receiverNameText}</label>
        <div className="h-[2.5rem] px-2 flex items-center gap-1 border-[1px] border-gray-300 rounded-3xl">
          <input id="rcv_name" className=" max-w-[314px] w-full  px-2 focus:outline-none" form="checkout_form" type="text" name="receiver" required />
        </div>
      </div>
      <div id="phone__wrapper" className="less-than-xs:min-w-[8rem] min-w-[15rem] py-2 flex flex-col justify-center font-raleway">
        <label htmlFor="receiver_phone" className=" text-md font-semibold">{tags.checkout.phoneText}</label>
        <div className="h-[2.5rem] px-2 flex items-center gap-1 border-[1px] border-gray-300 rounded-3xl">
          <input id="rcv_phone" className=" max-w-[314px] w-full  px-2 focus:outline-none" form="checkout_form" type="text" name="receiver_phone" required />
        </div>
      </div>
    </>
  )
  
  const CheckoutOrder = ({ totalPriceText = "Order total", deliveryCostText = "Delivery cost", sumTotal = "Total", checkoutBtnText = "Checkout" }) =>(
    <div className=" mt-14 w-full flex flex-col justify-center gap-6 lg:p-4 lining-nums tabular-nums">
      <div id="order_details" className="w-auto p-2 lg:p-4 flex flex-col justify-start md:justify-center lg:justify-center xl:justify-center items-center gap-4 border-[1px] border-[#F0F4FB] bg-[#F0F4FB] rounded-3xl">
        
        <div id="order_items" className="w-full flex flex-col items-start text-black text-base">
          <p className="p-2 w-full flex flex-start text-lg text-[#727280]">
            {"Ordered Items:"}
          </p>
          {orderedItems.map((oi,x)=>
            <div className="w-full less-than-xs:child:max-w-full  less-than-xs:child:justify-between">
              <ProductDescriptor key={x} id={`${oi.productId}${x}`} label={<NameTag modelName={"Product"} item={{ id: oi.productId, prop: "     x" + oi.quantity}}/>} values={[Number.parseInt(oi.price*oi.quantity)]} />

            </div>
            )
          }
          <span className={"dotted-div my-2 px-2 w-full h-[1px] text-slate-400 overflow-hidden clear-right text-clip bg-repeat-x"} style={setTextBg(".")} >
          </span>
        </div>
        
        <div id="order_cost__wrapper" className="w-full   py-1 px-2 flex  sm:flex-row  md:flex-row  lg:flex-row xl:flex-row justify-between md:justify-between lg:justify-between xl:justify-between  items-center text-lg text-[#727280]  font-raleway ">
          <label htmlFor="order_cost">
            {tags.checkout.totalPriceText+":"}
          </label>
          <input id="o_cost" className=" w-auto max-w-[8rem] flex justify-start  md:justify-end lg:justify-end xl:justify-end text-xl bg-transparent text-end lining-nums tabular-nums" name="order_cost" form="checkout_form" type="text" value={(total || 0) +tags.currencyType} readOnly required  />
        </div>

        <div id="delivery_cost__wrapper" className="w-full  py-1 px-2 flex  sm:flex-row  md:flex-row  lg:flex-row xl:flex-row justify-between md:justify-between lg:justify-between xl:justify-between items-center text-lg text-[#727280] font-raleway ">
          <label className="" htmlFor="delivery_cost">
            {tags.checkout.deliveryCostText+":"}
          </label>
          <input id="d_cost" className="max-w-[8rem] flex justify-start  md:justify-end lg:justify-end xl:justify-end  bg-transparent text-end lining-nums tabular-nums" name="delivery_cost" form="checkout_form" type="text" value={(deliveryPrice || 0) +tags.currencyType} readOnly required />
        </div>

        <div id="total_cost__wrapper" className="w-full  px-2 flex  sm:flex-row  md:flex-row  lg:flex-row xl:flex-row justify-between md:justify-between lg:justify-between xl:justify-between items-center text-xl text-[#727280] font-raleway font-medium ">
          <label className="bg-transparent" htmlFor="total_cost">
            {tags.checkout.sumTotalText+":"}
          </label>
          <input id="t_cost" className="max-w-[8rem] flex justify-start  md:justify-end lg:justify-end xl:justify-end  bg-transparent text-black font-bold text-end lining-nums tabular-nums" name="total_cost" form="checkout_form" type="text" value={(total 
          + deliveryPrice) +tags.currencyType} readOnly required />
        </div>

      </div>
      
      <input type="submit" form="checkout_form" id="checkout_btn" value={tags.checkout.checkoutBtnText} className="w-auto p-3 flex justify-center  items-center border-[1px] border-[#2967FF] bg-[#2967FF] active:bg-green-400 rounded-3xl active: text-2xl text-white font-raleway font-normal cursor-pointer" required/>
    </div>
  )
  return (
    <div id="checkout_wrapper" className="w-full mx-2">
      <div id="checkout_header" className="text-xl text-black font-raleway font-bold">
        <p>
        {tags.checkout.checkoutText}
        </p>
      </div>
      <form id="checkout_form" name="checkout_form" action="/#" method='POST'  onSubmit={(e)=>handleSubmit(e)} >
        <div id="checkout_content" className="w-auto flex flex-col flex-wrap justify-center items-center sm:flex-col md:flex-row lg:flex lg:flex-row lg:justify-start lg:gap-8">
          
          <div id="checkout_form__wrapper" className="p-4 w-full lg:w-[33%] max-w-[30rem]  flex flex-col justify-center align-middle gap-3 ">
              <CheckoutForm />
            </div>
            <div id="checkout_order__wrapper" className="w-full max-w-[30rem] flex-grow    flex flex-col justify-center items-center gap-2">
              <CheckoutOrder />
            </div>
          
        </div>
      </form>

    </div>
  )
}

export default CheckoutForm
