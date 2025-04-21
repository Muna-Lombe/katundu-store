import { Suspense, useEffect, } from "react";
import { ArrowLeft,  ArrowRight,  BasketIco,  CartIco,  PinIco, popularTags } from "../components/icons";
import { categoriesV2, filteredProductsFromModelV2 } from "../orm/selectors";
import { useDispatch, useSelector } from "react-redux";
import { Link,useParams, useLocation, createSearchParams, } from "react-router-dom";
import { BuyBtns, Card, ContentDescription, ContentDetails, ContentPayment, ContentSpecification, ContentViewer, Courier, DiscountInfo, EmbeddedProducts, Faqs, FullProductCharacteristics, FullProductDescription, LoadingStateComponent, Logo, NoItems, OrderInfo,  PaymentType, PickupPoints, PinLocation, PriceTag, ProductDescriptor, ProductImageViewer, ProductMinified, ProductSpecificationDetail, ProductTags,  ReviewsAndQuestions } from "../components";
import { useGetProductQuery } from "../js/middleware/queryHandler";
import { createdToastMessage } from "../orm/models/ToastMessageModel";
import types from "../orm/actions/actionTypes";
import StoreCard from "../components/StoreCard";
import RatingStars from "../components/RatingStars/RatingStars";
import ContentProperties from "../components/contents/ContentProperties";


// Somewhere inside, something is causing 6 rerenders
const StoreLogo = ({product}) => (
  <Link to={`/store/${product?.store.uuid}`}>
    <Logo logo={product?.store.name} bgColor="bg-slate-500" />
  </Link>
)
const ShowProduct = ()=>{
  // console.log("", useParams())
  // const location = useLocation()
  const  id = useParams().id

  const dispatch = useDispatch()
  let productItem;// = useSelector(filteredProductsFromModelV2([])).find(i=> i.id.toString() === id.toString())
  const { data, isLoading, isSuccess, isError, error } = useGetProductQuery({productId:id})
  if (isLoading) {
    productItem = false
    return <LoadingStateComponent />
  } else if (isSuccess) {
    productItem = data //{ id:data.uuid, ...data.attributes }
  } else if (isError) {
    // dispatch(createdToastMessage({ status: types.TOAST_VALID, text: { header: "Error", body: error.data.error }, type: types.TOAST_ERROR, id:"loading error"}))
    console.log(error)
    productItem = false//[{ noProd: error.data.error }]
    return <NoItems mainText={"Looks like the product you are looking for is not available"} subText={"🙅🏾‍♂️ No product found📦"}/>
  }
  // console.log("pr",productItem)
  const getCat = ()=> productItem?.categories[0] //useSelector(categories).find(cat => cat.id === productItem?.categoryIds[0])

  const getCrumbs =()=> [
    {path:"/",text:"Catalog"}, 
    {path:("/categories#product-section-"+getCat()?.uuid),text:(getCat()?.name.toString())}
    ||{path:"/", text:"Category/"}, (productItem?.name.slice(0, 10)+"...")
  ]


 

  // console.log("prod", productItem)
  const textStyle = {
    maxWidth: '100%',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
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
  const RecommendedProducts = () => (<EmbeddedProducts productId={id} title={"Recommended Products"} tagname="recommended-products"/>)
  const SimilarProducts = () => (<EmbeddedProducts productId={id} title={"Similar Products"} tagname="similar-products" />)
  const BuyTogetherProducts = () => (<EmbeddedProducts productId={id} title={"Buy Together"} tagname="buy-matching-products" />)
  
  const BreadCrumbs =()=>{

    return(
      <span id="crumbs" className="crumbs w-auto  flex justify-start items-center gap-2 text-lg overflow-scroll tag">

        {
          getCrumbs()?.map((cr,x)=> 
          <Link to={cr.path || "/"}  key={x} className={"w-min flex justify-start items-center text-[100%] text-center font-semibold  " + (x === getCrumbs().length - 1 ? "  pointer-events-none text-slate-500" : " text-orange-500 ")}>
            <span className="w-min  h-min flex flex-nowrap whitespace-nowrap items-center truncate ">
              {cr.text}
            </span>

            {
              x < getCrumbs().length-1
                  ? <ArrowRight className="w-min h-full flex flex-nowrap whitespace-nowrap items-baseline fill-slate-400"/>
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
    <div id="showProd_nav" className="top w-auto flex flex-col hide-sidebar gap-2 ">
      
      {
        productItem
        ? <ProductMinified productItem={productItem}/>
        : ""
      }
      <BreadCrumbs/>
    </div>
  )
  
  function NoShowProduct() {
    return (
      <div className="show-product-page relative dark:text-white">
        <NavBack />
      <MiddleSection>
        <NoItems />
      </MiddleSection>
      </div>
    )
  }
  return(
    <>
      <Suspense fallback={<NoShowProduct />} >
          {
            productItem ?
            <div className="show-product-page relative dark:text-white">
                <NavBack/>
                <MiddleSection>
                  <div className="product-product-name-md mt-2  lg:hidden overflow-clip  text-[1.4rem]  text-ellipsis">
                    <span >{productItem?.name}</span>
                    <RatingStars
                      rating={4.9}
                      reviewCount={28}
                      questionCount={191}
                    />

                  </div>
                  <ContentViewer>
                    <section id="product-details" className="w-auto lg:w-full max-w-fit flex flex-col lg:flex-row justify-between items-start gap-5">
                      <ProductImageViewer images={productItem?.images}/>
                      
                      <ContentDetails 
                        productName={productItem?.name}
                        contentType={"product"} 
                        showLogo={
                        // <StoreLogo product={productItem} />
                          // <StoreCard store={productItem?.store} />
                          <div className="md:hidden flex">

                            <RatingStars 
                              rating={4.9} 
                              reviewCount={28} 
                              questionCount={191}
                            />
                          </div>
                        } 
                          
                        variations={productItem?.variations.map((p,x)=> ({...p, text:p.price, image:productItem?.images[x]}))}
                      >
                        {/* <ContentProperties
                          properties={
                            productItem?.variations.map((i, x) =>
                              <ContentDescription key={x} first={x === 0} id={`${i.uuid}`} >
                                <div className="w-full  less-than-xs:child:max-w-[330px] less-than-xs:child:justify-between">
                                  <ProductDescriptor key={101} id={`${i.uuid}${x}`} label={"In stock"} values={[i.stock]} />
                                </div>
                                {i.properties.map((k, v) =>
                                  <div key={v} className="w-full less-than-xs:child:max-w-[330px] less-than-xs:child:flex-wrap less-than-xs:child:justify-between">
                                    <ProductDescriptor key={v} id={`${i.uuid}${v}`} label={k.name} values={k.values || [`${k.type}`]} />
                                  </div>
                                )}
                              </ContentDescription>
                            )

                          }
                        /> */}

                          { productItem?.variations.map((i,x)=>
                                <ContentDescription key={x} first={x===0} id={`${i.uuid}`} >
                                  <div className="w-full  less-than-xs:child:max-w-[330px] less-than-xs:child:justify-between border-b ">
                                    <ProductDescriptor key={101} id={`${i.uuid}${x}`} label={"In stock"} values={[i.stock]} />
                                  </div>
                                  { i.properties.map((k,v)=> 
                                    <div key={v} className="w-full less-than-xs:child:max-w-[330px] less-than-xs:child:flex-wrap less-than-xs:child:justify-between">
                                      <ProductDescriptor key={v} id={`${i.uuid}${v}`} label={k.name} values={k.values || [`${k.type}`]} />
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
                        <StoreCard store={productItem?.store} />
                        
                      </ContentDetails >
                    </section>
                  <section id="produc-price-details" className="w-auto less-than-lg:max-w-[90vw] max-w-[20vw]">
                      <ContentPayment >
                        <PriceTag 
                          tagFor={"product-variations"} 
                          original={productItem?.oldPrice} discount={productItem?.discountTag ? productItem?.new_price : false} 
                          prodVars={productItem?.variations?.map(v => ({ id: v.uuid, stock: v.stock }))}
                        />
                        <DiscountInfo/>
                        <BuyBtns 
                          deliveryInfo={productItem?.deliveryOptions[0]} id={productItem.uuid}
                          prodVars={productItem?.variations.map(v=>({id:v.uuid, stock:v.stock}))}
                          
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
                    </section> 
                  </ContentViewer>
                  <section id="similar-products" className="w-full">
                    <SimilarProducts/>
                  </section>
                  <section id="product-description " className="w-full">
                    <FullProductDescription description={{text: productItem?.description, tags: productItem?.productAttributes }}/>
                    <FullProductCharacteristics chars={productItem?.productSpecifications}/>
                    <ProductTags tags={productItem?.slug?.split(" ")}/>
                  </section>
                  <section id="product-reviews" className="w-full">
                    <ReviewsAndQuestions  productId={productItem?.name+"-"+productItem?.uuid}/>
                  </section>
                  <section id="product-recommendations" className="w-full">
                    <RecommendedProducts/>
                    <BuyTogetherProducts/>
                    {/* <SimilarProducts/> */}
                  </section>
                </MiddleSection>
              <div className="bottom w-full border "></div>
          
                {/* <Outlet /> */}
          </div>
          : <NoItems/>
        }   
        </Suspense>
    </>
    )
  
}
export default ShowProduct;