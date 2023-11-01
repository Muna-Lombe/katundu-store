import { useEffect, useState } from "react"
import { InfoIco, calcDisc, titleTagTypes as tags } from "../assets"
import { ClassWatcher } from "../orm/utilities/classWatcher"

const PriceTag = ({ tagFor, original, discount = false, onlyPrice, prodVars}) => {
  
  const [currPriceTag, setCurrPriceTag] = useState({oldPrice:original})
  
  const setDisc = (oldPrice, disc) => {
    if (disc) return {discounted: calcDisc(oldPrice, discount), oldPrice }
    return { oldPrice }
  }


  const getPriceId = () => {
    const activePrice = document.querySelector(".variation-image.product-variation-active")
    // console.log("activePrice", activePrice )
    return Number.parseInt(activePrice.id.split("_")[1])
  }
  
  const prodInStok = () => {
    const curStok = prodVars?.find(v => v.id === getPriceId()).stock
    const inStok = curStok > 0
    return inStok
  }
  
  useEffect(() => {
    if(currPriceTag.oldPrice === undefined){
      setCurrPriceTag({oldPrice:original})
    }
    const currPrice = document.querySelector(("."+tagFor))
    let watcher
    currPrice?.childNodes.forEach((child, x) => {
      watcher = new ClassWatcher(
        child, 
        "product-variation-active", 
        () => {
          setCurrPriceTag(
            setDisc(
              (prodInStok() ? Number.parseInt(child.innerText) : -1), discount
            )
          )
        }, 
        () => "");
    })
    return () => {
      watcher?.disconnect()
    }
  }, [])
 
  return (
    <div className="price-tag my-2 ">
      <div className="price-details  py-2 flex flex-row flex-wrap justify-start  gap-2 items-baseline">
        <p className={"main-price " + (onlyPrice ? "" : " less-than-sm:text-3xl text-4xl ")+" text-orange-500 font-raleway lining-nums tabular-nums  font-medium"}>
          {
            currPriceTag?.oldPrice === -1
            ? <span className="w-full bg-white ">----</span>
            : discount
                ? tags.currencyType +(currPriceTag.discounted|| setDisc(original,discount).discounted) 
                : tags.currencyType +(currPriceTag.oldPrice || original)
          }
        </p>
        {
          discount
          ?
            <p className={"disc-price " + (onlyPrice ? "text-[80%]" : " less-than-sm:text-lg text-xl ")+" text-slate-400 text font-raleway lining-nums tabular-nums  font-medium line-through"}>
              {
                currPriceTag?.oldPrice === -1
                  ? <span className="w-full bg-white text-white"></span>
                : tags.currencyType +(currPriceTag.oldPrice || original )
              }
            </p>
          :""
        }
      </div>
      {
        onlyPrice
        ? ""
        :  discount 
          ?
            <p className="price-note w-full container  px-2  flex flex-row whitespace-normal justify-start items-center  gap-1 text-orange-400 rounded-xl  font-raleway lining-nums tabular-nums  font-medium text-base less-than-xs:child:text-sm">
              {
                currPriceTag?.oldPrice === -1
                  ? <span className="w-full bg-white text-white">""</span>
                  : 
                  <>
                    <span className="w-auto less-than-xs:hidden">
                      {tags.currencyType+(((currPriceTag.oldPrice || original) - (currPriceTag.discounted)) || setDisc(original, discount).discounted-10).toFixed(2)} {" less if paying with a Katundu card"}
                    </span>
                    <span className="w-auto  greater-than-xs:hidden">
                      {" Paying with a Katundu card?"}
                    </span>
                    <span className=' w-4 h-max py-[2px] flex rounded-lg hover:stroke-white  text-white text-[12px] leading-3  cursor-pointer'>
                      <InfoIco />
                    </span>
                  </>
              }
            </p>
          : ""
      }
    </div>
  )
}
export default PriceTag;