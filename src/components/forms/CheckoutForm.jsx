import React,{lazy, useEffect, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'


// assets
import { LocationIco, setTextBg, textBg } from '../icons'
import { createdOrder } from '../../orm/models/OrderModel'
import ProductDescriptor from '../ProductDescriptor'
import { momentDate, returnOnReload } from '../../orm/utilities'
import types from '../../orm/actions/actionTypes'
import NameTag from '../NameTag'
import { orderedCartItem } from '../../orm/models/CartModel'
import { checkouts as checkoutSelector, getNextId } from '../../orm/selectors'
import { titleTagTypes as tags } from "../icons";
import { useBeginItemCheckoutQuery, useCompleteItemCheckoutMutation } from '../../js/middleware/queryHandler'
import { createdToastMessage } from '../../orm/models/ToastMessageModel'
import { createdCheckout, updatedCheckout } from '../../orm/models/CheckoutModel'
import LoadingStateComponent from '../LoadingStateComponent'


const CheckoutForm = ({ location}) => {
  
  let goto = useNavigate()
  
  const dateRef = useRef()
  const timeRef = useRef()

  const dispatch = useDispatch()
  // returnOnReload()
  const cartIds = location.state?.cartItemIds;

  const checkouts = useSelector(checkoutSelector)
  console.log("echeo", cartIds)
  const { data, isLoading, isError, error, isSuccess, refetch } = useBeginItemCheckoutQuery({ cartIds: cartIds }, { refetchOnMountOrArgChange: true, forceRefetch:true })
  const [completeCheckout,{isLoading:isCompleteCheckoutLoading, isSuccess:isCompleteCheckoutSuccess, isError:isCompleteCheckoutError, isUninitialized:isCompleteCheckoutUninitialized} ] = useCompleteItemCheckoutMutation()
  const formRef = useRef(<div></div>)
  
  
  let wrapper = document.getElementById("checkout_wrapper")
  



  useEffect(() => { 
    if ((!(isCompleteCheckoutLoading || isCompleteCheckoutSuccess || isCompleteCheckoutError) && isCompleteCheckoutUninitialized) && (isSuccess && document.readyState === "complete")){
      

      wrapper ||= document.getElementById("checkout_wrapper")
      wrapper.firstElementChild.innerHTML = data
      
      document.getElementById("checkout_btn")?.classList.toggle("max-w-[40rem]")
      document.getElementById("order_details")?.classList.toggle("max-w-[45rem]")
      // document.getElementById("order_details")?.parentElement.classList.toggle("items-center")
      document.getElementById("order_details")?.parentElement.classList.toggle("greater-than-lg:max-w-max")
      const form = document.getElementById('checkout_form');
      const beginCheckoutComponent = document.querySelector("[data-component-name=BeginCheckout]")
      // console.log("beginCheckoutComponent", beginCheckoutComponent)
      const {checkoutData} = JSON.parse(beginCheckoutComponent.innerText)
      
      
      
      if (checkouts?.some((c) => c.uuid === checkoutData.orders[0].cid.split("_")[2].split("-")[1])){
        dispatch(updatedCheckout({ 
          uuid: checkoutData.orders[0].cid.split("_")[2].split("-")[1], 
          status: "CHECKED_OUT_EXPIRED"
         }))
        // console.log("refetching")
        refetch()
      }else{
        dispatch(createdCheckout({
          uuid: checkoutData.orders[0].cid.split("_")[2].split("-")[1], 
          status:"CHECKED_OUT_PENDING"
        }))

      }
      const orderId = checkoutData.orders[0].cid.split("_")[2].split("-")[1]
      const cartIds = checkoutData.orders.map((oi, x, a) => oi.cid.split("_")[1].split("-")[1]) 
      // console.log("order_id", orderId, "\ncart_ids" , cartIds)
      if (form) {
        // console.log("form loaded", orderId, cartIds)
        
        form.addEventListener('submit', (e) => handleSubmit(e, orderId, cartIds));
      }
        
      
    }
    if(isError){
      console.log("err", error)
      dispatch(createdToastMessage(
        {text: 
          {
            header:"Error",
            body:"Something happened back-stage. Refresh the page and try again."
          }, 
          status: types.TOAST_VALID , 
          type: types.TOAST_ERROR, 
          id: "checkout error"
        })
      )
    }
    return () => {
      ""
    }
  }, [isSuccess, isError, data])
    
  

  
  

  const total = Number.parseInt(location.state?.total)
  const id = location.key
  const orderedItems = location.state?.orderedItems
  const ids = location.state?.cartItemIds
  const storeName = location.state?.storeName
  const deliveryPrice = 200
  const nextId = useSelector(getNextId('Order'))

  async function handleSubmit(event, orderId=1, cartIds=2) {
    event.preventDefault();
    
    // console.log("submit")

    // Your existing handleSubmit logic
    // return alert(`You searched for '${orderId, cartIds}'`);
    let formData = new FormData(document.forms['checkout_form']);
    let orderData = {}
    
    formData.forEach((k, v, idx) => {
      const camelize = (str) => 
        str.toString()
            .toLowerCase()
            .split("_")
            .map((el, x) => 
              x !== 0 ? 
              [el.slice(0, 1)[0].toUpperCase(), el.slice(1)].join("") 
              : el)
            .join("")
      const deCamelize = (str) => str.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase()
      if (["orderCost", "deliveryCost", "totalCost"].every(i => i !== deCamelize(k))) {
        orderData[deCamelize(v)] = k
      }
    })

    const status = "ORDERED_COMPLETE"

    let finalOrderData;
    finalOrderData= {
      order : {
        items:{
          ...orderData,
          "order_status": status
        }
        
      }
    }
    const base = 'http://127.0.0.1:5000/api/v1'
    const url = '/checkout/orders/' + orderId + '/complete_checkout'
    const {data, error} = await completeCheckout({initialOrderItem:finalOrderData, orderId: orderId, cartId: cartIds  })
    // console.log("d", data, error)
    const importedNode = document.createElement("div")
    importedNode.innerHTML = data||error
    // console.log("importedNode", importedNode)
    wrapper.firstElementChild.replaceWith(importedNode)
    // setTimeout(() => {
    //   goto("/history")  
    // }, 500);
  };
 
  
  const CheckoutForm = ({})=> (
    <>
      <div id="date_time" className="py-2 text-lg font-raleway lining-nums tabular-nums " >
        <p className="text-md font-semibold ">{tags.checkout.orderWhenText}</p> 
      </div>
      <div id="delivery_date_time__wrapper" className="w-auto  flex less-than-xs:flex-wrap  gap-4">
        <div id="date" className="max-w-[9rem] flex flex-col justify-center border-b-[1px] border-b-gray-300">
          <label htmlFor="delivery_date" className="w-0 h-0"></label>
          <input id="d_date" className=" appearance-none focus:outline-none " form="checkout_form" type="text" name="delivery_date" placeholder="Выберите дату"  ref={dateRef} onFocus={() => (dateRef.current.type = "date")} onBlur={() => (dateRef.current.type = "text")} required  ></input>
        </div>
        <div id="time" className="max-w-[9rem] flex flex-col justify-center border-b-[1px] border-b-gray-300 ">
          <label htmlFor="delivery_time" className="w-0 h-0"></label>
          <input id="d_time" className="  w-full  px-2 focus:outline-none"  form="checkout_form"  type="text" name="delivery_time" placeholder="Выберите время" ref={timeRef} onFocus={() => (timeRef.current.type = "time")} onBlur={() => (timeRef.current.type = "text")} required ></input>
        </div>
      </div>
      <div id="address__wrapper" className="less-than-xs:min-w-[8rem] min-w-[15rem] py-2 flex flex-col justify-center font-raleway lining-nums tabular-nums ">
        <label htmlFor="delivery_address" className="text-md font-semibold">{tags.checkout.orderToWhereText+"?"}</label>
        <div className="h-[2.5rem] px-2 flex items-center gap-1 border-[1px] border-gray-300 rounded-3xl">
          <LocationIco />
          <input id="d_addr" className=" max-w-[314px] w-full  px-2 focus:outline-none" form="checkout_form" type="text" name="delivery_address"  placeholder="Выберите адрес доставки" required />
        </div>
      </div>
      <div id="name__wrapper" className="less-than-xs:min-w-[8rem] min-w-[15rem]  py-2 flex flex-col justify-center font-raleway lining-nums tabular-nums ">
        <label htmlFor="receiver_name" className="text-md font-semibold">{tags.checkout.receiverNameText}</label>
        <div className="h-[2.5rem] px-2 flex items-center gap-1 border-[1px] border-gray-300 rounded-3xl">
          <input id="rcv_name" className=" max-w-[314px] w-full  px-2 focus:outline-none" form="checkout_form" type="text" name="receiver" required />
        </div>
      </div>
      <div id="phone__wrapper" className="less-than-xs:min-w-[8rem] min-w-[15rem] py-2 flex flex-col justify-center font-raleway lining-nums tabular-nums ">
        <label htmlFor="receiver_phone" className=" text-md font-semibold">{tags.checkout.phoneText}</label>
        <div className="h-[2.5rem] px-2 flex items-center gap-1 border-[1px] border-gray-300 rounded-3xl">
          <input id="rcv_phone" className=" max-w-[314px] w-full  px-2 focus:outline-none" form="checkout_form" type="text" name="receiver_phone" required />
        </div>
      </div>
    </>
  )
  
  const CheckoutOrder = ({ children}) =>(
    <div className=" mt-14 w-full flex flex-col justify-center gap-6 lg:p-4 lining-nums tabular-nums">
      <div id="order_details" className="w-auto p-2 lg:p-4 flex flex-col justify-start md:justify-center lg:justify-center xl:justify-center items-center gap-4 border-[1px] border-[#F0F4FB] bg-[#F0F4FB] rounded-3xl">
        
        <div id="order_items" className="w-full flex flex-col items-start text-black dark:text-white  text-base">
          <p className="p-2 w-full flex flex-start text-lg text-[#727280]">
            {"Ordered Items:"}
          </p>
          {orderedItems?.map((oi,x)=>
            <div key={x} className="w-full less-than-xs:child:max-w-full  less-than-xs:child:justify-between">
              <ProductDescriptor id={`${oi.productId}${x}`} label={<NameTag modelName={"Product"} item={{ id: oi.productId, prop: "     x" + oi.quantity }} />} values={[tags.currencyType + Number.parseInt(oi.price*oi.quantity)]} />

            </div>
            )
          }
          <span className={"dotted-div my-2 px-2 w-full h-[1px] text-slate-400 overflow-hidden clear-right text-clip bg-repeat-x"} style={setTextBg(".")} >
          </span>
        </div>
        
        <div id="order_cost__wrapper" className="w-full   py-1 px-2 flex  sm:flex-row  md:flex-row  lg:flex-row xl:flex-row justify-between md:justify-between lg:justify-between xl:justify-between  items-center text-lg text-[#727280]  font-raleway lining-nums tabular-nums  ">
          <label htmlFor="order_cost">
            {tags.checkout.totalPriceText+":"}
          </label>
          <input id="o_cost" className=" w-auto max-w-[8rem] flex justify-start  md:justify-end lg:justify-end xl:justify-end text-xl bg-transparent text-end lining-nums tabular-nums" name="order_cost" form="checkout_form" type="text" value={tags.currencyType + (total || 0)} readOnly required  />
        </div>

        <div id="delivery_cost__wrapper" className="w-full  py-1 px-2 flex  sm:flex-row  md:flex-row  lg:flex-row xl:flex-row justify-between md:justify-between lg:justify-between xl:justify-between items-center text-lg text-[#727280] font-raleway lining-nums tabular-nums  ">
          <label className="" htmlFor="delivery_cost">
            {tags.checkout.deliveryCostText+":"}
          </label>
          <input id="d_cost" className="max-w-[8rem] flex justify-start  md:justify-end lg:justify-end xl:justify-end  bg-transparent text-end lining-nums tabular-nums" name="delivery_cost" form="checkout_form" type="text" value={tags.currencyType + (deliveryPrice || 0)} readOnly required />
        </div>

        <div id="total_cost__wrapper" className="w-full  px-2 flex  sm:flex-row  md:flex-row  lg:flex-row xl:flex-row justify-between md:justify-between lg:justify-between xl:justify-between items-center text-xl text-[#727280] font-raleway lining-nums tabular-nums  font-medium ">
          <label className="bg-transparent" htmlFor="total_cost">
            {tags.checkout.sumTotalText+":"}
          </label>
          <input id="t_cost" className="max-w-[8rem] flex justify-start  md:justify-end lg:justify-end xl:justify-end  bg-transparent text-black dark:text-white  font-bold text-end lining-nums tabular-nums" name="total_cost" form="checkout_form" type="text" value={tags.currencyType + (total 
          + deliveryPrice)} readOnly required />
        </div>

      </div>
      
      <input type="submit" form="checkout_form" id="checkout_btn" value={tags.checkout.checkoutBtnText} className="w-auto p-3 flex justify-center  items-center border-[1px] border-orange-600 bg-orange-600 active:bg-orange-400 rounded-3xl active: text-2xl text-white dark:text-black  font-raleway lining-nums tabular-nums  font-normal cursor-pointer" required/>
    </div>
  )
  if(isLoading){
    return (
      <div className="w-full h-full mt-4 p-4 flex flex-col justify-center items-center">
        <div className="text-lg text-orange-400 ">
          Getting your order ready...
        </div>
        <LoadingStateComponent/>
      </div>
    )
  
  }
  return (
    <div id="checkout_wrapper" className="w-full px-2">
      <div className="hot_swappable"></div>
    </div>
  )
}

export default CheckoutForm
