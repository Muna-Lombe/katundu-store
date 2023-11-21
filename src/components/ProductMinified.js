import { Suspense, useEffect } from "react"
import { imagepath, no_img_path } from "../assets/images"
import PriceTag from "./PriceTag"
import BuyBtns from "./BuyBtns"
import { BasketIco } from "../assets"
import { useParams, useLocation } from "react-router-dom"
import { filteredProductsFromModel } from "../orm/selectors"
import { useSelector } from "react-redux"
import randomizer from "../js/utils/randomizer"

const ProductMinified = ({children, productItem})=> {
  const idFromLoc = useLocation().pathname?.split("/")?.at(-1)
  const  id = useParams().id || idFromLoc || 2001
  // const productItem = useSelector(filteredProductsFromModel([])).find
  (i=> i.id.toString() === id.toString())
  
  // console.log("navprod", productItem)
    const textStyle = {
      maxWidth: '100%',
      display: '-webkit-box',
      WebkitBoxOrient: 'vertical',
      WebkitLineClamp: 2,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    }

    const changeOnScroll =()=>{
      const minProd = document.getElementById("product-minified")
      const mainBarNav = document.getElementById("mainbar_nav")
      const showProdNav = document.getElementById("showProd_nav")
      const toggleProductMini = (e) => {
        e.preventDefault()
        const scrollTop = e.target.scrollingElement.scrollTop
        // crumbs.classList.replace("hidden","flex")
        minProd.classList.replace("flex","hidden")
        showProdNav.insertAdjacentElement("beforeend", minProd)
        if(scrollTop > 0){
          // crumbs.classList.replace("flex","hidden")
          minProd.classList.replace("hidden", "flex")
          mainBarNav.insertAdjacentElement("beforeend",minProd)
        }
        
        // document.querySelector(".product-minified").classList.toggle("hidden")
        return (()=>
          window.removeEventListener("scroll", toggleProductMini)
        )
      }
      window.addEventListener("scroll", toggleProductMini)
    }

    useEffect(() => {
      changeOnScroll()
    })

    return (
      <>
        <Suspense fallback={<p>loafing...</p>}>
          <div id= "product-minified" className ="product-minified-wrapper hidden sticky top-[18%] right-0 w-full justify-between items-center  bg-white border border-y-orange-400 z-50">
              <div className="minified-nav-back">
                {children}
              </div>
              < div className ="product-minified px-2 flex flex-row justify-end items-center gap-2">
                <div className="product-minified-img">
                  <img src={"https://placehold.co/600x400/orange/"+randomizer(["black","white","gray","red"]) } alt="" className="w-[60px] aspect-square object-cover" />
                </div>
                <div className="product-minified-product-name overflow-clip less-than-xs:text-xs text-base text-ellipsis">
                  <span style={textStyle}>{productItem?.name}</span>
                </div>
                <div className="product-minified-product-price child:m-0 less-than-xs:text-xs  text-[16px]">
                    <PriceTag 
                      tagFor={"product-variations"} 
                      original={productItem?.priceRange.sort((a, b) => b - a).at(-1)} 
                      discount={productItem?.isDiscounted[0] ? productItem?.isDiscounted[1] : false} 
                      onlyPrice={true} 
                      prodVars={productItem?.variations.map(v=>({id:v.id, stock:v.stock}))}
                    />
                </div>
                <div className="product-minified-buy-btn child:p-2 h-[180%]  border rounded-md child:appearance-none child:w-max child:h-max child:text-sm child:font-semibold">
                  <BuyBtns id={productItem?.id} prodVars={productItem?.variations.map(v=>({id:v.id, stock:v.stock}))} onlyBtn>
                    <BasketIco />
                  </BuyBtns>
                </div>
              </div>
              
            </div>
          
            
          </Suspense>
      </>
    )
  }
  export default ProductMinified;