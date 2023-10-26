import { useEffect } from "react"
import { imagepath, no_img_path } from "../assets/images"
import PriceTag from "./PriceTag"
import BuyBtns from "./BuyBtns"
import { BasketIco } from "../assets"
import { useParams } from "react-router-dom"
import { filteredProductsFromModel } from "../orm/selectors"
import { useSelector } from "react-redux"

const ProductMinified = ({children, productMini})=> {
    const  id = useParams().id || 2001
  const productItem = useSelector(filteredProductsFromModel([])).find
  (i=> i.id.toString() === id.toString())
  productMini = productItem
    const textStyle = {
      maxWidth: '100%',
      display: '-webkit-box',
      WebkitBoxOrient: 'vertical',
      WebkitLineClamp: 2,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    }
    const changeOnScroll =()=>{
      const showProdPage = document.getElementById("product-minified")
      const toggleProductMini = (e) => {
        e.preventDefault()
        const scrollTop = e.target.scrollingElement.scrollTop
        showProdPage.classList.replace("flex","hidden")
        if(scrollTop > 0){
          showProdPage.classList.replace("hidden", "flex")
        }
        
        // document.querySelector(".product-minified").classList.toggle("hidden")
        return (()=>
          window.removeEventListener("scroll", toggleProductMini)
        )
      }
      window.addEventListener("scroll", toggleProductMini)
    }
    useEffect(() => {
      // console.log("jsdhffdalfj")
      changeOnScroll()
    })

    return (
    
      <div id= "product-minified" className ="product-minified-wrapper hidden sticky top-[18%] right-0 w-full justify-between items-center  bg-white border border-y-orange-400 z-50">
              <div className="minified-nav-back">
                {children}
              </div>
              < div className ="product-minified px-2 flex flex-row justify-end items-center gap-2">
                <div className="product-minified-img">
                  <img src={imagepath(productMini?.images[0].image_url) || no_img_path} alt="" className="w-[60px] aspect-square object-cover" />
                </div>
                <div className="product-minified-product-name overflow-clip less-than-xs:text-xs text-base text-ellipsis">
                  <span style={textStyle}>{productMini?.name}</span>
                </div>
                <div className="product-minified-product-price child:m-0 less-than-xs:text-xs  text-[16px]">
                    <PriceTag tagFor={"product-variations"} original={productMini?.priceRange.sort((a, b) => b - a).at(-1)} discount={productMini?.isDiscounted[0] ? productMini?.isDiscounted[1] : false} onlyPrice={true} />
                </div>
                <div className="product-minified-buy-btn child:p-2 h-[180%]  border rounded-md child:appearance-none child:w-max child:h-max child:text-sm child:font-semibold">
                  <BuyBtns id={productMini?.id} onlyBtn>
                    <BasketIco />
                  </BuyBtns>
                </div>
              </div>
              
            </div>
    )
  }
  export default ProductMinified;