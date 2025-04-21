import React, { Suspense } from 'react'
import { useSelector } from 'react-redux'
import { NoItems, OrderHistory } from '../components'
import { filteredOrdersFromModel, filteredOrdersFromModelV2 } from '../orm/selectors'

const History = () => {
  const itemsOrdered = useSelector(filteredOrdersFromModelV2())
  // console.log("itemsOrdered", itemsOrdered)
  return (
    <Suspense fallback={<NoItems />}>
      <OrderHistory itemsOrdered={itemsOrdered} listStyle={"grid"}  /> 
    </Suspense>
  )
}

export default History