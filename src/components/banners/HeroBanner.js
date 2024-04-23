
import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight } from '../icons'
import { imagepath } from '../../assets/images'

 const HeroBanner=()=>{
    const BtnBasic = ({className, id, clickEv, children}) => (
      <div id={id} onClick={(e)=> clickEv(e)} className={className + " less-than-sm:w-[5%] w-[4.5%] less-than-sm:aspect-[2/4] aspect-[5/6.5]  cursor-pointer "}>
        {children}
      </div>
    ) 
    const Pagination = ({className, clickEv, activeIds, setActiveIds})=>{

      const Dot = ()=>(
         <svg className="w-[80%] h-[100%] max-w-[1rem] max-h-[1rem] fill-white ease-in-out delay-500" viewBox="0 0 12 11" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.18414 5.16257L6.18414 5.16257" stroke="white" strokeWidth="10" strokeLinecap="round" />
        </svg>
      )

      const Dash = () => (
        <svg className="w-[90%] h-[100%] max-w-[24px] max-h-[14px] fill-orange-500 ease-in-out delay-500" viewBox="0 0 24 11" xmlns="http://www.w3.org/2000/svg">
          <rect x="0.5" y="0.5" width="23" height="10" rx="5" stroke="#9B4A00" />
        </svg>
      )

      const intervalRef = useRef(null);
      const bannerRef = useRef(null);
 
      useEffect(() => {
            bannerRef.current = document.getElementById("Hero-Banner");
            const observer = new IntersectionObserver((entries) => {
              const [entry] = entries;
              if (entry.isIntersecting) {
                // Start scrolling when component is in view
                intervalRef.current = setInterval(() => {
                  const nextId = (activeIds.activePageIdx + 1) > 5 ? 1 : (activeIds.activePageIdx + 1);
                  const prevId = (activeIds.activePageIdx - 1) < 1 ? 5 : (activeIds.activePageIdx - 1);

                  setActiveIds((prev) => ({
                    nextId: nextId,
                    prevId: prevId,
                    activePageIdx: nextId
                  }));

                  document.getElementById("banner_page_" + nextId)
                    .scrollIntoView({
                      behavior: "smooth",
                      block: "nearest",
                      inline: "center"
                    });
                }, 5000);
              } else {
                // Stop scrolling when component is out of view
                clearInterval(intervalRef.current);
              }
            });

            observer.observe(bannerRef.current);

            return () => {
              observer.unobserve(bannerRef.current);
              clearInterval(intervalRef.current);
            };
          }, [activeIds]);
      
      return (
        <span className='relative w-full h-full' >

          <span className={"pagination "+className}>
              {
              new Array(5).fill(<Dot />).map((i, x) => <span id={("page_" + (x+1))} key={x} className={' cursor-pointer transition-all di'} onClick={()=>''}>{("page_"+activeIds.activePageIdx)===("page_"+(x+1))?<Dash/> : i}</span>)
              }
          </span>
          {/* <BtnBasic id={activeIds.prevId} className={"btn_left absolute left-0 bg-white border flex top-[40%] bottom-[50%] items-center justify-center rounded-r-[30px]  "} clickEv={clickEv}>
            <ArrowLeft className={"arrow-left   aspect-square stroke-orange-400 child:fill-orange-400  "} size={""}/>
           
          </BtnBasic>
          <BtnBasic id={activeIds.nextId} className={"btn_right absolute right-0 bg-white border flex top-[40%] bottom-[50%] items-center justify-center rounded-l-[30px] "} clickEv={clickEv}>
            <ArrowRight className={"arrow-right aspect-square stroke-orange-400 child:fill-orange-400  "} size={""}  />
          </BtnBasic> */}
        </span>
      )
    }
    
    const ScrollableGallery = ({})=>{
      const [activeIds, setActiveIds] = useState({activePageIdx:1, nextId:2, prevId:5})
      // console.log("state", activeIds)
      const banners = [
        imagepath("/img/placeholders/Banner_1.png"),
        "https://sun9-9.vkuserphoto.ru/impg/SKWBgfK9CunhNJYkITc-HFEcdmXX2vOObhg1cQ/ZMJgaSZl1A4.jpg?size=943x271&quality=95&sign=a45f863df71009a59790af07240f99b1&type=album",
        "https://sun9-67.vkuserphoto.ru/impg/-s-n_WnhCUnVn_YQjQNFehJycEjuGieD7fh9xw/f1KuAmrxADM.jpg?size=942x273&quality=95&sign=fd898cd170b6033c4202ac4573ccd169&type=album",
        "https://sun9-44.vkuserphoto.ru/impg/YA-ZXGa790SrEmeS5RfFE8JEIte4gI-pJxX3Zg/Ckea6R-VmZA.jpg?size=943x272&quality=95&sign=763568ffd3d219978dae1a08577204f2&type=album",
        "https://sun9-80.vkuserphoto.ru/impg/65XER12ySwgb5MtROa95rQFVs6shEKE00tDFKQ/4oQRLK3hkbE.jpg?size=939x270&quality=95&sign=f9e938c5c19ffc5ee6dd753776ad97fb&type=album",

      ]
      const splitId = (s)=> s.toString().split("_")
      
      const handleScroll = (e) => {
        e.preventDefault();
        const get = {
           nextId : (parseInt(splitId(e.currentTarget.id).at(-1))+1) > banners.length ? 1 : (parseInt(splitId(e.currentTarget.id).at(-1))+1),
           prevId : (parseInt(splitId(e.currentTarget.id).at(-1))-1) < 1 ? banners.length : (parseInt(splitId(e.currentTarget.id).at(-1))-1),
           newActiveId : parseInt(splitId(e.currentTarget.id).at(-1))
          
        }
        // remove current active banner
        // document.querySelector("data-active-banner").removeAttribute("data-active-banner")
        
        const nextActiveBanner = document.getElementById(("banner_page_"+get.newActiveId))
        // nextActiveBanner.attributes["data-active-banner"]=true
        nextActiveBanner.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center"
        })
        // console.log("currentTarget.id:", splitId(e.currentTarget.id).at(-1), 
        // "\n prevId:",get.prevId, 
        // "\n newActiveid:",get.newActiveId, 
        // "\n nextId:",get.nextId)

        setActiveIds((prev)=>({
            nextId: get.nextId,
            prevId: get.prevId, 
            activePageIdx: get.newActiveId//splitId(e.currentTarget.id).at(-1)
          }))
      }
      const host = {
        xpz:(i)=>"http://192.168.1.66:3143"+"/images/banner/Banner_"+i+".png", 
        local:(i)=>"http://localhost:3000"+"/images/banner/Banner_"+i+".png",
        global:(i)=>"https://storage.yandexcloud.net/katundu.api/images/banner/Banner_"+i+".png",
          
      }
     
      return(
        <>
          <span className="scroll-gallery w-full h-full grid grid-cols-1  child:row-start-1 child:col-start-1 gap-0 p-0 child:m-0 overflow overflow-clip bg-transparent less-than-xs:border-[1px] border-[3px] greater-than-sm:border-4  border-spacing-0 border-transparent less-than-sm:rounded-[0.75rem] 
          rounded-[1rem] greater-than-md:rounded-[1.5rem]">
            <span className=" flex flex-grow items-baseline bg-transparent w-full overflow-x-scroll scrollbar pointer-events-none ">
              {
                banners.map((b,x) => 
                  <img id={("banner_page_" + (x+1) )} data-active-banner={x===0}  key={x} className={"banner w-fit  h-full object-fit border border-transparent rounded-xl"} src={b} loading='eager' placeholder='some' alt="" />
                  )
              }
            </span>
            <Pagination clickEv={handleScroll} activeIds={activeIds}
            setActiveIds={setActiveIds} className={"absolute   bottom-[9%] inset-x-14 flex gap-1 rounded-xl transition ease-linear delay-500 bg-transparent less-than-sm:child:w-[0.7rem]"} />
          </span>
        </>
      )
    }
    return(
      <div id="Hero-Banner" className={" relative inline-block min-w-[250px] w-full greater-than-sm:max-w-[56%]  aspect-[4/2] greater-than-xs:aspect-[6/2] text-white dark:text-black  overflow-clip bg-transparent "}>
        
        <ScrollableGallery/>
        
      </div>
    )
  }

 

export default HeroBanner