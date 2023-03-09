import React, { Suspense } from 'react'
import { useSelector } from 'react-redux'
import { Login, NoItems, OrderHistory } from '../components'
import { filteredOrdersFromModel } from '../orm/selectors'

const History = () => {
  const itemsOrdered = useSelector(filteredOrdersFromModel())
  // console.log(itemsOrdered)
  return (
    <Suspense fallback={<NoItems />}>
      <OrderHistory itemsOrdered={itemsOrdered}  /> 
      {/* <Login/> */}
    </Suspense>
  )
}

export default History