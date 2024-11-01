import React, { Suspense, memo, useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Cart, NoItems } from '../components'
// import { titleTagTypes as tags } from "./icons";

import { filteredCartItemsFromModel } from '../orm/selectors'
import types from '../orm/actions/actionTypes'
import { useGetShoppingCartQuery } from '../js/middleware/queryHandler'
import { createdToastMessage } from '../orm/models/ToastMessageModel'
import { useLocation, useNavigate } from 'react-router-dom'
import { titleTagTypes as tags } from '../components/icons'
import { AttributeWatcher, ClassWatcher } from '../utilities/classWatcher'
import { getUnorderedCartItems, getUnorderedCartItemsV2, getOrderedCartItems, getOrderedCartItemsV2 } from '../orm/selectors'




const ShoppingCart = () => {
    const goto = useNavigate()
    // recieve the state
  
    const unOrderedItems = useSelector(getUnorderedCartItemsV2);
    const orderedItems = useSelector(getOrderedCartItemsV2);
    const useVariable = (initialValue) => {
      const ref = useRef(initialValue);
      const get = useCallback(() => ref.current, []);
      const set = useCallback((newValue) => (ref.current = newValue), []);
      return [get, set];
    };
    
    const [getCheckedItem, setCheckedItem] = useVariable([])
    
    const addCheckedItems=({setter=(i)=>"", item, rootElement})=>{
      rootElement ||= document.getElementById("cart_container")

      const checkedItems = item ? [item] : rootElement.querySelectorAll('input[type="checkbox"]:not(:disabled):checked.select-item')
      const cartItemIds = []
      checkedItems.forEach((item) => {
        cartItemIds.push(item.id.split('_')[2])
      })
      // console.log("cartItemIds", cartItemIds);
      setter ? setter(cartItemIds) : setCheckedItem(cartItemIds)

    }
    const handleSetCheckedItems = (e, rootElement) => {
      e?.preventDefault()
     
      addCheckedItems({setter:setCheckedItem, rootElement});
      // console.log('test cartItemIds', getCheckedItem())

    }
    const handleCheckedItems = (e,singleCheckedItemId) => {
      e.preventDefault()
      // const cart = document.getElementById("cart_container")

      // const checkedItems = cart.querySelectorAll('input[type="checkbox"]:not(:disabled):checked.select-item')
      // const cartItemIds = []
      // checkedItems.forEach((item) => {
      //   cartItemIds.push(item.id)
      // })
      // setCheckedItem( checkedItems)
      console.log("getSods", getCheckedItem());
      goto("/checkout", { state: { from: "/cart", cartItemIds: (singleCheckedItemId ? [singleCheckedItemId] : getCheckedItem()) } })
    }

    const handleSelectStore = (e, id) => {
      // e.preventDefault()

      const cart = document.getElementById("cart_container")


      const store = cart.querySelector("#" + id).parentElement
      const storeItems = store.querySelectorAll('input[type="checkbox"]:not(:disabled).select-item');
      e.target.checked ? e.target.setAttribute("checked", "") : e.target.removeAttribute("checked");
      storeItems.forEach((item) => {
        item.checked = e.target.checked
      });
      // handleSetCheckedItems(e, store)

    }

    const handleSelectAll = (e) => {
      // e.preventDefault()

      const cart = document.getElementById("cart_container")

      const allItems = cart.querySelectorAll('input[type="checkbox"]:not(:disabled)');
      e.target.checked ? e.target.setAttribute("checked","") : e.target.removeAttribute("checked");
      allItems.forEach((item) => {
        item.checked = e.target.checked
      });
      // handleSetCheckedItems(e)

    }
    
     
  const TotalBuy = ({list, exclude})=>{
      const [idList, setIdList] = useState([])
     
      // console.log("idList", idList);
      const checkedItems = {
        current: list?.filter(store => store.orders.some(oi => idList?.includes(oi.uuid)))?.map(store => ({ ...store, orders: store.orders.filter(oi => idList.includes(oi.uuid)) })) || ["empty"]
      }//useRef()
     
      const addUp = (x) => x.map((orderItem) => {
        return (orderItem.product?.price * orderItem.itemCount)
      }).reduce((a, b) => parseFloat(a) + parseFloat(b))
      const checkoutTotal = (list) => {
        if (!list.length || !idList.length) return 0
        
        return checkedItems.current?.map((store, x) => {
          store.currentCummulativeTotal = addUp(store.orders)
          return store.currentCummulativeTotal
        })?.reduce((a, b) => parseFloat(a) + parseFloat(b))//.toFixed(1)
      }

      useEffect(() => {
        if (document.readyState === "complete") {
          const selectAllInput = document.querySelector("input#select_all");
          const selectStoreInputs = document.querySelectorAll(".select-store input");
          const selectSingleInputs = document.querySelectorAll(".select-item");

          const singleWatchers = []
          selectSingleInputs.forEach((singleInput) => {
            const localParent = document.getElementById(singleInput.id.split("_")[2]);
            
            const singleWatcher = new AttributeWatcher(
              singleInput,
              "checked",
              () => {
                // console.log("addCallback called")
                addCheckedItems({
                  setter:(arr)=>(
                    setIdList((prev) => [...prev, ...arr])
                  ),
                  item: singleInput,
                  rootElement: localParent.parentElement
                })
              },
              () => {
                // console.log("removeCallback called")
                setIdList((prev) => prev.filter((id) => id !== singleInput.id.split('_')[2]));
              }
            );
            singleWatchers.push(singleWatcher)
          })
          const storeWatchers = []
          selectStoreInputs.forEach((storeInput) => {
            const storeId = storeInput.id;
            const storeItemsIds = Array.from(storeInput.parentElement.parentElement.parentElement.querySelectorAll('input[type="checkbox"]:not(:disabled).select-item')).map(inp => inp.id.split('_')[2]);
            
            const storeWatcher = new AttributeWatcher(
              storeInput,
              "checked",
              () => {
                // console.log("addCallback called")
                addCheckedItems({
                  setter:(arr)=>(
                    setIdList((prev) => [...prev, ...arr])
                  ),
                  rootElement: document.getElementById("store_" + storeInput.nextElementSibling.innerText)
                })
              },
              () => {
                // console.log("removeCallback called")
                setIdList((prev) => prev.filter((id) => !storeItemsIds.includes(id)));
              }
            );
            storeWatchers.push(storeWatcher)
            
          })
          // console.log("watching", selectAllInput);
          const allWatcher = new AttributeWatcher(
            selectAllInput,
            "checked",
            () => {
              // console.log("addCallback called")
              addCheckedItems({setter:setIdList})
              // console.log("idList", idList)
            },
            () => {
              // console.log("removeCallback called")
              setIdList([])
            }
          );

          return () => {
            allWatcher?.disconnect();
            storeWatchers.forEach((storeWatcher) => {
              storeWatcher?.disconnect();
            })
            singleWatchers.forEach((singleWatcher) => {
              singleWatcher?.disconnect();
            })
          }
        }
      }, [])
      
    // console.log('test checkedItems', checkedItems)
    const CheckoutBtn = () => (
      <button id="Checkout_btn"
        onClick={(e) => handleCheckedItems(e)}
        disabled={!checkedItems.current.length}
        className={" less-than-xs:w-[5rem] less-than-xs:h-[1rem] w-[7rem] h-[2.1rem] md:w-[10rem] md:h-[2.5rem] lg:w-[10rem] lg:h-[2.5rem] xl:w-[10rem] xl:h-[2.5rem] px-8 py-3 disabled:bg-slate-400 bg-orange-600 active:bg-orange-500 disabled:border-none disabled:opacity-90 disabled:pointer-events-none border-[1px] border-orange-600  flex justify-center items-center rounded-lg text-base greater-than-md:text-xl text-white dark:text-black  font-medium"}
      >
        {"Checkout"}

      </button>
    )
    const CartHeaderTotal = () => (
      <div className='w-full greater-than-md:hidden flex gap-4 items-baseline'>
        <p
          className=" less-than-xs:text-base text-lg whitespace-nowrap">
          {tags.cart.totalInCartTag}:
        </p>
        <p
          className=" text-orange-600 less-than-xs:text-base text-lg font-bold">
          {tags.currencyType + checkoutTotal(list)}
        </p>

        <CheckoutBtn  />
      </div>
    )
    const CartTotalCard = () =>(
      <div className="hidden w-full max-w-sm h-max mt-10 p-2 greater-than-md:flex flex-col justify-between items-end gap-1 border rounded-lg bg-orange-400">

        {
          checkedItems.current.map((store, x) => (
            <div key={x} className="total-buy w-full flex flex-col">
              {/* <h2 className="text-2xl font-bold">{store.storeName}</h2> */}
              <div className="flex flex-col">
                {
                  store.orders.map((order, x) => (
                    <div key={x} className="flex flex-row justify-between ">
                      <p className='first:text-lg first:font-medium'>{order.product?.name}</p>
                      <p>{order.itemCount} x {order.product?.price}</p>
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
    )
    if(exclude.header){
      return(
        <div className={"total-buy-card hidden greater-than-md:flex w-full max-w-sm  flex-col items-center"}>
          <CartTotalCard />
        </div>
      )
    }
    if(exclude.card){
      return (
        <div className={"total-buy-header greater-than-md:hidden w-full max-w-sm  flex flex-col items-center"}>
          <CartHeaderTotal />
        </div>
      )
    }
    
  }

  return (
    <>
      <Suspense fallback={<NoItems />}>
        <div className="ShoppingCart-wrapper flex flex-row gap-x-2 ">
          
          <Cart
            unOrd={unOrderedItems} ord={orderedItems} handleCheckedItems={handleCheckedItems} 
            handleSelectAll={handleSelectAll} 
            handleSelectStore={handleSelectStore}
            setRef={handleSetCheckedItems} 
            TotalBuy={<TotalBuy list={unOrderedItems}  exclude={{"card":true}} />}
          /> 
          <TotalBuy exclude={{"header":true}} list={unOrderedItems}  />
        </div>
      </Suspense>
    </>
  )
}

export default ShoppingCart
