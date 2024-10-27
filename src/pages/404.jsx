import React, { Suspense } from 'react'
import { EmbeddedProducts, NoItems } from '../components'
import { Link } from 'react-router-dom'
import img404 from '../assets/tests/jsonServer/img/placeholders/404_3.png';
  
const NoRoute = () => {
  
  const FourZeroFour = ({ children }) => {
    // console.log("prods matching", searchTextArr )
    return (
        <div className="no-route-wrapper relative w-full h-max flex flex-col">
          <p className='flex flex-col items-center text-orange-500 text-lg font-raleway font-bold'>
            <img src={img404} className='w-96' alt="404" />
            <span>
              Did you wonder too far?
            </span>
          </p>
          <NoItems mainText={<p><span>Perhaps you look on our</span> <Link to={"/"} className='text-blue-500'>main page</Link></p>} subText="We couldn't find what you are looking for"/>
            
        </div>
    )
  }
  return (
      <Suspense fallback={<NoItems />}>
        <div className="search-wrapper relative flex flex-col">
          <FourZeroFour/>
          <EmbeddedProducts title={"Products You May Like"} tagname={"suggested-products"}/>
        </div>
      </Suspense>
  )
}

export default NoRoute