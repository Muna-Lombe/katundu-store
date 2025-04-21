import React from 'react'
import { Link } from 'react-router-dom'

const StoreCard = ({ store }) => {
  return (
    <div className="flex flex-row flex-wrap justify-between border rounded-lg p-4 w-full  text-nowrap">
      {/* Store Header */}
      <div className="flex flex-wrap items-center gap-4 mb-4">
        {/* Store Avatar */}
        <div className="hidden greater-than-md:flex w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
          <span className="text-xl font-bold text-gray-600">
            {store?.name?.charAt(0)}
          </span>
        </div>
        
        {/* Store Info */}
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="font-bold">{store.name}</h2>
            <span className="bg-blue-100 text-blue-600 text-sm px-2 py-0.5 rounded">
              {store?.premiumStatus ||"Premium Store"}
            </span>
          </div>
          
          
          {/* Rating */}
          <div className="w-full flex flex-row flex-wrap items-center gap-2">
            <Link to={`/store/${store.uuid}`} className="text-blue-600 hover:underline text-sm">
              Visit Store
            </Link>
            <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>{store?.rating || "4.9 Product Rating"}</span>
          </div>
        </div>
      </div>

      {/* Store Stats */}
      <div className="lg:grid grid-cols-1 md:flex flex-row flex-wrap  gap-4 ">
        {/* Rating */}
        <div className="hidden items-center gap-2">
          <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span>{store?.rating ||"4.9 Product Rating"}</span>
        </div>

        {/* Delivery */}
        <div className="flex items-center gap-2 hidden">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <span>{store?.delivery ||"Katundu Delivery & Service"}</span>
        </div>

        {/* Payment */}
        <div className="flex items-center gap-2 hidden">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
          <span>Secure Online Payment</span>
        </div>

        {/* Return Policy */}
        <div className="flex items-center gap-2 hidden">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z" />
          </svg>
          <span>7-Day Returns</span>
        </div>
      </div>

      {/* Contact Button */}
      <button className=" w-full hidden  max-w-[10rem] h-10 text-base text-center justify-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
        Contact Store
      </button>
    </div>
  )
}

export default StoreCard
