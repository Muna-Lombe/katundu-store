import { Suspense, useEffect, } from "react";
import { ArrowLeft,  PinIco } from "../assets";
import { filteredProductsFromModel } from "../orm/selectors";
import { useSelector } from "react-redux";
import { Link,useParams, useLocation, } from "react-router-dom";
import { BuyBtns, ContentDescription, ContentDetails, ContentPayment, ContentSpecification, ContentViewer, Courier, DiscountInfo, EmbeddedProducts, Faqs, FullProductCharacteristics, FullProductDescription, Logo, NoItems, OrderInfo,  PaymentType, PickupPoints, PinLocation, PriceTag, ProductDescriptor, ProductImageViewer, ProductSpecificationDetail, ProductTags,  ReviewsAndQuestions } from "../components";
import { imagepath, no_img_path } from "../assets/images";


const ShowProduct = ()=>{
  const  id = useParams().id || 2001
  const productItem = useSelector(filteredProductsFromModel([])).find(i=> i.id.toString() === id.toString())
  // console.log("show", product)
  // const navigate = useLocation()
  const location = useLocation()

  const handleClassToggle=(e, setActive)=>{
    e.preventDefault()
    const curElem = e.target;
    const nearElem = curElem.previousSibling ? curElem.previousSibling : curElem.nextSibling;
    
    if(!curElem.classList.contains("active")){
      // toggle curElem
      
      // set active tab
      setActive(curElem.classList[0])
  
      // toggle active
      curElem.classList.toggle("active")
      // toggle in new border base
      curElem.classList.toggle("border-b-2")
      // toggle out old border base
      curElem.classList.toggle("border-b-[1px]")
      // toggle border color
      curElem.classList.toggle("border-blue-500")
      
      // toggle font color
      curElem.classList.toggle("text-slate-400")
      curElem.classList.toggle("text-black")
  
      // toggle nearby sibling
  
      // toggle active
      nearElem.classList.toggle("active")
      // toggle in new border base
      nearElem.classList.toggle("border-b-[1px]")
      // toggle out old border base
      nearElem.classList.toggle("border-b-2")
      // toggle remove blue border color
      nearElem.classList.toggle("border-blue-500")
      // toggle add gray
      
  
      // toggle font color
      nearElem.classList.toggle("text-slate-400")
      nearElem.classList.toggle("text-black")
      
  
    }
  
  }

  const descriptiveText = `Instant coffee Egoiste Platinum 100g is a premium product, which is produced using patented Swiss technology. For its preparation, only elite varieties of Arabica are used: Kenyan and Colombian. Selected grains are subjected to gentle roasting, and then turned into original instant crystals. The finished drink has a strong rich taste with light shades of fruit (this is a feature of Kenyan Arabica), invigorating aroma and delicate aftertaste with chocolate notes. Packed in a stylish glass jar with a \"crystal\" lid.`

  const descTag1 = "100% Natural Instant Freeze-Dried Coffee"
  const descTag2 = " Storage conditions, including after opening: store tightly closed in a cool, dry place without foreign odors"
  
  const BackBtn = () =>{
    const path = (location.state?.from?.includes("signin") ? "/" : -1)
    return(
      <Link to={path} className="back-btn">
        <ArrowLeft size={22}/>
      </Link>
    )
  }
  
  const ViewImageModal = ({openModal, modalAction}) => {
    
    const handleCloseModal =()=>{
      modalAction(false)
    }
    if (!openModal) return (<div className='hidden'></div>)
    return (
      <div className="modal modal-open fixed bottom-0 w-[100vw] h-[100vh] grid  place-content-center z-30 overflow-y-hidden ">
        <div className="modal-backdrop absolute w-[100%] h-[100%] top-0 left-0  bg-gray-700 opacity-70 z-40 ">
        </div>
        <div className="prd w-[100vw] h-[100vh] z-50 overflow-scroll scrollbar">
          <span slot={""} className={"w-5 h-5 self-end items-center text-sm cursor-pointer z-50"} onClick={(e) => handleCloseModal()}> ❎ </span>
          

        </div>
      </div>
    )
  }
  const RecommendedProducts = () => (<EmbeddedProducts title={"Recommended Products"} tagname="recommended-products"/>)
  const OfferedProducts = () => (<EmbeddedProducts title={"Offered Products"} tagname="offered-products" />)
  const BuyTogetherProducts = () => (<EmbeddedProducts title={"Buy Together"} tagname="buy-matching-products" />)
  const ProductMinified = ({productMini})=> {
    

    // useEffect(()=>{
    //   const showProdPage = document.querySelector(".middle")
    //   showProdPage.on
    //   return(

    //   )
    // })
    const textStyle = {
      maxWidth: '100%',
      display: '-webkit-box',
      WebkitBoxOrient: 'vertical',
      WebkitLineClamp: 2,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    }

    return (
    
        <div className="product-minified sticky top-[129px]  right-0 px-2  flex flex-row justify-end items-center gap-2 bg-white border border-y-orange-400 z-50 ">
          <div className="product-minified-img">
            <img src={imagepath(productMini?.images[0].image_url) || no_img_path} alt="" className="w-[60px] aspect-square" />
          </div>
          <div className="product-minified-product-name overflow-clip text-base text-ellipsis">
            <span style={textStyle}>{productMini?.name}</span>
          </div>
          <div className="product-minified-product-price child:m-0 text-[16px]">
            <PriceTag tagFor={"product-variations"} original={productMini?.priceRange.sort((a, b) => b - a).at(-1)} discount={productMini?.isDiscounted[0] ? productMini?.isDiscounted[1] : false} onlyPrice={true} />
          </div>
          <div className="product-minified-buy-btn px-6 child:appearance-none child:w-max child:h-max child:m-0 child:p-0 child:text-sm child:font-semibold">
            <BuyBtns id={productMini?.id} onlyBtn/>
          </div>

        </div>
    )
  }
  const MiddleSection =({children})=>{
    const NoItems = () => (
      <div 
        className="loading-product w-full  flex flex-col justify-center items-center">
        <div id="no_items_banner__header"
          className="text-base text-black font-raleway font-semibold">
          <h3>
            🙅 looks like no items here 👀
          </h3>
        </div>
        <div id="no_items_banner__footer"
          className="text-lg text-black font-raleway font-bold">
          <h3>
            😃 Waiting for products to load 😃
          </h3>
        </div>
      </div>
    )
    return (
      <div className="middle w-full flex flex-wrap border  ">
        {
          (!productItem)
          ?  <NoItems/>
            
          : children
        }
      </div>
    )
  }
  return(
    <Suspense fallback={<NoItems />} >
        <div className="show-product-page relative">
          <ProductMinified productMini={productItem} />
          <div className="top w-full flex border hide-sidebar gap-2 ">
            <BackBtn/>
            {/* <p>
              {navigate.pathname}
            </p> */}
          </div>
            <MiddleSection>
              <ContentViewer>
                <ProductImageViewer images={productItem?.images}/>
                <ContentDetails contentType={"product"} showLogo={<Logo logo={productItem?.store.name} bgColor="bg-slate-500" />} variations={productItem?.variations.map((p)=> ({...p, text:p.price}))}>
                      { productItem?.variations.map((i,x)=>
                            <ContentDescription key={x} first={x===0} id={`${i.id}`} >
                              <div className="w-full  less-than-xs:child:max-w-[330px] less-than-xs:child:justify-between">
                                <ProductDescriptor key={101} id={`${i.id}${x}`} label={"In stock"} values={[i.stock]} />
                              </div>
                              { i.properties.map((k,v)=> 
                                <div key={v} className="w-full less-than-xs:child:max-w-[330px] less-than-xs:child:flex-wrap less-than-xs:child:justify-between">
                                  <ProductDescriptor key={v} id={`${i.id}${v}`} label={k.name} values={k.values || [`${k.type}`]} />
                                </div>
                              )}
                            </ContentDescription>
                          )
                      }

                      <ContentSpecification>
                        {
                          productItem?.unitValues.map((uv,x)=><ProductSpecificationDetail key={x} label={uv.label} value={uv.value} />
                          )
                        }
                      </ContentSpecification>
                </ContentDetails >
                <ContentPayment >
                  <PriceTag tagFor={"product-variations"} original={productItem?.priceRange.sort((a, b) => b - a).at(-1)} discount={productItem?.isDiscounted[0] ? productItem?.isDiscounted[1] : false} />
                  <DiscountInfo/>
                  <BuyBtns id={productItem?.id}/>
                </ContentPayment> 
                <PaymentType >
                  <Faqs />
                  <OrderInfo>
                    <span className="order-pin py-2">
                      <PinIco />
                    </span>
                    <span className="order-pin-points">
                      <PinLocation />
                      <span className="courier-points flex flex-col font-[arial]">
                        <Courier />
                        <PickupPoints />
                      </span>
                    </span>
                  </OrderInfo> 
                </PaymentType>
              </ContentViewer>
              <RecommendedProducts/>
              <BuyTogetherProducts/>
              <OfferedProducts/>
              <FullProductDescription description={{text: descriptiveText, tags: [descTag1, descTag2] }}/>
              <FullProductCharacteristics/>
              <ProductTags/>
              <ReviewsAndQuestions handleClassToggle={handleClassToggle}/>
            </MiddleSection>
          <div className="bottom w-full border "></div>
      
            {/* <Outlet /> */}
       </div>   
          </Suspense>
    )
  
}
export default ShowProduct;