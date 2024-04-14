import { Suspense, useEffect, useRef } from "react"
import { imagepath, no_img_path } from "../assets/images"
import PriceTag from "./PriceTag"
import BuyBtns from "./buttons/BuyBtns"
import { BasketIco } from "./icons"
import { useParams, useLocation } from "react-router-dom"
import { filteredProductsFromModel } from "../orm/selectors"
import { useSelector } from "react-redux"
import randomizer from "../js/utils/randomizer"

const ProductMinified = ({children, productItem})=> {
  const idFromLoc = useLocation().pathname?.split("/")?.at(-1)
  const  id = useParams().id || idFromLoc || 2001
  let stickyRef = useRef(0);
  // const productItem = useSelector(filteredProductsFromModel([])).find
  // (i=> i.id.toString() === id.toString())
  
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
      const miniProd = document.getElementById("product-minified")
      const mainBarNav = document.getElementById("mainbar_nav")
      const showProdNav = document.getElementById("showProd_nav")
      const crumbs = showProdNav.firstChild
      const updateStickyPos = () => {
        // const mainBarNav = document.getElementById("mainbar_nav");
        // const miniProd = document.getElementById("product-minified");
        miniProd.style.top = `${mainBarNav.offsetHeight}px`;
        // let [a,b] = [parseInt(mainBarNav.clientHeight), parseInt((mainBarNav.clientHeight/mainBarNav.parentElement.clientHeight*100).toFixed(0))]
        // // console.log(typeof a, typeof b)
        // let c = a-100
        // let top = miniProd.classList.item(3)
        //   miniProd.classList.replace(top, "top-["+c+"px"+"]")
      };

      showProdNav.insertAdjacentElement("beforeend", miniProd);

      const toggleProductMini = (e) => {
        e.preventDefault()
        const scrollTop = e.target.scrollingElement.scrollTop
        
        
        if(scrollTop > 0){
          showProdNav.children[1].classList.replace("hidden", "flex")
          // crumbs.classList.replace("flex","hidden")
           
          updateStickyPos()
          // mainBarNav.insertAdjacentElement("beforeend",miniProd)
        }else{

          // crumbs.classList.replace("hidden","flex")
          showProdNav.children[1].classList.replace("flex","hidden")
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
          <div id= "product-minified" className ={"product-minified-wrapper hidden fixed top-0 right-0 w-full justify-between items-center  bg-white dark:bg-slate-800 dark:text-white border border-y-orange-400 z-50"}>
              <div className="minified-nav-back">
                {children}
              </div>
              < div className ="product-minified px-2 flex flex-row justify-end items-center gap-2">
                <div className="product-minified-img">
                  <img src={"https://placehold.co/600x400/orange/"+randomizer(["black","white","gray","red"]) } alt="" className="w-[60px] aspect-square object-contain" />
                </div>
                <div className="product-minified-product-name-price flex less-than-sm:flex-col justify-center items-baseline less-than-sm:items-end gap-x-2">
                  <div className="product-minified-product-name overflow-clip less-than-xs:text-xs text-base text-ellipsis">
                    <span style={textStyle}>{productItem?.name}</span>
                  </div>
                  <div className="product-minified-product-price child:my-0 less-than-xs:text-xs  text-[16px]">
                      <PriceTag 
                        tagFor={"product-variations"} 
                        original={productItem?.oldPrice}//priceRange.sort((a, b) => b - a).at(-1)} 
                        discount={productItem?.discountTag ? productItem?.newPrice :false }//isDiscounted[0] ? productItem?.isDiscounted[1] : false} 
                        onlyPrice={true} 
                        prodVars={productItem?.variations.map(v=>({id:v.uuid, stock:v.stock}))}
                      />
                  </div>
                </div>
                
                <div className="product-minified-buy-btn child:p-2 h-[180%]  border rounded-md child:appearance-none child:w-max child:h-max child:text-sm child:font-semibold">
                  <BuyBtns id={productItem?.uuid} prodVars={productItem?.variations.map(v=>({id:v.uuid, stock:v.stock}))} onlyBtn>
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