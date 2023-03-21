import React, { Suspense } from 'react'
import { useSelector } from 'react-redux'
import { Product,CategoryTag, NoItems, Sidebar } from '../components'
import { filteredProductsFromModel, categories } from '../orm/selectors';
import { titleTagTypes as tags } from '../assets';
const Main = () => {
    let cats = useSelector(categories)
    let products = useSelector(filteredProductsFromModel([]))
    const hScroll=(e)=>{
      e.preventDefault()
      // console.log(e)
      // e.target.offsetParent.classList.toggle("pointer-event-none")
    }
  const bigScreens = "grid-cols-[repeat(auto-fit,minmax(14rem,1fr))] gap-8"
  const smallScreens = "grid-cols-[repeat(auto-fit,minmax(auto,8rem))] gap-2"
  const MainContent =({children})=>(
    <div id="main" className="w-auto min-h-[76rem] h-auto  flex first:flex-col justify-between">
      <div id="mainbar_container_wrapper" className=" w-full  h-auto overflow-y-auto gap-1 scrollbar">
        {children}

      </div>
      <div id="sidebar_container" className="hidden lg:flex lg:w-auto lg:max-w-[24rem] xl:flex xl:w-auto xl:max-w-[24rem] border-l-2 child:mx-2 ">
        <Sidebar />
      </div>
    </div>
  )
  const ProductContent = ()=>(
    <div id="products_list" className="w-full flex flex-col gap-6">
      <div className="product-category-tags">
        <div id="products_list__header" className="m-3 w-auto flex  flex-col md:flex-row lg:flex-row xl:flex-row justify-start gap-2  items-baseline ">
          <h3 className=" text-2xl text-black  font-raleway font-[700]">{tags.home.categoriesText}</h3>
        </div>
        <div id="product_tags" className=" w-auto  flex flex-row flex-nowrap overflow-x-hidden" >
          <CategoryTag borderId={'type_clear'} text={'clear'} />
          <div onMouseEnter={(e) => hScroll(e)} onMouseLeave={(e) => hScroll(e)} className="scrollable_product_tags mr-2  w-max  flex flex-row overflow-x-scroll overflow-y-hidden tag">
            {

              cats.map((tag, idx) => {
                return <CategoryTag key={idx} borderId={tag.id % 6 || 3} id={tag.id} text={tag.name} />
              })

            }
          </div>

        </div>
      </div>

      <div id="mainbar__content" className={"w-auto h-[rem] p-2 grid grid-flow-row-dense less-than-xs:grid-cols-[repeat(auto-fit,minmax(auto,8rem))] greater-than-xs:grid-cols-[repeat(auto-fit,minmax(auto,12rem))] greater-than-sm:grid-cols-[repeat(auto-fit,minmax(12rem,14rem))] overflow-x-scroll scroll-smooth justify-center  transition-all  tag gap-2 greater-than-xs:gap-6"}>
        {
          products.length
            ? products.map((i) => (<Product key={i.id} product={i} isSearchOrMain={true} />))
            : <>
              {
                new Array(6).fill().map((i, x) => <Product key={x} noPrd={"true"} />)
              }
              {/* <NoItems /> */}

            </>
        }
      </div>
    </div>
  )
  
  return (
    <>
      <Suspense fallback={<NoItems />}>
        <MainContent>
          <ProductContent/>
        </MainContent>
      </Suspense>
    </>
    
  )
}

export default Main