import React, { useEffect, useRef, useState } from 'react'
import { imagepath } from '../assets/images'
import no_img_path from '../assets/tests/jsonServer/img/placeholders/no_product_img.png'

const ImageMagnifier = ({  handleClick,images, sqrDim = 400 }) => {
  // const [activeImage, setActiveImage] = useState(false)
   const activeImage = useRef(false)
  useEffect(()=>{
    return images?.length
    ? activeImage.current = images[0]//setActiveImage(images[0])
    : ""
  }, [images])
  function magnify(imgId, zoom) {
    let img, mesh, glass, w, h, bw;

    img = document.getElementById(imgId)
    glass = document.querySelector(".img-magnifier-glass")
    mesh = document.querySelector(".mesh-mask")

    glass.style.backgroundImage = "url('" + img.src + "')";
    glass.style.backgroundRepeat = "no-repeat";
    glass.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";
    bw = 3;
    w = glass.offsetWidth;
    h = glass.offsetHeight;

    glass.addEventListener("mousemove", moveMagnifier);
    mesh.addEventListener("mousemove", moveMagnifier);

    glass.addEventListener("touchmove", moveMagnifier);
    img.addEventListener("touchmove", moveMagnifier);
    
    function moveMagnifier(e) {
      // console.log("move event", e)
      // console.log("move event", e.type === "touchmove" ? e.changedTouches[0] :"")
      let pos, x, y, whOffsetBal, bgPosOffset;
      e.preventDefault();

      pos = getCursorPos(e);
      x = pos.x;
      y = pos.y;
      whOffsetBal = 50
      bgPosOffset = 0.9

      if (x > img.width - (w / zoom)) { x = img.width - (w/zoom); }
      if (x < w / zoom) { x = w / zoom; }
      if (y > img.height - (h / zoom)) { y = img.height - (h / zoom); }
      if (y < h / zoom) { y = h / zoom; }

      const left = (x - w+whOffsetBal) + "px";
      const top = (y - h+whOffsetBal) + "px";
      glass.style.left = left;
      glass.style.top = top;
      glass.style.backgroundPosition = `-${((x * zoom*bgPosOffset) + w + bw)}px -${((y * zoom) - h + bw)}px`;

    }

    function getCursorPos(e) {
      var a, x = 0, y = 0;
      e = e || window.event;
      /* Get the x and y positions of the image: */
      a = img.getBoundingClientRect();
      /* Calculate the cursor's x and y coordinates, relative to the image: */
      x = (e.pageX || e.changedTouches[0].pageX) - a.left;
      y = (e.pageY || e.changedTouches[0].pageY)- a.top;
      /* Consider any page scrolling: */
      x = x - window.pageXOffset;
      y = y - window.pageYOffset;
      return { x: x, y: y };
    }

  }

  const handleSetActive = (id) => { 
    if (activeImage.id !== id){ 
      // console.log("active id", activeImage)
      activeImage.current = images.find((i) => i.id === id)
      //setActiveImage(images.find((i) => i.id === id ))
      document.getElementById("activeImage").src = imagepath(activeImage?.current?.image_url || images[0]?.image_url) || no_img_path;
     
      const active = document.querySelector(".small_image_active_image")
      active.classList.toggle("small_image_active_image");
      const toActive = document.getElementById("small_img_" + id)

      toActive.classList.toggle("small_image_active_image");
      const borderClasses = [
        "p-[0.8px]", "border-[3px]", "border-[#00000037]", "rounded-md"] 
      const unborderClasses = [, "object-cover", "object-center", "block", "cursor-pointer"]
      const batchToggle = (elem, toggleArr, untoggleArr)=>{
        toggleArr.forEach(cl => elem.classList.toggle(cl, true))
        untoggleArr.forEach(cl => elem.classList.toggle(cl, false))
      }
      batchToggle(active, unborderClasses, borderClasses)
      batchToggle(toActive, borderClasses, unborderClasses)
      
    } 
  }

  const SmallSizeImageArray = ({imgArr=[1,2,3,4]}) => (
      <div className={"  max-w-full flex justify-center gap-2 "}>
        {
          
          imgArr?.map((i,idx)=>
            <img 
              key={idx}
              id={ "small_img_"+(i.id||idx)} 
              alt="gallery"
              onClick={handleClick} 
              onPointerEnter={(e) => (activeImage?.current?.id !== i.id ? handleSetActive(Number.parseInt(e.currentTarget.id.split("_").at(-1))) : ("")  )} 
              // onTouchStart={((e) => (activeImage?.current?.id !== i.id ? handleSetActive(Number.parseInt(e.target.id)) : ("")))}
              className={((idx === 0) ? "small_image_active_image " : " ") + " w-full mt-2 p-4 less-than-xs:max-w-[3rem] max-w-[6rem]  aspect-square " + ((idx === 0) ? " p-4 border-[3px] border-[#00000037]" :" p-[1px]")+ " rounded-md object-cover object-center block cursor-pointer" } 
              src={imagepath(i?.image_url)||no_img_path}
               
            />
          )
        }
      </div>
  )
  const CurrentImage = () => (
      <div 
      onPointerEnter={(e) => magnify("activeImage", 3)}
      onMouseEnter={(e) => magnify("activeImage", 3)} 
        className={" mesh-magnifier-container relative  max-w-full aspect-square flex justify-center"}>
        <div 
          // onTouchMove={(e) => magnify("activeImage", 3)} 
          
        className={"mesh-mask modal absolute flex  w-full h-full bg-black opacity-30 border-[10px]  rounded-md"}>
            {/* <VerticalLine count={Number.parseInt(((sqrDim / (sqrDim / 10) * 5)).toString())} />
            <HorizontalLine count={Number.parseInt(((sqrDim / (sqrDim / 10) * 5)).toString())} /> */}

        </div>
            {
              // images?.length ?
        <img id="activeImage" alt="gallery" className={" min-w-[200px] w-[400px] max-w-[400px]  aspect-square object-cover object-center block bg-white border-[1px] rounded-md"} src={imagepath(activeImage?.current?.image_url || images[0]?.image_url) || no_img_path} />
                // : ""
            }
        <div className={"peer img-magnifier-glass absolute bottom-0 right-0 w-1/4 aspect-square hover:bg-white border-[3px] border-slate-600  rounded-md cursor-none"}></div>
      </div>
  )
 
  return (
    <div className={"img-magnifier-container relative flex flex-col"} >
      <CurrentImage />
      <SmallSizeImageArray imgArr={images}  />
    </div>
  )
}

export default ImageMagnifier