import React, { Suspense } from 'react'
import { useSelector } from 'react-redux'
import { Product,CategoryTag, NoItems, Sidebar } from '../components'
import { filteredProductsFromModel, categories } from '../orm/selectors';
import { titleTagTypes as tags } from '../assets';
const Categories = () => {
  let cats = useSelector(categories)
  let products = useSelector(filteredProductsFromModel([]))


  const scrollFn = function (event) {
    if (document.body.doScroll)
      document.body.doScroll(event.wheelDelta > 0 ? "left" : "right");
    else if ((event.wheelDelta || event.detail) > 0)
      document.body.scrollLeft -= 10;
    else
      document.body.scrollLeft += 10;

    return false;
  }
  // function (event, delta) {
  //   // document.scrollLeft += isNaN(parseInt(event.wheelDelta * 30)) ? parseInt(event.wheelDelta * 30) : 0;
  //   console.log("delter", event.wheelDelta, document.body.doScroll)
  // }
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
  const bigScreens = "grid-cols-[repeat(auto-fit,minmax(14rem,1fr))] gap-8"
  const smallScreens = "grid-cols-[repeat(auto-fit,minmax(auto,8rem))] gap-2"
  const MainContent =({children})=>(
    <div id="main" className="w-auto h-auto  flex first:flex-col justify-between">
      <div id="mainbar_container_wrapper" className=" w-full  h-auto overflow-y-auto gap-1 scrollbar">
        {children}

      </div>
      <div id="sidebar_container" className="hidden lg:flex lg:w-auto lg:max-w-[24rem] xl:flex xl:w-auto xl:max-w-[24rem] border-l-2 child:mx-2 ">
        <Sidebar />
      </div>
    </div>
  )
  const ProductSection = ({sectionId, children})=>{
    return(
      <div id={"product-section-"+sectionId} className="category_product_section w-full h-full max-h-min">
        {children}
      </div>
    )
  }
  const ProductContent = ()=>(
    <div id="products_list" className="relative w-full flex less-than-xs:flex-col flex-row gap-6">
      <div className="product-category-tags sticky">
        <div id="products_list__header" className="m-3 w-auto flex  flex-col md:flex-row lg:flex-row xl:flex-row justify-start gap-2  items-baseline ">
          <h3 className=" text-2xl text-black  font-raleway lining-nums tabular-nums  font-[700]">{tags.home.categoriesText}</h3>
        </div>
        <div id="product_tags" className=" w-auto  flex less-than-sm:flex-row flex-col flex-nowrap overflow-x-hidden" >
          {/* <CategoryTag borderId={'type_clear'} text={'clear'} /> */}
          
          <div  id="scrollable_product_tags"  className="scrollable_product_tags mr-2  w-max  flex less-than-xs:flex-row greater-than-xs:max-w-[215px]  flex-col less-than-xs:overflow-x-scroll less-than-xs:overflow-y-hidden  shadow-slate-600 gap-2  tag">
            {

              cats.map((tag, idx) => {
                return <CategoryTag key={idx} borderId={0} id={tag.id} text={tag.name} />
              })

            }
          </div>

        </div>
      </div>
      
      <div className="sectioned_products w-full h-full flex flex-col max-h-screen overflow-y-scroll scroll-smooth scrollbar ">

        {
          cats.map((tag, idx) => {
            return (
              <ProductSection sectionId={tag.id}>
                <div  className={"section_products w-full h-full  p-2 grid grid-flow-row-dense less-than-xs:grid-cols-2 less-than-sm:grid-cols-[repeat(auto-fit,minmax(auto,8rem))] greater-than-md:grid-cols-[repeat(4,minmax(auto-fill,13rem))] justify-center  transition-all  tag gap-3 greater-than-xs:gap-6"}>
                          {
                            
                            products.length
                              ? products.filter((pr) => pr.categoryIds.includes(tag.id)).map((i) => (
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
              </ProductSection>

            )

            
          })
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

export default Categories