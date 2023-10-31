import React, { Suspense } from 'react'
import { EmbeddedProducts, FilterSearchResults, NoItems, Product } from '../components'
import { Link, Outlet, useParams, useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { filteredProductsFromModel, productsMatchingSearch } from '../orm/selectors'
import { searchedProductTextArr } from '../js/slices/products/productsSlice'

const Search = () => {
  
  const SearchResults = ({ children }) => {
    const searchTextArr = JSON.parse(useSearchParams()[0].get('query'))
    // console.log("prods matching", searchTextArr )
    const products = useSelector(productsMatchingSearch(searchTextArr)) || []
    const bigScreens = "grid-cols-[repeat(auto-fit,minmax(14rem,1fr))] gap-8"
    const smallScreens = "grid-cols-[repeat(auto-fit,minmax(10rem,12rem))] gap-2"
    return (
        <div className="search-filter-wrapper relative w-full h-max flex flex-col md:flex-row">
              {
                products.length 
                  ? <>
                      <FilterSearchResults/>
                      <div id="search__content" className={"p-2 w-full  grid grid-flow-row-dense " + smallScreens + " greater-than-md:" + bigScreens +" overflow-x-clip scroll-smooth gap-[38px] justify-center  transition-all  tag"}>
                          {products.map((i) => 
                            <Product key={i.id}  product={i} isSearchOrMain/>
                          )}
                      </div>
                    
                    </>
            : <NoItems mainText={<p><span>Perhaps you look on our</span> <Link to={"/"} className='text-blue-500'>main page</Link></p>} subText="We couldn't find what you are looking for"/>
              }
        </div>
    )
  }
  return (
      <Suspense fallback={<NoItems />}>
        <div className="search-wrapper relative flex flex-col">
          <SearchResults/>
          <EmbeddedProducts title={"Product You Might Be Interested In"} tagname={"suggested-products"}/>
        </div>
      </Suspense>
  )
}

export default Search