import React, { Suspense, useCallback, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Cart, NoItems } from '../components'

import { filteredCartItemsFromModel } from '../orm/selectors'
import types from '../orm/actions/actionTypes'
import { useGetShoppingCartQuery } from '../js/middleware/queryHandler'
import { createdToastMessage } from '../orm/models/ToastMessageModel'
import { useLocation, useNavigate } from 'react-router-dom'


const Basket = () => {
  const goto = useNavigate()
  // recieve the state
  const cartItems = useSelector(filteredCartItemsFromModel()) 
  // let cartItem; //= useSelector(filteredProductsFromModel([]))
  // const dispatch = useDispatch()

  // if(cartItems.some((e)=> !e.product)){
  //   cartItems = []

  // }
 
  // filter it by store
  const filterByStore = (ordItm) =>{
    const filteredStoreObject = Object.create(null)
      // console.log("test ordItm",  ordItm)
      ordItm.forEach((fp)=>{
      if(filteredStoreObject[fp.product?.store.name]){

        filteredStoreObject[fp.product?.store.name].push(fp) 
      }else{
          filteredStoreObject[fp.product?.store.name] = [fp]
      }
      
    })
    return filteredStoreObject
  }

  // seperate it by ordered and not ordered status

  const addTotalCost = (store)=>{
    // console.log('test store', store)
    if(Object.keys(store).length < 1) return []
    return Object.keys(store).map(storeName => (
          { storeName:storeName, 
            orders: store[storeName],
        currentCummulativeTotal: store[storeName].map((orderItem) => {
                            return (orderItem.product?.price * orderItem.productCount )
            }).reduce((a, b) => a + b).toFixed(1)
          })
    )
    // return { ...store, totalPrice: totalPrice }
  }

  const sortBy = (cartItems, orderStatuses) => {
    // console.log('test cartItems',cartItems,'\n',orderStatuses, )
    const matchingStatus = (i) =>{ 
      return orderStatuses.some(os => {
        // console.log("match",os.includes(i.itemStatus.toString()))
        return os.includes(i.itemStatus.toString())
      })
    }
    const filterByStatus =([k,v])=>{
      const itm = v.filter(matchingStatus)
      if (itm.length) return [k,itm]
    } 
    const noUndefined = i => i!==undefined
    return Object.entries(cartItems).map(filterByStatus).filter(noUndefined) 
  } 

  const unOrd = cartItems.length ? 
                  addTotalCost(
                    Object.fromEntries(
                      sortBy(
                        filterByStore(
                          Object.values(cartItems)
                        ), [types.IN_CART, types.ORDERED_PENDING]
                      )
                    )
                  )
                  : []
    const ord = cartItems.length ? 
                  addTotalCost(
                    Object.fromEntries(
                        sortBy(
                          filterByStore(
                            Object.values(cartItems)
                          ),[types.OUT_CART,types.ORDERED_COMPLETE]
                        )
                    )
                  )
                  : []
    
    
     
    const useVariable = (initialValue) => {
      const ref = useRef(initialValue);
      const get = useCallback(() => ref.current, []);
      const set = useCallback((newValue) => (ref.current = newValue), []);
      return [get, set];
    };
    
    const [getCheckedItem, setCheckedItem] = useVariable([])

    const handleSetCheckedItems = (e) => {
      // e.preventDefault()
      const cart = document.getElementById("cart_container")

      const checkedItems = cart.querySelectorAll('input[type="checkbox"]:checked.select-item')
      const cartItemIds = []
      checkedItems.forEach((item) => {
        cartItemIds.push(item.id.split('_')[2])
      })
      setCheckedItem(cartItemIds) //[cartItems.filter(ci => cartItemIds.includes(ci.uuid)).map(uo => (
        // uo.uuid
        //   { 
          //     uuid: uo.uuid, 
          //     price: uo.product.price 
          //   }
          // ))]
      console.log('test cartItemIds', getCheckedItem(), cartItemIds)
    }
    const handleCheckedItems = (e) => {
      e.preventDefault()
      const cart = document.getElementById("cart_container")

      const checkedItems = cart.querySelectorAll('input[type="checkbox"]:not(:disabled):checked.select-item')
      const cartItemIds = []
      checkedItems.forEach((item) => {
        cartItemIds.push(item.id)
      })
      setCheckedItem( checkedItems)
      goto("/checkout", { from: "/cart", cartItemIds: getCheckedItem() })
    }

    const handleSelectStore = (e, id) => {
      // e.preventDefault()

      const cart = document.getElementById("cart_container")

      const storeItems = cart.querySelector("#" + id).parentElement.querySelectorAll('input[type="checkbox"]:not(:disabled).select-item')
      storeItems.forEach((item) => {
        item.checked = e.target.checked
      })
      handleSetCheckedItems(e)

    }

    const handleSelectAll = (e) => {
      // e.preventDefault()

      const cart = document.getElementById("cart_container")

      const allItems = cart.querySelectorAll('input[type="checkbox"]:not(:disabled)')
      allItems.forEach((item) => {
        item.checked = e.target.checked
      })
      handleSetCheckedItems(e)

    }
    

    const TotalBuy = ({list, forwardRef})=>{

      const checkedItems = useRef(list?.filter(store => store.orders.some(oi => forwardRef().includes(oi.uuid)))
      )
      const checkoutTotal = (list) => {
        if (!list.length || !forwardRef().length) return 0

        return checkedItems.current?.map((store, x) => (store.currentCummulativeTotal))?.reduce((a, b) => parseFloat(a) + parseFloat(b))//.toFixed(1)
      }
      // useEffect(() => {
      //   first
      
      //   return () => {
      //     second
      //   }
      // }, [third])
      
    console.log('test checkedItems', checkedItems)
    const CheckoutBtn = () => (
      <button id="Checkout_btn"
        onClick={(e) => "handleCheckedItems(e)"}

        className={" less-than-xs:w-[5rem] less-than-xs:h-[1rem] w-[7rem] h-[2.1rem] md:w-[10rem] md:h-[2.5rem] lg:w-[10rem] lg:h-[2.5rem] xl:w-[10rem] xl:h-[2.5rem] px-8 py-3 bg-orange-600 active:bg-orange-500 border-[1px] border-orange-600  flex justify-center items-center rounded-lg text-base greater-than-md:text-xl text-white dark:text-black  font-medium"}
      >
        {"Checkout"}

      </button>
    )
    return(
      
      checkedItems.length ? 
          <div className="hidden w-full max-w-sm h-max mt-10 p-2 greater-than-sm:flex flex-col justify-between items-end gap-1 border rounded-lg bg-orange-400">
          
          {
          checkedItems.map((store, x) => (
            <div key={x} className="w-full flex flex-col">
              {/* <h2 className="text-2xl font-bold">{store.storeName}</h2> */}
              <div className="flex flex-col">
                {
                  store.orders.map((order, x) => (
                    <div key={x} className="flex flex-row justify-between ">
                      <p className='first:text-lg first:font-medium'>{order.product?.name}</p>
                      <p>{order.productCount} x {order.product?.price}</p>
                    </div>
                  ))
                }
                <div className="flex flex-row justify-end">
                 
                  <p>{store.currentCummulativeTotal}</p>
                </div>
              </div>
              
            </div>
            
          )) 
          }
          <div className="w-full flex flex-row justify-between border-t-4 border-dashed">
            <p> Total </p>
            <p>{checkoutTotal(list)}</p>
          </div>
          <CheckoutBtn />

        </div>
      : <></>
    )
  }
  // console.log('test cartItems',unOrd,'\n',ord)
    return (
      <>
        <Suspense fallback={<NoItems />}>
          <div className="Basket-wrapper flex flex-row gap-x-2 ">
            <Cart unOrd={unOrd} ord={ord} handleCheckedItems={handleCheckedItems} handleSelectAll={handleSelectAll} handleSelectStore={handleSelectStore} setRef={handleSetCheckedItems}/> 
            <TotalBuy list={unOrd} forwardRef={getCheckedItem} />
          </div>
        </Suspense>
      </>
    )
}

export default Basket