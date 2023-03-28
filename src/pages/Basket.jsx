import React, { Suspense } from 'react'
import { useSelector } from 'react-redux'
import { Cart, NoItems } from '../components'

import { filteredCartItemsFromModel } from '../orm/selectors'
import types from '../orm/actions/actionTypes'

const Basket = () => {

  // recieve the state
  const items = useSelector(filteredCartItemsFromModel()) 
  console.log("test", items)
  // convert received state to array of state
  
  // filter it by store
  const filterByStore = (ordItm) =>{
    const filteredStoreObject = Object.create(null)
      ordItm.forEach((fp)=>{
      if(filteredStoreObject[fp.product.store.name]){

        filteredStoreObject[fp.product.store.name].push(fp) 
      }else{
          filteredStoreObject[fp.product.store.name] = [fp]
      }
      
    })
    return filteredStoreObject
  }

  // seperate it by ordered and not ordered status

  const addTotalCost = (store)=>{
    if(Object.keys(store).length < 1) return []
    return Object.keys(store).map(storeName => (
          { storeName:storeName, 
            orders: store[storeName],
        currentCummulativeTotal: store[storeName].map((orderItem) => {
                            return (orderItem.product.isDiscounted? orderItem.product.isDiscounted * orderItem.productCount : orderItem.product.price * orderItem.productCount)
            }).reduce((a, b) => a + b).toFixed(1)
          })
    )
    // return { ...store, totalPrice: totalPrice }
  }

  const sortBy = (cartItems, orderStatuses) => {
    const matchingStatus = (i) => orderStatuses.some(os => os.includes(i.ItemStatus.toString()))
    const filterByStatus =([k,v])=>{
      const itm = v.filter(matchingStatus)
      if (itm.length) return [k,itm]
    } 
    const noUndefined = i => i!==undefined
    return Object.entries(cartItems).map(filterByStatus).filter(noUndefined) 
  } 

  const unOrd = addTotalCost(
                  Object.fromEntries(
                    sortBy(
                      filterByStore(
                        Object.values(items)
                      ), [types.IN_CART, types.ORDERED_PENDING]
                    )
                  )
                )
  const ord = addTotalCost(
                Object.fromEntries(
                    sortBy(
                      filterByStore(
                        Object.values(items)
                      ),[types.ORDERED_COMPLETE]
                    )
                )
              )
    
  // console.log('test items',unOrd,'\n',ord)
    return (
      <>
        <Suspense fallback={<NoItems />}>
          <Cart unOrd={unOrd} ord={ord}/>
        </Suspense>
      </>
    )
}

export default Basket