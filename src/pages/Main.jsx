import React, { Suspense, createElement, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Product,CategoryTag, NoItems, Sidebar, HeroBanner, GridBanner, LoadingStateComponent, AdBanners } from '../components'
import { filteredProductsFromModel, categories } from '../orm/selectors';
import { popularTags, titleTagTypes as tags } from '../assets';
import { useDispatch } from 'react-redux';
import { addedProduct } from '../orm/models/ProductModel';
import { load } from '../orm/utilities/StateLoader';
import { Link, useNavigate } from 'react-router-dom';
import {useLazyGetProductsQuery } from '../js/middleware/queryHandler';
import { createdToastMessage } from '../orm/models/ToastMessageModel';
import types from '../orm/actions/actionTypes';
import { forwardRef } from 'react';



const Main = () => {

  

  const dispatch = useDispatch()

  const scrollFn = function (event) {
    if (document.body.doScroll)
      document.body.doScroll(event.wheelDelta > 0 ? "left" : "right");
    else if ((event.wheelDelta || event.detail) > 0)
      document.body.scrollLeft -= 10;
    else
      document.body.scrollLeft += 10;

    return false;
  }

  const handleSetScroll =(e)=> {
    const mainbar = document.getElementById("mainbar_container_wrapper")
    e.preventDefault()
    console.log(e.type)
    if(e.type === "mouseenter"){
     
      document.addEventListener("mousewheel", scrollFn)
      
    }
    if (e.type === "mouseleave") {
     
      document.removeEventListener("mousewheel", scrollFn)
    }
  }

  const bigScreens = "grid-cols-[repeat(auto-fit,minmax(14rem,1fr))] gap-8"
  const smallScreens = "grid-cols-[repeat(auto-fit,minmax(auto,8rem))] gap-2"
  
  const MainContent =({children})=>(
    <div id="main" className="w-auto min-h-full h-auto  flex flex-col justify-between">
      
      <div id="mainbar_container_wrapper" className="p-3 w-full flex flex-col items-center  h-auto overflow-y-auto gap-y-6 scrollbar">
        {children}

      </div>
    </div>
  )

  const PopularProdcuts=()=>{
    const cats = useSelector(categories)
    const goto = useNavigate()
    return(
    <div className="product-category-tags my-4 w-full greater-than-sm:max-w-[70%] overflow-x-clip">
       
        <div id="product_tags" className=" w-full mb-3  flex flex-row flex-nowrap justify-center indent-3 " >
          
          <div  id="scrollable_product_tags"  className="scrollable_product_tags  w-auto max-w-fit  flex flex-row flex-wrap  justify-start less-than-xs:grid gap-2 grid-flow-col grid-rows-2 overflow-scroll shadow-slate-600  tag child:m-0 child:p-2 child:text-lg  child:less-than-xs:text-xs">
            {
              popularTags.map((tag, idx) => {
                return (
                  <CategoryTag key={idx} borderId={0} tag={{id:tag.id, name:tag.text}} customFn={()=>""}>
                    <Link to={"/products/" + tag.productId} className="appearance-none  w-full  max-w-[200px] h-full max-h-[46px] px-4  bg-slate-100 border-1 border-inherit rounded-xl text-orange-600 truncate">
                      <span className="popular_tag">{tag.text}</span>
                    </Link>
                  </CategoryTag>
                )
              })

            }
          </div>

        </div>
      </div>
  )}
  const ProductsSection=({products,index, forwardRef})=>{
    // {/* grid-cols-[repeat(auto-fit,minmax(auto,7rem))] */ }
    console.log("products", products)
    return(
      < div id ={ "products-section"+index} className = { "w-full p-2 grid grid-flow-row-dense less-than-xs:grid-cols-2 greater-than-xs:grid-cols-[repeat(auto-fit,minmax(auto,12rem))] greater-than-sm:grid-cols-[repeat(auto-fit,minmax(auto,16rem))]  overflow-x-scroll scroll-smooth justify-center  transition-all  tag gap-3 greater-than-xs:gap-6"} >
        {
          !products[0].noProd
            ? products.map((i,x) => (
                (x===products.length-1 && forwardRef) ?
                  <Product key={x} product={i} forwardRef={forwardRef} isSearchOrMain = { true} />
                : <Product key= {x } product = { i }  isSearchOrMain = { true} />
              ))
            : <>
                {
                  new Array(6).fill().map((i, x) => <Product key={ x } noPrd = { products[0].noProd} />)
                }

              </>
            }
    </div>
    )
  }
  const ProductsWrapper = ()=>{
    let products = useSelector(filteredProductsFromModel([]))
    

    const [getProducts, { data, isLoading, isSuccess, isError }, {lastArg}] = useLazyGetProductsQuery()

    // console.log(products)
    const loadMoreRef = useRef(null);
    const lastProductIdRef = useRef(null);
    
    const LoadMore = ()=>{

      const handleLoadMore=()=>{
        if ((document.readyState === "complete" && lastArg === products?.at(-1)?.uuid) || !products?.at(-1)?.uuid) {
          return
        }
        
        setTimeout(() => {
          getProducts(products?.at(-1)?.uuid)
          
        }, 1000);


        // if (isSuccess) {
          
        //   dispatch(addedProduct(
        //     Array.from(
        //       Object.entries(data).values()
        //     ).map((e, x) => e[1])
        //     // data
        //   ))
        // }

        if (isError) {
          
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
        
      }
      let userHasScrolled = false;

      useEffect(() => {
        const handleScroll = () => {
          userHasScrolled = true;
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);

      
      useEffect(() => {
        const loadMoreElement = loadMoreRef.current;

        const observerOptions = {
          root: null,//document.querySelector("#mainbar_container_wrapper"),
          rootMargin: "0px",
          threshold: 1.0,
          isVisible: false
        };

        const observer = new IntersectionObserver((entries) => {
          const [entry] = entries;
          console.log("entry", entry, "scrolled?:",userHasScrolled);
          if (entry.intersectionRatio <= 0) return;
          if (entry.isIntersecting && userHasScrolled) {
            // Start scrolling when component is in view
            console.log("entry in view", entry);
            console.log("lastArg", lastArg, products?.at(-1)?.uuid)

            handleLoadMore();

          } else {
            // Stop scrolling when component is out of view
            // clearInterval(intervalRef.current);
          }
        }, observerOptions);


        if (loadMoreElement) {
          // lastProductIdRef.current = products?.at(-1)?.uuid;//loadMoreElement.id.split("_")[2]
          observer.observe(loadMoreElement);
        }

        return () => {
          if (loadMoreElement) {
            observer.unobserve(loadMoreElement);
          } 
        };
      }, []);

      return(
        <div id="load-more-products">
          {
            
            <LoadingStateComponent forwardRef={loadMoreRef}/>

          }
        </div>
           
        
      )
    }
    const chunkSize = 6;
    const chunks = [];
    for (let i = 0; i < products.length; i += chunkSize) {
      chunks.push(products.slice(i, i + chunkSize));
      if (i + chunkSize < products.length) {
        chunks.push('GridBanner');
      }
    }

    
    
    return (
      <div id="products_list" className="w-full flex flex-col items-center gap-6">
        {chunks.map((chunk, index) => {
          if (chunk === 'GridBanner') {
            return <AdBanners grid={"grid"} key={index} />;
          } else {
            return <ProductsSection key={index} index={index} products={chunk} />;
          }
        })}
        <LoadMore />
      </div>
    )
  }
  
  
  return (
    <>
      <Suspense fallback={<NoItems />}>
        <MainContent>
          <HeroBanner/>
          <PopularProdcuts/>
          <AdBanners mosaic={"mosaic"} />
          <ProductsWrapper/>
        </MainContent>
      </Suspense>
    </>
    
  )
}

export default Main