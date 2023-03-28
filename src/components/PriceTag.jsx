import { useEffect, useState } from "react"
import { InfoIco, calcDisc, titleTagTypes as tags } from "../assets"
import { ClassWatcher } from "../orm/utilities/classWatcher"

const PriceTag = ({tagFor,original, discount=false, onlyPrice }) => {
  const [currPriceTag, setCurrPriceTag] = useState({oldPrice:original})
  const setDisc = (oldPrice, disc) => {
    if (disc) return {discounted: calcDisc(oldPrice, discount), oldPrice }
    return { oldPrice }
  }
  useEffect(() => {
    const currPrice = document.querySelector(("."+tagFor))
    let watcher
    currPrice?.childNodes.forEach((c, x) => {
      watcher = new ClassWatcher(c, "product-active", () => setCurrPriceTag(setDisc(Number.parseInt(c.innerText), discount)), () => "");

      // c.addEventListener()
    })
    return () => {
      watcher.disconnect()
    }
  }, [])
  return (
    <div className="price-tag my-2">
      <div className="price-details  py-2 flex flex-row flex-wrap justify-start  gap-2 items-baseline">
        <p className={"main-price " + (onlyPrice ? "" : " less-than-sm:text-3xl text-4xl ")+" text-orange-500 font-raleway lining-nums tabular-nums  font-medium"}>
          {
            discount
              ? tags.currencyType +(currPriceTag.discounted|| setDisc(original,discount).discounted) 
              : tags.currencyType +(currPriceTag.oldPrice || original)
          }
        </p>
        {
          discount
          ?
            <p className={"disc-price " + (onlyPrice ? "text-[80%]" : " less-than-sm:text-lg text-xl ")+" text-slate-400 text font-raleway lining-nums tabular-nums  font-medium line-through"}>
              {tags.currencyType +(currPriceTag.oldPrice || original )}
            </p>
          :""
        }
      </div>
      {
        onlyPrice
        ? ""
        :  discount 
          ?
            <p className="price-note w-full  px-2  flex flex-row whitespace-nowrap justify-start items-center  gap-1 text-orange-400 rounded-xl  font-raleway lining-nums tabular-nums  font-medium text-base less-than-xs:child:text-sm">
              <span className="w-auto less-than-xs:hidden">
                {tags.currencyType+(((currPriceTag.oldPrice || original) - (currPriceTag.discounted)) || setDisc(original, discount).discounted-10).toFixed(2)} {" less if paying with a Katundu card"}
              </span>
              <span className="w-auto  greater-than-xs:hidden">
                {" Paying with a Katundu card?"}
              </span>
              <span className=' w-4 h-max py-[2px] flex rounded-lg hover:stroke-white  text-white text-[12px] leading-3  cursor-pointer'>
                <InfoIco />
              </span>
            </p>
          : ""
      }
    </div>
  )
}
export default PriceTag;