import { Suspense, useEffect, } from "react";
import { ArrowLeft,  ArrowRight,  BasketIco,  CartIco,  PinIco, popularTags } from "../assets";
import { categories, filteredProductsFromModel } from "../orm/selectors";
import { useSelector } from "react-redux";
import { Link,useParams, useLocation, createSearchParams, } from "react-router-dom";
import { BuyBtns, ContentDescription, ContentDetails, ContentPayment, ContentSpecification, ContentViewer, Courier, DiscountInfo, EmbeddedProducts, Faqs, FullProductCharacteristics, FullProductDescription, Logo, NoItems, OrderInfo,  PaymentType, PickupPoints, PinLocation, PriceTag, ProductDescriptor, ProductImageViewer, ProductMinified, ProductSpecificationDetail, ProductTags,  ReviewsAndQuestions } from "../components";



const ShowProduct = ()=>{

  const  id = useParams().id || 2001
  const productItem = useSelector(filteredProductsFromModel([])).find(i=> i.id.toString() === id.toString())
  const cat = useSelector(categories).find(cat => cat.id === productItem?.categoryIds[0])
  const location = useLocation()

  const crumbs = [
    {path:"/",text:"Gallery"}, 
    {path:("/categories/?category="+cat?.id),text:(cat?.name.toString())}
    ||{path:"/", text:"Category/"}, (productItem?.name.slice(0, 10)+"...")
  ]


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

  // console.log("prod", productItem)
  const textStyle = {
    maxWidth: '100%',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }

  const descriptiveText = `Instant coffee Egoiste Platinum 100g is a premium product, which is produced using patented Swiss technology. For its preparation, only elite varieties of Arabica are used: Kenyan and Colombian. Selected grains are subjected to gentle roasting, and then turned into original instant crystals. The finished drink has a strong rich taste with light shades of fruit (this is a feature of Kenyan Arabica), invigorating aroma and delicate aftertaste with chocolate notes. Packed in a stylish glass jar with a "crystal" lid.`

  const descTag1 = "100% Natural Instant Freeze-Dried Coffee"
  const descTag2 = " Storage conditions, including after opening: store tightly closed in a cool, dry place without foreign odors"
  
  
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
  
  const BreadCrumbs =()=>{

    return(
      <span id="crumbs" className="crumbs flex items-center">

        {
          crumbs?.map((cr,x)=> 
          <Link to={cr.path || "/"}  key={x} className={"flex items-center text-[100%] text-center font-semibold  " + (x === crumbs.length - 1 ? "  pointer-events-none text-slate-500" : " text-orange-500 ")}>
            <span className="h-min flex items-center">
              {cr.text}
            </span>

            {
              x < crumbs.length-1
              ? <ArrowRight className="w-[20px] h-full flex items-baseline fill-slate-400"/>
              :""
            }
          </Link>)

        }
      </span>
    )
  }
  
  const Home =()=>(
    <svg fill="currentColor" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" clip-rule="evenodd" d="M11.3356 2.25259C11.7145 1.9158 12.2855 1.9158 12.6644 2.25259L21.6644 10.2526C22.0772 10.6195 22.1143 11.2516 21.7474 11.6644C21.3805 12.0771 20.7484 12.1143 20.3356 11.7474L20 11.4491V19C20 20.1046 19.1046 21 18 21H6.00001C4.89544 21 4.00001 20.1046 4.00001 19V11.4491L3.66437 11.7474C3.25159 12.1143 2.61952 12.0771 2.2526 11.6644C1.88568 11.2516 1.92286 10.6195 2.33565 10.2526L11.3356 2.25259ZM6.00001 9.67129V19H9.00001V14C9.00001 13.4477 9.44773 13 10 13H14C14.5523 13 15 13.4477 15 14V19H18V9.67129L12 4.33795L6.00001 9.67129ZM13 19V15H11V19H13Z" /> </svg>
  )
  const BackBtn = ({location}) =>{
    const path = (location?.state?.from?.includes("signin") ? "/" : -1)
    return(
      <Link to={path} className="back-btn">
        {/* <ArrowLeft size={22}/> */}
        <Home/>
      </Link>
    )
  }
 
  const MiddleSection =({children})=>{
    
    return (
      <div id="show-middle" className="middle w-full flex flex-wrap ">
        {
          (!productItem)
          ?  <NoItems/>
            
          : children
        }
      </div>
    )
  }
  const NavBack = () => (
    <div id="showProd_nav" className="top w-full flex hide-sidebar gap-2 ">
      
      <BreadCrumbs/>
      {
        productItem
        ? <ProductMinified productItem={productItem}/>
        
          
        : ""
      }
    </div>
  )
  return(
    <>
      <Suspense fallback={<NoItems />} >
            
          <div className="show-product-page relative">
              <NavBack/>
              <MiddleSection>
                <div className="product-product-name overflow-clip  text-xl text-ellipsis">
                  <span style={textStyle}>{productItem?.name}</span>
                </div>
                <ContentViewer>
                  {/* <section id="product-details"> */}
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

                          <ContentSpecification pathId={"product-description"}>
                            {
                              productItem?.unitValues.map((uv,x)=><ProductSpecificationDetail key={x} label={uv.label} value={uv.value} />
                              )
                            }
                          </ContentSpecification>
                    </ContentDetails >
                  {/* </section> */}
                  {/* <section id="produc-price-details"> */}
                    <ContentPayment >
                      <PriceTag 
                        tagFor={"product-variations"} 
                        original={productItem?.priceRange.sort((a, b) => b - a).at(-1)} discount={productItem?.isDiscounted[0] ? productItem?.isDiscounted[1] : false} 
                        prodVars={productItem?.variations.map(v => ({ id: v.id, stock: v.stock }))}
                      />
                      <DiscountInfo/>
                      <BuyBtns 
                        deliveryInfo={productItem?.deliveryOptions} id={productItem?.id}
                        prodVars={productItem?.variations.map(v=>({id:v.id, stock:v.stock}))}
                        
                      />
                    </ContentPayment>
                    <PaymentType >
                      <Faqs />
                      <OrderInfo>
                        <span className="order-pin py-2">
                          <PinIco />
                        </span>
                        <span className="order-pin-points">
                          <PinLocation />
                          <span className="courier-points flex flex-col font-raleway lining-nums tabular-nums ">
                            <Courier />
                            <PickupPoints />
                          </span>
                        </span>
                      </OrderInfo> 
                    </PaymentType>
                  {/* </section>  */}
                </ContentViewer>
                <section id="product-recommendations" className="w-full">
                  <RecommendedProducts/>
                  <BuyTogetherProducts/>
                  <OfferedProducts/>
                </section>
                <section id="product-description ">
                  <FullProductDescription description={{text: descriptiveText, tags: [descTag1, descTag2] }}/>
                  <FullProductCharacteristics/>
                  <ProductTags tags={popularTags}/>
                </section>
                <section id="product-reviews">
                  <ReviewsAndQuestions handleClassToggle={handleClassToggle}/>
                </section>
              </MiddleSection>
            <div className="bottom w-full border "></div>
        
              {/* <Outlet /> */}
        </div>   
        </Suspense>
    </>
    )
  
}
export default ShowProduct;