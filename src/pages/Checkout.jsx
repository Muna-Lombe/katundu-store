import React, { Suspense, useEffect, useMemo } from 'react'
import { CheckoutForm, LoadingStateComponent, NoItems } from '../components'
import { Outlet } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router-dom'
import { useBeginItemCheckoutQuery, useCompleteItemCheckoutMutation } from '../js/middleware/queryHandler'
import { getCartUuid } from '../orm/selectors'
import { useSelector } from 'react-redux'
import BrokenConnection from './BrokenConnection'




const CheckoutSuccess = () => {
  // add beautiful checkout success component
  // component should show a shopping cart exiting animation
  // component should show a message thanking the user for their purchase
  // component should show a link to the order details page
  // component should show a link to the home page
  <div className="flex flex-col items-center justify-center min-h-[50vh] p-8 text-center">
    <div className="mb-6 text-green-500">
      {/* You can replace this with a more complex animation */}
      <svg
        className="w-24 h-24 mx-auto animate-[slideOut_1s_ease-in-out]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 13l4 4L19 7"
        />
      </svg>
    </div>

    <h2 className="text-3xl font-bold mb-4 text-gray-800">
      Thank you for your purchase!
    </h2>

    <p className="text-gray-600 mb-8">
      Your order has been successfully processed.
    </p>

    <div className="space-x-4">
      <a
        href="/orders"
        className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        View Order Details
      </a>

      <a
        href="/"
        className="inline-block px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
      >
        Return Home
      </a>
    </div>
  </div>
}
const Intermediary = ({ location, goto }) => {
  const [completeCheckout, { data, isLoading, isError, isSuccess }] = useCompleteItemCheckoutMutation()

  if (isLoading) {
    return <LoadingStateComponent />
  }
  if (isError) {
    return <BrokenConnection />
  }
  if (isSuccess) {
    // console.log("data", data);
    
    setTimeout(() => {
      goto(data.order.redirectUrl)
    }, 1000)
    return <CheckoutSuccess />

  }

  // const MemoizedCheckoutForm = useMemo(() => {
  //   return <CheckoutForm location={location} goto={goto} completeCheckout={completeCheckout} />
  // }, [location, goto, completeCheckout])
  return (
    // <MemoizedCheckoutForm />
    <CheckoutForm location={location} goto={goto} completeCheckout={completeCheckout} />
  )
}

const Checkout = () => {
  const location = useLocation()
  const goto = useNavigate()

  useEffect(() => {
    // console.log("path", location)
    if (location?.state?.from !== "/cart") {
      goto("/cart")
    }

    return () => {
      ""
    }
  }, [])

 
  return (
    <>
      <Suspense fallback={<NoItems />}>
        <Intermediary location={location} goto={goto} />
        
        {/* <Outlet /> */}
      </Suspense>
    </>
  )
}

export default Checkout