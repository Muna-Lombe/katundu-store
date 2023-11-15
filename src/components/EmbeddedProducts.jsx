import React from 'react'
import Product from './ProductCardVertical'
import { ArrowLeft, ArrowRight } from '../assets'
import { useSelector } from "react-redux"
import { filteredProductsFromModel } from "../orm/selectors"

const EmbeddedProducts = ({title, tagname}) => {
  const products = useSelector(filteredProductsFromModel([]))//.slice(0,10)

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
  const ProductGrid =()=>(
    <>
      <div onClick={(e) => handleScroll(e, true)} className="click-left absolute left-0 top-[56%] py-4 px-0 min-w-[28px] w-max h-max flex justify-center items-center bg-white z-[5] active:bg-gray-800 border-2 rounded-r-3xl opacity-90 ">
        <ArrowLeft />
      </div>
      <div onClick={(e) => handleScroll(e)} className="click-right absolute right-0 top-[56%] py-4 px-0 min-w-[28px] w-max h-max flex justify-center items-center bg-white z-[5] active:bg-gray-800 border-2 rounded-l-3xl opacity-90 ">
        <ArrowRight />
      </div>
      <div className={tagname+"-grid py-2 px-1 w-full flex flex-col  gap-12 overflow-scroll tag "}>
        <>
          <div slot={0} className="scroll-div-1 flex flex-row gap-8">
            {
              products.filter((i, x) => x + 1 <= (Number.parseInt(products.length / 2))).map((i) => (<Product key={i.id} id={i.id} product={i} minW={11} />))
            }
          </div>
          <div className="scroll-div-2 flex flex-row gap-8">
            {
              products.filter((i, x) => x + 1 > (Number.parseInt(products.length / 2))).map((i) => (<Product key={i.id} id={i.id} product={i} minW={11} />))
            }
          </div>
        </>

      </div>
    </>
  )
  return (
    <div className={tagname + "-wrapper relative w-full pt-10 px-2 flex flex-col gap-4 "}>
      <p className="title py-2 text-2xl font-[arial font-bold ">{title}</p>
      <div className="products-wrapper  w-full flex flex-row border-y-2">
        <ProductGrid />
      </div>
    </div>
  )
}

export default EmbeddedProducts