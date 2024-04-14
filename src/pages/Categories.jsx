import React, { Suspense, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Product,CategoryTag, NoItems, Sidebar } from '../components'
import { filteredProductsFromModel, categories } from '../orm/selectors';
import { titleTagTypes as tags } from '../components/icons';
import { useGetCatalogItemQuery, useGetCatalogQuery } from '../js/middleware/queryHandler';
import { createdToastMessage } from '../orm/models/ToastMessageModel';
import types from '../orm/actions/actionTypes';
const Categories = () => {
  const [ activeCategoryId, setActiveCategoryId] = useState(1)
  const dispatch = useDispatch()
  let catalog;
  catalog = useSelector(categories)
  // const { data, isLoading, isSuccess, isError, error } = useGetCatalogQuery()
  
  
  // if (isLoading) {
  //   catalog = false 
  // } else if (isSuccess) {
  //   catalog = data?.map(d => ({ id: d.id, ...d.attributes })) || []
  // } else if (isError) {
// dispatch(createdToastMessage({status:types.TOAST_VALID, text:error.data.error, type: types.TOAST_ERROR}))
  //   catalog = false
  // }

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
      // mainbar.classList.replace("overflow-y-auto", "overflow-visible")
      document.addEventListener("mousewheel", scrollFn)
      
    }
    if (e.type === "mouseleave") {
      // mainbar.classList.replace("overflow-visible", "overflow-y-auto")
      document.removeEventListener("mousewheel", scrollFn)
    }
  }
  // const bigScreens = "grid-cols-[repeat(auto-fit,minmax(14rem,1fr))] gap-8"
  // const smallScreens = "grid-cols-[repeat(auto-fit,minmax(auto,8rem))] gap-2"
  const MainContent =({children})=>(
    <div id="main" className="w-auto h-auto  flex first:flex-col justify-between">
      <div id="mainbar_container_wrapper" className=" w-full  h-auto overflow-y-auto gap-1 scrollbar">
        {children}

      </div>
      {/* <div id="sidebar_container" className="hidden lg:flex lg:w-auto lg:max-w-[24rem] xl:flex xl:w-auto xl:max-w-[24rem] border-l-2 child:mx-2 ">
        <Sidebar />
      </div> */}
    </div>
  )
  const ProductSection = ({category, children})=>{
    const {data, isLoading, isSuccess, isError, error} = useGetCatalogItemQuery(category?.uuid)

    let products;
    // products = category?.products || []
    if (isLoading) {
      products = false 
    } else if (isSuccess) {
      console.log("", data)
      products = data[0]?.products
    } else if (isError) {
      dispatch(createdToastMessage({ status: types.TOAST_VALID, text: { header: "Error", body: error.data.error }, type: types.TOAST_ERROR, id:"loading error"}))
      products = false 
    }

    // console.log(products)

    return(
      <div id={"product-section-"+category?.uuid} className="category_product_section w-full h-full max-h-min">
        <div className={"section_products w-full h-full  p-2 grid grid-flow-row-dense  grid-cols-[repeat(auto-fit,minmax(auto,8rem))] greater-than-md:grid-cols-[repeat(auto-fit,minmax(auto,14rem))]  greater-than-lg:grid-cols-[repeat(5,minmax(auto,14rem))] justify-center  transition-all  tag gap-3 greater-than-xs:gap-6"}>
          {

            products?.length
              ? products?.map((i) => (
                <Product key={i.id} product={i} isSearchOrMain={true} />
              ))
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
  }
  const ProductContent = ()=>(
    <div id="products_list" className="relative w-full flex less-than-xs:flex-col flex-row gap-6">
      <div className="product-category-tags sticky">
        
        <div id="product_tags" className=" w-full max-w-xs flex less-than-sm:flex-row flex-col flex-nowrap overflow-x-hidden" >          
          <div  id="scrollable_product_tags"  className="scrollable_product_tags  w-full  flex less-than-xs:flex-row greater-than-xs:max-w-[250px]  flex-col less-than-xs:overflow-x-scroll less-than-xs:overflow-y-hidden 
           shadow-slate-600 gap-2  tag bg-orange-400 rounded-lg">
            {
              catalog?
                catalog?.map((tag, idx) => {
                  return <CategoryTag key={idx} borderId={0} id={tag.id} text={tag.name} tag={tag} />
                })
              : <></>

            }
          </div>

        </div>
      </div>
      
      <div className="sectioned_products w-full h-full flex flex-col max-h-screen overflow-y-scroll scroll-smooth scrollbar ">

        <ProductSection category={catalog?.find(c=>c.active)}/>
        
      </div>
    </div>
  )
  
  return (
    <>
      <Suspense fallback={<NoItems />}>
        <MainContent>
          <div id="products_list__header" className="m-3 w-auto flex  flex-col md:flex-row lg:flex-row xl:flex-row justify-start gap-2  items-baseline ">
            <h3 className=" text-2xl text-black dark:text-white   font-raleway lining-nums tabular-nums  font-[700]">
              {tags.home.categoriesText}
            </h3>
          </div>
          <ProductContent/>
        </MainContent>
      </Suspense>
    </>
    
  )
}

export default Categories