import React, { useState } from 'react';
import { EditIco } from '../icons';

const AddressSettings = ({ data = { shippingAddress: "123 Main St, Anytown, USA 12345", billingAddress: "Same as shipping"},updateAddressSettings}) => {
  const [editShippingAddress, setEditShippingAddress] = useState(false)
  const [editBillingAddress, setEditBillingAddress] = useState(false)
   return (
    <div className="mt-10 divide-y divide-gray-200">
      <div className="space-y-1">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Address</h3>
        <p className="max-w-2xl text-sm text-gray-500">
          Manage your shipping and billing addresses.
        </p>
      </div>
      <div className="mt-6">
        <dl className="divide-y divide-gray-200">
          {/* Address fields */}
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Shipping Address</dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
             
              <form id="payement-update-form" name="payement-update-form" action="#" onSubmit={(e) => updateAddressSettings(e)}>
                 <div className={"payment-field h-[36px] relative flex flex-row flex-nowrap items-center w-full  rounded-md border-0 p-0.5 text-gray-900 placeholder:text-gray-400 outline-none " + (editShippingAddress ? " ring-1 ring-inset ring-gray-300 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-orange-600" : " ")+"  indent-2 sm:text-sm sm:leading-6"}>
                  <input form="payment-update-form"
                    id="update-payment"
                    name="update-payment"
                    type="text"
                    disabled={editShippingAddress}
                    pattern={/^4[0-9]{12}(?:[0-9]{3})?$/}
                     className="appearance-none w-full px-2  "
                    placeholder={data.shippingAddress}

                  />

                  <EditIco toggle={()=> setEditShippingAddress(ps=>!ps)}/>
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
            <dt className="text-sm font-medium text-gray-500">Billing Address</dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <span className="flex-grow">Same as shipping</span>
              <span className="ml-4 flex-shrink-0">
                <button type="button" className="bg-white rounded-md font-medium text-orange-600 hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                  Update
                </button>
              </span>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}

export default AddressSettings;
