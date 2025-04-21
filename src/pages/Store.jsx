import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetStoreQuery, useLazyGetStoreProductsQuery } from '../js/middleware/queryHandler'
import BrokenConnection from './BrokenConnection'
import { AdBanners, CategoryTag, GridBanner, HeroBanner, LoadingStateComponent, Logo, ProductCardVertical } from '../components'
import { createdToastMessage } from '../orm/models/ToastMessageModel'
import { useDispatch } from 'react-redux'
import { popularTags } from '../components/icons'
import { Link } from 'react-router-dom'
import types from '../orm/actions/actionTypes'
import randomizer from '../utilities/randomizer'

const Store = () => {
  const {id} = useParams()
  const {data: store, isLoading, isError} = useGetStoreQuery({storeId:id})
  const dispatch = useDispatch()
  if (isLoading) return <LoadingStateComponent />
  if (isError) return <BrokenConnection />

  const MainContent = ({ children }) => (
    <div id="store-main" className="w-auto min-h-full h-auto  flex flex-col justify-between">

      <div id="store-mainbar_container_wrapper" className="p-3 w-full flex flex-col items-center  h-auto overflow-y-auto gap-y-6 scrollbar">
        {children}

      </div>
    </div>
  )
 
  const ProductsSection = ({ products, index, forwardRef }) => {
    // {/* grid-cols-[repeat(auto-fit,minmax(auto,7rem))] */ }
    // console.log("products", products)
    // less - than - xs: grid - cols - 2 greater - than - xs: grid - cols - [repeat(auto - fit, minmax(auto, 12rem))] greater - than - sm: grid - cols - [repeat(auto - fit, minmax(auto, 14rem))] 
    return (
      < div id={"store-products-section" + index} className={"w-full p-4 grid grid-flow-col-dense grid-rows-2 overflow-x-scroll scroll-smooth justify-center  transition-all  tag gap-3 greater-than-xs:gap-6"} >
        {
          !products[0].noProd
            ? products.map((i, x) => (
              (x === products.length - 1 && forwardRef) ?
                <ProductCardVertical key={x} product={i} forwardRef={forwardRef} isSearchOrMain={true} maxWH={"max-w-[12rem] max-h-[24rem"} />
                : <ProductCardVertical key={x} product={i} isSearchOrMain={true} maxWH={"max-w-[12rem] max-h-[24rem"} />
            ))
            : <>
              {
                new Array(6).fill().map((i, x) => <ProductCardVertical key={x} noPrd={products[0].noProd} />)
              }

            </>
        }
      </div>
    )
  }
  const ProductsWrapper = () => {
    // let products = useSelector(filteredProductsFromModel([]))


    const [getStoreProducts, { data, isLoading, isSuccess, isError }, { lastArg }] = useLazyGetStoreProductsQuery()

    let products = data || []
    // load products the first time
    useEffect(()=>{
      getStoreProducts({storeId:id, query:"from="})
    },[])
    // console.log(products)
    const loadMoreRef = useRef(null);
    const lastProductIdRef = useRef(null);

    const LoadMore = () => {

      const handleLoadMore = () => {
        if ((document.readyState === "complete" && lastArg.query === ("from=" + products?.at(-1)?.uuid)) || !products?.at(-1)?.uuid) {
          return
        }

        setTimeout(() => {
          getStoreProducts({storeId:id, query:"from=" + products?.at(-1)?.uuid})

        }, 1000);

        if (isError) {

          dispatch(createdToastMessage(
            {
              text:
              {
                header: "Error",
                body: "Something happened back-stage. Refresh the page and try again."
              },
              status: types.TOAST_VALID,
              type: types.TOAST_ERROR,
              id: "checkout error"
            })
          )
        }

      }
      let userHasScrolled = false;

      useEffect(() => {
        const handleScroll = () => {
          userHasScrolled = true;
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);


      useEffect(() => {
        const loadMoreElement = loadMoreRef.current;

        const observerOptions = {
          root: null,//document.querySelector("#mainbar_container_wrapper"),
          rootMargin: "0px",
          threshold: 1.0,
          isVisible: false
        };

        const observer = new IntersectionObserver((entries) => {
          const [entry] = entries;
          // console.log("entry", entry, "scrolled?:",userHasScrolled);
          if (entry.intersectionRatio <= 0) return;
          if (entry.isIntersecting && userHasScrolled) {
            // Start scrolling when component is in view
            // console.log("entry in view", entry);
            // console.log("lastArg", lastArg, products?.at(-1)?.uuid)

            handleLoadMore();

          } else {
            // Stop scrolling when component is out of view
            // clearInterval(intervalRef.current);
          }
        }, observerOptions);


        if (loadMoreElement) {
          // lastProductIdRef.current = products?.at(-1)?.uuid;//loadMoreElement.id.split("_")[2]
          observer.observe(loadMoreElement);
        }

        return () => {
          if (loadMoreElement) {
            observer.unobserve(loadMoreElement);
          }
        };
      }, []);

      return (
        <div id="load-more-store-products">
          {

            <LoadingStateComponent forwardRef={loadMoreRef} />

          }
        </div>


      )
    }
    // need to set a stateful variable to keep track of the chunksize and update it when the screen size changes
    // the variable should not cause a re-render when it changes
    const [chunkSize, setChunkSize] = useState(() => {
      if (window.innerWidth < 320) {
        return 4;
      } else if (window.innerWidth < 431) {
        return 4;
      } else if (window.innerWidth < 720) {
        return 6;
      } else if (window.innerWidth < 1024) {
        return 8;
      } else if (window.innerWidth < 2048) {
        return 10;
      } else {
        return 2;
      }
    });

    useEffect(() => {

      const handleResize = () => {
        if (window.innerWidth < 320) {
          setChunkSize(4);
        } else if (window.innerWidth < 431) {
          setChunkSize(4);
        } else if (window.innerWidth < 720) {
          setChunkSize(6);
        } else if (window.innerWidth < 1024) {
          setChunkSize(8);
        } else if (window.innerWidth < 2048) {
          setChunkSize(10);
        } else {
          setChunkSize(2);
        }
        // console.log(window.innerWidth,"resize", chunkSize)
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, [window.innerWidth]);

    // const chunkSize =() => window.innerWidth < 320 ? 2 : window.innerWidth < 425 ? 4 : window.innerWidth < 1024 ? 4 : 6;
    // const chunkSize = 4;
    const chunks = [];
    for (let i = 0; i < products.length; i += chunkSize) {
      chunks.push(products.slice(i, i + chunkSize));
      if (i + chunkSize < products.length) {
        chunks.push('GridBanner');
      }
    }



    return (
      <div id="store-products_list" className="w-full flex flex-col items-center gap-6">
        {chunks.map((chunk, index) => {
          if (chunk === 'GridBanner') {
            return <AdBanners grid={"grid"} key={index} />;
          } else {
            return <ProductsSection key={index} index={index} products={chunk} />;
          }
        })}
        <LoadMore />
      </div>
    )
  }
  return (
    <div className="store-container flex flex-col gap-y-6">
      {/* Hero Banner */}
      <HeroBanner jambotron={true} text={store?.storePromotions?.map(promo=> `${promo.name}!! ends ${promo.endDate.replaceAll("-",".")}`).join(" ") || ""} />
      {/* <Logo size={{ h: 80, w: 100, font: 32 }} logo={store.name} addText={false} bgColor="bg-orange-400" /> */}
      <div className="store-name w-full text-8xl font-bold text-center">
        {store.name}
      </div>
      <HeroBanner carousel={false}  />
      

      {/* Store Content */}
      <MainContent>
        <GridBanner/>
        {/* <HeroBanner /> */}
        <AdBanners mosaic={"mosaic"} />
        <ProductsWrapper />
      </MainContent>
    </div>
  )
}

export default Store