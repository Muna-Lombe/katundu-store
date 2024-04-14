import React, { Suspense } from 'react'
import { EmbeddedProducts, FilterSearchResults, NoItems, ProductCard } from '../components'
import { Link, Outlet, useParams, useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { filteredProductsFromModel, productsMatchingSearch } from '../orm/selectors'
import { searchedProductTextArr } from '../js/slices/products/productsSlice'
import img404 from '../assets/tests/jsonServer/img/placeholders/404_3.png';
import { imagepath } from '../assets/images'

const NoRoute = () => {
  
  const FourZeroFour = ({ children }) => {
    // console.log("prods matching", searchTextArr )
    const bigScreens = "grid-rows-[repeat(auto-fit,minmax(14rem,1fr))] gap-8"
    const smallScreens = "grid-rows-[repeat(auto-fit,minmax(auto-fill,12rem))] gap-2"
    return (
        <div className="no-route-wrapper relative w-full h-max flex flex-col md:flex-row">
          <p className='flex flex-col items-center text-orange-500 text-lg font-raleway font-bold'>
            <img src={img404} className='w-80' alt="404" />
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