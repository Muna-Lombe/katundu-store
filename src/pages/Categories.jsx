import React, { Suspense, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ProductCardVertical,CategoryTag, NoItems, Sidebar, LoadingStateComponent } from '../components'
import { filteredProductsFromModelV2, categories, categoriesV2 } from '../orm/selectors';
import { titleTagTypes as tags } from '../components/icons';
import { useGetCatalogItemProductsQuery, useGetCatalogItemQuery, useGetCatalogQuery, useLazyGetCatalogItemProductsQuery } from '../js/middleware/queryHandler';
import { createdToastMessage } from '../orm/models/ToastMessageModel';
import types from '../orm/actions/actionTypes';
const Categories = () => {
  // const [ activeCategoryId, setActiveCategoryId] = useState(1)
  const dispatch = useDispatch()
  let catalog = useSelector(categoriesV2)

  
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
  const CategorySectionProducts = ({categoryId})=>{
    
    const {data: categoryProductsData, isLoading: categoryProductsLoading, isSuccess: categoryProductsSuccess, isError: isCategoryProductsError, error: categoryProductsError } = useGetCatalogItemProductsQuery(categoryId)

    let products;

    if (categoryProductsSuccess) {
      products = categoryProductsData
      console.log("categoryProductsData", categoryProductsData)
    }
    if (categoryProductsLoading) {
      products = false
      return <LoadingStateComponent/>
    } else if (isCategoryProductsError) {
      products = false
      dispatch(createdToastMessage({ status: types.TOAST_VALID, text: { header: "Error", body: categoryProductsError.data.error }, type: types.TOAST_ERROR, id:"loading error"}))
    }
    return(
      <div className={"section_products w-full h-full  p-2 grid grid-flow-row-dense  grid-cols-[repeat(auto-fit,minmax(auto,8rem))] greater-than-md:grid-cols-[repeat(auto-fit,minmax(auto,14rem))]  greater-than-lg:grid-cols-[repeat(5,minmax(auto,14rem))] justify-center  transition-all  tag gap-3 greater-than-xs:gap-6"}>
        {

          products?.length
            ? products?.map((i) => (
              <ProductCardVertical key={i.id} product={i} isSearchOrMain={true} />
            ))
            : <>
              {
                new Array(6).fill().map((i, x) => <ProductCardVertical key={x} noPrd={"true"} />)
              }
              {/* <NoItems /> */}

            </>

        }
      </div>
    )
  }
  const CategorySection = ({category, children})=>{
    
    const { data: categoryData, isLoading: categoryLoading, isSuccess: categorySuccess, isError: isCategoryError, error: categoryError } = useGetCatalogItemQuery(category?.uuid)

    
    // products = category?.products || []
    if (categoryLoading || !category?.uuid) {
      
      return <LoadingStateComponent/>
    } else if (categorySuccess) {
      // console.log("categoryData", categoryData)
      
    } else if (categoryError) {
      dispatch(createdToastMessage({ status: types.TOAST_VALID, text: { header: "Error", body: categoryError.data.error }, type: types.TOAST_ERROR, id:"loading error"}))
    }

    // console.log(products)

    return(
      <section id={"product-section-"+category?.uuid} className="category_product_section w-full h-full max-h-min">
        {
          category?.uuid ?
            <CategorySectionProducts categoryId={category?.uuid}/>
          : <LoadingStateComponent/>
        }
      </section>
    )
  }

  const CategorySections = (activeCategory)=>{
    const [sections, setSections] = useState([])

    const addSection=(e)=>{
      console.log("addSection")
    }

    const triggerOnScrollSectionBottom=(e)=>{
      console.log("triggerOnScrollSectionBottom")
    }

    useEffect(()=>{
      if (sections.length > 1){
        addSection()
      }
      return () => {
        // setSections([])
      }
    },[sections])
    return(
      <div id='sectioned_products-sections' className=" sectioned_products-sections w-full h-full flex flex-col max-h-screen overflow-y-scroll scroll-smooth scrollbar " onScroll={triggerOnScrollSectionBottom}>
        <CategorySection category={activeCategory}/>
      </div>
    )
  }
  const ProductContent = ({catalog})=>{
    return(
      <div id="products_list" className="relative w-full flex less-than-xs:flex-col flex-row gap-6">
        <div className="product-category-tags sticky">
        
          <div id="product_tags" className=" w-full  max-w-xs flex less-than-sm:flex-row flex-col flex-nowrap overflow-x-hidden" >          
            <div id="scrollable_product_tags" className="scrollable_product_tags  w-full min-h-[40rem]  flex less-than-xs:flex-row greater-than-xs:max-w-[250px]  flex-col less-than-xs:overflow-x-scroll less-than-xs:overflow-y-hidden 
            shadow-slate-600 gap-2  tag bg-orange-400 rounded-lg">
              {
                catalog.length && catalog.every(c=>c.uuid)?
                  catalog?.map((tag, idx) => {
                    return <CategoryTag key={idx} borderId={0} id={tag.id} text={tag.name} tag={tag} />
                  })
                : <></>
              }
            </div>

        </div>
      </div>
      
      <div className="sectioned_products w-full h-full flex flex-col max-h-screen overflow-y-scroll scroll-smooth scrollbar ">
      
        <CategorySection category={catalog.find(c=>c.active)}/>
        
      </div>
    </div>
    )
  }
  
  return (
    <>
      <Suspense fallback={<NoItems />}>
        <MainContent>
          <div id="products_list__header" className="m-3 w-auto flex  flex-col md:flex-row lg:flex-row xl:flex-row justify-start gap-2  items-baseline ">
            <h3 className=" text-2xl text-black dark:text-white   font-raleway lining-nums tabular-nums  font-[700]">
              {tags.home.categoriesText}
            </h3>
          </div>
          <ProductContent catalog={catalog}/>
        </MainContent>
      </Suspense>
    </>
    
  )
}

export default Categories