import React, { Suspense, useEffect } from 'react'
import { CheckoutForm, NoItems } from '../components'
import { Outlet } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router-dom'

const Checkout = () => {
  const location = useLocation()
  const goto = useNavigate()

  useEffect(() => {
    // console.log("path", location)
    if (location?.state?.from !== "/cart") {
      goto("/cart")
    }

    return () => {

    }
  }, [])

  return (
    <>
      <Suspense fallback={<NoItems />}>
        <CheckoutForm location={location} />
        {/* <Outlet /> */}
      </Suspense>
    </>
  )
}

export default Checkout