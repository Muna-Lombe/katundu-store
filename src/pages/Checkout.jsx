import React, { Suspense } from 'react'
import { CheckoutForm, NoItems } from '../components'
import { Outlet } from 'react-router-dom'

const Checkout = () => {
  return (
    <>
      <Suspense fallback={<NoItems />}>
        <CheckoutForm />
        {/* <Outlet /> */}
      </Suspense>
    </>
  )
}

export default Checkout