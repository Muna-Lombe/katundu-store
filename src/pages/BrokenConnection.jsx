import React, { Suspense } from 'react'
import brokenPipe from '../assets/tests/jsonServer/img/placeholders/brokenPipe.gif';


const BrokenConnection = () => {
  
  const FourZeroFour = ({ children }) => {

    return (
        <div className="broken-connection-wrapper py-14 w-full h-max flex flex-col">
          <p className='flex flex-col items-center text-orange-500 text-lg font-raleway font-bold'>
            <span className='text-2xl'>
              The connection seems broken...
            </span>
            <img src={brokenPipe} className='w-80' alt="404" />
            <span>
              Try refreshing the page in a few minutes.
            </span>
          </p>            
        </div>
    )
  }
  return (
     
        <div className="search-wrapper relative flex flex-col justify-center items-center">
          <FourZeroFour/>
        </div>
     
  )
}

export default BrokenConnection;