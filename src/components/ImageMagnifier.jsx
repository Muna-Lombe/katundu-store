import React, { useEffect, useState } from 'react'
import { imagepath } from '../assets/images'
import no_img_path from '../assets/tests/jsonServer/img/placeholders/no_product_img.png'

const ImageMagnifier = ({  handleClick,images, sqrDim = 400 }) => {
  const [activeImage, setActiveImage] = useState(false)
   
  useEffect(()=>{
    return images?.length
    ? setActiveImage(images[0])
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
      whOffsetBal =50
      bgPosOffset = 0.89

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
      // console.log("active id", e)
      if(activeImage.id !== id) setActiveImage(images.find((i) => i.id === id ))
  }

  const SmallSizeImageArray = ({imgArr=[1,2,3,4]}) => (
      <div className={"  max-w-full flex justify-center "}>
        {
          
          imgArr?.map((i,idx)=>
            <img 
              key={idx}
              id={(activeImage?.id === i.id) ? "active " : i.id||idx} 
              alt="gallery"
              onClick={handleClick} 
              onPointerEnter={(e) => (activeImage?.id !== i.id ? handleSetActive(Number.parseInt(e.target.id)) : ("")  )} 
              // onTouchStart={((e) => (activeImage?.id !== i.id ? handleSetActive(Number.parseInt(e.target.id)) : ("")))}
              className={"w-full less-than-xs:max-w-[3rem] max-w-[6rem]  aspect-square" + ((activeImage?.id === i.id) ? " p-[0.8px] border-[3px] border-[#00000037] rounded-md" : " p-2") +" object-cover object-center block cursor-pointer"} 
              src={imagepath(i?.image_url)||no_img_path}
               
            />
          )
        }
      </div>
  )
  const CurrentImage = () => (
      <div className={"mesh-magnifier-container relative  max-w-full aspect-square flex justify-center"}>
        <div 
          // onTouchMove={(e) => magnify("activeImage", 3)} 
          onPointerEnter={(e) => magnify("activeImage", 3)} 
          onMouseEnter={(e) => magnify("activeImage", 3)} 
          className={"mesh-mask modal absolute w-full h-full bg-black opacity-50"}>
            {/* <VerticalLine count={Number.parseInt(((sqrDim / (sqrDim / 10) * 5)).toString())} />
            <HorizontalLine count={Number.parseInt(((sqrDim / (sqrDim / 10) * 5)).toString())} /> */}

        </div>
            {
              // images?.length ?
              <img id="activeImage" alt="gallery" className={"w-full  aspect-square object-cover object-center block bg-white"} src={imagepath(activeImage?.image_url || images[0]?.image_url) || no_img_path} />
                // : ""
            }
        <div className={"img-magnifier-glass absolute bottom-0 right-0 w-1/4 aspect-square hover:bg-white border-[3px] border-slate-600  rounded-md cursor-none"}></div>
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