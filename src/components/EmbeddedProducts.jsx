import React, { useEffect } from 'react'
import Product from './ProductCardVertical'
import { ArrowLeft, ArrowRight } from './icons'
import { useDispatch, useSelector } from "react-redux"
import { filteredProductsFromModelV2 } from "../orm/selectors"
import { useGetEmbeddedProductsQuery, useGetProductQuery, useGetProductsQuery, useLazyGetEmbeddedProductsQuery, useLazyGetProductQuery } from '../js/middleware/queryHandler'
import { createdToastMessage } from '../orm/models/ToastMessageModel'
import types from '../orm/actions/actionTypes'

const EmbeddedProducts = ({title, tagname, productId}) => {
  
  const ProductGrid =({products, handleScroll})=>{
    let topHalf = [];
    let bottomHalf = [];

    if(products[0]?.type === "loading"){

    }else{

      const halfs = [
        products.filter((i, x) => x + 1 <= (Number.parseInt(products.length / 2))), 
        products.filter((i, x) => x + 1 > (Number.parseInt(products.length / 2)))
      ];
      topHalf = halfs[0];
      bottomHalf = halfs[1];
      // console.log(topHalf)
    }

    return(
      <>
        <div onClick={(e) => handleScroll(e, true)} className="click-left absolute left-0 top-[56%] py-4 px-0 min-w-[28px] w-max h-max flex justify-center items-center bg-white z-[5] active:bg-gray-800 border-2 rounded-r-3xl opacity-90 ">
          <ArrowLeft />
        </div>
        <div onClick={(e) => handleScroll(e)} className="click-right absolute right-0 top-[56%] py-4 px-0 min-w-[28px] w-max h-max flex justify-center items-center bg-white z-[5] active:bg-gray-800 border-2 rounded-l-3xl opacity-90 ">
          <ArrowRight />
        </div>
        <div className={tagname+"-grid py-2 px-1 w-full flex flex-col  gap-12 overflow-scroll tag "}>
          <>
            <div slot={0} className="scroll-div-1 less-than-sm:flex grid  grid-cols-[repeat(auto-fit,minmax(auto,12rem))] gap-8">
              {
                products[0]?.type !== "loading" ?
                  topHalf.map((i, x) => (<Product key={x} id={i.uuid} product={i} minW={11} />))
                  :
                  <>
                    {
                      new Array(6).fill().map((i, x) => <Product key={x} noPrd={"true"} />)
                    }

                  </>


              }
            </div>
            <div className="scroll-div-2 less-than-sm:flex grid grid-cols-[repeat(auto-fit,minmax(auto,12rem))] gap-8">
              {
                products[0]?.type !== "loading"?
                  bottomHalf.map((i,x) => (<Product key={x} id={i.uuid} product={i} minW={11} />))
                  :
                  <>
                    {
                      new Array(6).fill().map((i, x) => <Product key={x} noPrd={"true"} />)
                    }

                  </>
                  
                
              }
            </div>
          </>

        </div>
      </>
    )
  }

  const ProductSpecificEmbbed = ({productId}) => {
    /**
   * recommended products -> most ordered products limit 10 
   * similar products -> same category limit 10
   * buy together -> filter by products ordered with this one
   **/
    const dispatch = useDispatch()
    let products;
    const [getProduct,{ data, isLoading, isSuccess, isError, error }] = useLazyGetProductQuery()
    if (isLoading) {
      products = [{ type: "loading" }]
    } else if (isSuccess) {
      // console.log("", data)
      products = data
    } else if (isError) {
      dispatch(createdToastMessage({ status: types.TOAST_VALID, text: { header: "Error", body: error.data.error }, type: types.TOAST_ERROR, id: "loading error" }))
      // console.log(error)
      products = false//[{ noProd: error.data.error }]

    }
    const handleScroll = (e, reverse) => {
      e.preventDefault();
      e.stopPropagation();
      const div1 = document.querySelector("." + tagname + "-grid .scroll-div-1")
      const childs = div1.childNodes

      let s = reverse
        ? (Number.parseInt(div1.slot) < 1
          ? 0
          : (Number.parseInt(div1.slot) - 2) < 0
            ? 0
            : Number.parseInt(div1.slot) - 2
        )
        : (Number.parseInt(div1.slot) > childs.length - 1)
          ? childs.length - 1
          : (Number.parseInt(div1.slot) + 2) > childs.length - 1
            ? Number.parseInt(div1.slot) + 1
            : Number.parseInt(div1.slot) + 2


      // console.log('drag tso scroll', s)
      if (s === 0 || s === childs.length) return 0
      const nthChild = childs[s]

      div1.slot = s
      nthChild.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center"
      })
    }

    useEffect(() => {
      if(document.readyState === "complete" && productId && !products){
        getProduct({
          productId,
          queries: `filters[${title.toLocaleLowerCase().replaceAll(" ", "_")}]=1`
        }, true)
      }
      return () => {
        ""
      }
    }, [products])
    
    return (
      <>
        {
          products?.length ?
            <div className={tagname + "-wrapper relative w-full pt-10 px-2 flex flex-col gap-4 "}>
              <p className="title py-2 text-2xl font-[arial font-bold ">{title}</p>
              <div className="products-wrapper  w-full flex flex-row border-y-2">
                <ProductGrid products={products} handleScroll={handleScroll} />
              </div>
            </div>
            : <></>
        }
      </>
    )
  }

  const NonProductSpecificEmbedd =() =>{
    /**
   * recommended products -> most ordered products limit 10 
   * similar products -> same category limit 10
   * buy together -> filter by products ordered with this one
   **/
    const dispatch = useDispatch()
    let products;
    
      const [getEmbeddedProducts, { data, isLoading, isSuccess, isError, error }] = useLazyGetEmbeddedProductsQuery()
    
    if (isLoading) {
      products = [{ type: "loading" }]
    } else if (isSuccess) {
      console.log("", data)
      products = data
    } else if (isError && error?.name !== "AbortError") {
      console.log(error)
      dispatch(createdToastMessage({ 
        status: types.TOAST_VALID, 
        text: { header: "Error", body: (error.data?.error || error) }, 
        type: types.TOAST_ERROR, 
        id: "loading error" 
      }))
      products = false//[{ noProd: error.data.error }]
    }
    const handleScroll = (e, reverse) => {
      e.preventDefault();
      e.stopPropagation();
      const div1 = document.querySelector("." + tagname + "-grid .scroll-div-1")
      const childs = div1.childNodes

      let s = reverse
        ? (Number.parseInt(div1.slot) < 1
          ? 0
          : (Number.parseInt(div1.slot) - 2) < 0
            ? 0
            : Number.parseInt(div1.slot) - 2
        )
        : (Number.parseInt(div1.slot) > childs.length - 1)
          ? childs.length - 1
          : (Number.parseInt(div1.slot) + 2) > childs.length - 1
            ? Number.parseInt(div1.slot) + 1
            : Number.parseInt(div1.slot) + 2


      // console.log('drag tso scroll', s)
      if (s === 0 || s === childs.length) return 0
      const nthChild = childs[s]

      div1.slot = s
      nthChild.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center"
      })
    }

    useEffect(() => {
      const t_out = setTimeout(() => {

        getEmbeddedProducts(
          "filters[" + title.toLocaleLowerCase().replaceAll(" ", "_") + "]=1", true)

      }, 5000)
    
      return () => {
       clearTimeout(t_out)
      }
    }, [])
    
    return(
      <>
       { 
        products?.length?
            <div className={tagname + "-wrapper relative w-full pt-10 px-2 flex flex-col gap-4 "}>
              <p className="title py-2 text-2xl font-[arial font-bold ">{title}</p>
              <div className="products-wrapper  w-full flex flex-row border-y-2">
                <ProductGrid products={products} handleScroll={handleScroll} />
              </div>
            </div>
        : <></>
        }
      </>
    )
  }
  return (
    <>
      {
        productId ? 
          <ProductSpecificEmbbed productId={productId} /> 
        : <NonProductSpecificEmbedd />
      }
    </>
    
  )
}

export default EmbeddedProducts