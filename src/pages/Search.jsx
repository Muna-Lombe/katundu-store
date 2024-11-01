import React, { Suspense, useEffect } from 'react'
import { EmbeddedProducts, FilterSearchResults, LoadingStateComponent, NoItems, ProductCardVertical, ProductCardHorizontal } from '../components'
import { Link, Outlet, useParams, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { filteredProductsFromModelV2, productsMatchingSearchV2 } from '../orm/selectors'
import { searchedProductTextArr } from '../js/slices/products/productsSlice'
import { useLazySearchForProductsQuery, useSearchForProductsQuery } from '../js/middleware/queryHandler'
import { createdToastMessage } from '../orm/models/ToastMessageModel'
import types from '../orm/actions/actionTypes'

const Search = () => {
  
  const SearchResults = ({ children }) => {
    const searchTextArr = JSON.parse(useSearchParams()[0].get('query'))
    console.log("prods matching", searchTextArr )
    // const [searchFor, { data, isLoading, isSuccess, isError }] = useLazySearchForProductsQuery();
    const { data, isLoading, isSuccess, isError } = useSearchForProductsQuery({getFilters:{"all":1}, searchString: (searchTextArr[0].length>0 ? searchTextArr : null) });
    let products = [];
    let filters = {};
    const dispatch = useDispatch();
    const loadMoreRef = React.useRef();
    // console.log("products", products)
    const bigScreens = "grid-rows-[repeat(auto-fit,minmax(14rem,1fr))] gap-8"
    const smallScreens = "grid-rows-[repeat(auto-fit,minmax(auto-fill,12rem))] gap-2"
    
    
    // useEffect(() => {
    //   if(searchTextArr?.length>0){
    //     searchFor({searchString:searchTextArr||null})
    //   }
    
    //   return () => {
    //     console.log("cleaned up")
    //   }
    // }, [searchTextArr])
    
    if(isSuccess){
      products = data.searchResults
      filters = data.searchFilters
      console.log("products", products)
    }
    if(isError){
        dispatch(createdToastMessage(
          {
            text:
            {
              header: "Error",
              body: "Something happened back-stage. Refresh the page and try again."
            },
            status: types.TOAST_VALID,
            type: types.TOAST_ERROR,
            id: "checkout error"
          })
        )
    }

    


    return (
        <div className="search-filter-wrapper relative w-full h-max flex flex-col md:flex-row">
              {
                products.length > 0 
                  ? <>
                     
                      <FilterSearchResults queryText={searchTextArr} searchFilters={filters} hasProducts={products.length}/>
                     
                      {
                        isLoading ?
                            <div id="load-more-products">
                                <LoadingStateComponent forwardRef={loadMoreRef} />
                            </div>

                          : <div className="search-results">
                          
                              <div id="search__content" className={"horizontal less-than-xs:hidden greater-than-lg:hidden p-2 w-full flex flex-col overflow-x-clip scroll-smooth gap-[38px] justify-center  transition-all  tag"}>
                                  {products.map((i) => 
                                    <ProductCardHorizontal key={i.uuid}  product={i} isSearchOrMain/>
                                  )}
                              </div>
                              <div id="search__content" className={"vertical hidden  less-than-xs:flex greater-than-lg:flex p-2 w-full flex-row overflow-x-clip scroll-smooth gap-[38px] justify-center  transition-all  tag"}>
                                {products.map((i) =>
                                  <ProductCardVertical key={i.uuid} product={i} isSearchOrMain />
                                )}
                              </div>
                            </div>
                      }
                      
                    
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
          <EmbeddedProducts title={"Products You May Like"} tagname={"suggested-products"}/>
        </div>
      </Suspense>
  )
}

export default Search