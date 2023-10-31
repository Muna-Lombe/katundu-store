import React, { Suspense, createElement, useState } from 'react'
import { useSelector } from 'react-redux'
import { Product,CategoryTag, NoItems, Sidebar, HeroBanner } from '../components'
import { filteredProductsFromModel, categories } from '../orm/selectors';
import { titleTagTypes as tags } from '../assets';
import { useDispatch } from 'react-redux';
import { addedProduct } from '../orm/models/ProductModel';
import { load } from '../orm/utilities/StateLoader';



const Main = () => {

  


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
    <div id="main" className="w-auto min-h-[76rem] h-auto  flex first:flex-col justify-between">
      <div id="mainbar_container_wrapper" className=" w-full  h-auto overflow-y-auto gap-1 scrollbar">
        {children}

      </div>
      <div id="sidebar_container" className="hidden lg:flex lg:w-auto  xl:flex xl:w-auto max-w-[19rem]  border-l-2 child:mx-2 ">
        <Sidebar />
      </div>
    </div>
  )
  const PopularProdcuts=()=>{
    let cats = useSelector(categories)
    return(
    <div className="product-category-tags w-[95%]">
        <div id="products_list__header" className="m-3 w-auto flex  flex-col md:flex-row lg:flex-row xl:flex-row justify-start gap-2  items-baseline ">
          {/* <h3 className=" text-2xl text-black  font-raleway lining-nums tabular-nums  font-[700]">{tags.home.categoriesText}</h3> */}
        </div>
        <div id="product_tags" className=" w-full mb-3  flex flex-row flex-nowrap justify-center indent-3 overflow-x-hidden" >
          
          <div  id="scrollable_product_tags"  className="scrollable_product_tags  w-full max-w-fit  flex flex-row flex-wrap justify-start less-than-xs:grid grid-flow-col grid-rows-2 overflow-scroll shadow-slate-600  tag child:m-0 child:px-0 child:less-than-xs:text-xs">
            {

              cats.map((tag, idx) => {
                return <CategoryTag key={idx} borderId={0} id={tag.id} text={tag.name} />
              })

            }
          </div>

        </div>
      </div>
  )}
  const ProductContentProducts=({products})=>{
    // {/* grid-cols-[repeat(auto-fit,minmax(auto,7rem))] */ }
    return(
      < div id = "mainbar__content" className = { "w-full h-[rem] p-2 grid grid-flow-row-dense less-than-xs:grid-cols-2 greater-than-xs:grid-cols-[repeat(auto-fit,minmax(auto,11rem))] greater-than-sm:grid-cols-[repeat(4,minmax(auto,14rem))] overflow-x-scroll scroll-smooth justify-center  transition-all  tag gap-3 greater-than-xs:gap-6"} >
        {
          products.length
            ? products.map((i) => (<Product key= { i.id } product = { i } isSearchOrMain = { true} />))
                : <>
                    {
                      new Array(6).fill().map((i, x) => <Product key={ x } noPrd = { "true"} />)
                    }

                  </>
            }
    </div>
    )
  }
  const ProductContent = ()=>{
    let products = useSelector(filteredProductsFromModel([]))
    
    const dispatch  = useDispatch()
    const handleLoadMore = ()=>{
      console.log("continuing load products from idx: ", products.at(-1));

      (async function(){
        const res = await load({ model: { modelName: "Product", dataName: "Products", range:10 }, loadmore:{fromIdx: products.at(-1).id }})
        const data = await res
        dispatch(addedProduct(
          Array.from(
            Object.entries(data).values()
            ).map((e,x)=> e[1])
            // data
        ))
      })()
    }
    return(
    <div id="products_list" className="w-full flex flex-col items-center gap-6">
      
      <ProductContentProducts products={products}/>
      <input type="button" value="Load More"   onClick={()=>handleLoadMore()} className="p-1 w-min text-base font-semibold underline underline-offset-1 text-red-500 active:text-red-600 active:animate-pulse border border-red-500 rounded-lg"/>
    </div>
  )}
  
  
  return (
    <>
      <Suspense fallback={<NoItems />}>
        <MainContent>
          <PopularProdcuts/>
          <HeroBanner/>
          <ProductContent/>
        </MainContent>
      </Suspense>
    </>
    
  )
}

export default Main