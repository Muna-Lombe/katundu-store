import React from 'react';

const PaymentSettings = ({updatePaymentSettings, data}) => (
  <div className="mt-10 divide-y divide-gray-200">
    <div className="space-y-1">
      <h3 className="text-lg leading-6 font-medium text-gray-900">Payment Methods</h3>
      <p className="max-w-2xl text-sm text-gray-500">
        Manage your payment methods.
      </p>
    </div>
    <div className="mt-6">
      <dl className="divide-y divide-gray-200">
        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt className="text-sm font-medium text-gray-500">Credit Card</dt>
          <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            <form id="payement-card-update-form" name="payement-update-form" action="#" onSubmit={(e)=>updatePaymentSettings(e)} className='w-full flex justify-between items-center'>
              <div className="payment-field h-[36px] relative flex flex-row flex-nowrap w-full max-w-[60%]  rounded-md border-0 p-0.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-none focus:z-10 focus:ring-2 focus:ring-inset focus:ring-orange-600 indent-2 sm:text-sm sm:leading-6">
                <input form="payment-card-update-form"
                  id="update-payment-card"
                  name="update-payment-card"
                  type="text"
               
                  pattern={/^4[0-9]{12}(?:[0-9]{3})?$/}
                  className="w-full px-2 appearance-none"
                  placeholder={"Visa ending in 4242"}
            
                />
               

              </div>
              <span className="ml-4 flex-shrink-0">
                <button type="submit" className="bg-white rounded-md font-medium text-orange-600 hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                  Update
                </button>
              </span>
            </form>
         
          </dd>
        </div>
        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt className="text-sm font-medium text-gray-500">PayPal</dt>
          <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            <form id="payement-email-update-form" name="payement-update-form" action="#" onSubmit={(e) => updatePaymentSettings(e)} className='w-full flex justify-between items-center'>
              <div className="payment-field h-[36px] relative flex flex-row flex-nowrap w-full max-w-[60%]  rounded-md border-0 p-0.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-none focus:z-10 focus:ring-2 focus:ring-inset focus:ring-orange-600 indent-2 sm:text-sm sm:leading-6">
                <input form="payment-email-update-form"
                  id="update-payment-email"
                  name="update-payment-email"
                  type="text"

                  pattern={/^4[0-9]{12}(?:[0-9]{3})?$/}
                  className="w-full px-2 appearance-none"
                  placeholder={"example@email.com"}

                />


              </div>
              <span className="ml-4 flex-shrink-0">
                <button type="submit" className="bg-white rounded-md font-medium text-orange-600 hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                  Update
                </button>
              </span>
            </form>
          </dd>
        </div>
      </dl>
    </div>
  </div>
)

export default PaymentSettings;
