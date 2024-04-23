import React from 'react'

// legacy navlogo component
const LegacyNavLogo = () => {
  const [activeLogoType, setActiveLogoType] = useState("long")
  const sess = {

    getItem: (str) => true,
    setItem: (key, val) => true
  };//sessionStorage
  // const transitionRef = {
  //   current: {
  //     transitioned: { 
  //       toLong: window.innerWidth < 744, 
  //       toShort: window.innerWidth > 744 
  //     }
  //   }
  // };

  // const canTransitionMemo = useMemo(() => ({
  //   toLong: window.innerWidth < 744,
  //   toShort: window.innerWidth > 744
  // }), [window.innerWidth])


  if (!sess?.getItem("canRerender")) {
    sess.setItem("canRerender", true)
  }
  const toggleOnResize = () => {
    const containerParent = document.getElementById("navbar_left__wrapper");
    const logoParent = document.getElementById("logo_animation_container");
    const logoLongPng = document.getElementById("logo_long_png");
    const logoShortPng = document.getElementById("logo_short_png");
    const logoTransToLong = document.getElementById("logo_gif_trans_to_long");
    const logoTransToShort = document.getElementById("logo_gif_trans_to_short");
    const locationComponent = document.getElementById("address");


    let tm = ""
    const classCanBeToggledOnForClasslist = (classList, classname) => {
      return classList.contains(classname)
        ? undefined
        : { toggle: () => classList.toggle(classname, true) }
    }
    const classCanBeToggledOffForClasslist = (classList, classname) => {
      return classList.contains(classname)
        ? { toggle: () => classList.toggle(classname, false) }
        : undefined

    }
    const isAlreadyTransitioned = (component) => {
      switch (component) {
        case "toLong":
          return logoLongPng.classList.contains("flex") && logoTransToLong.classList.contains("hidden") &&
            logoShortPng.classList.contains("hidden") && logoTransToShort.classList.contains("hidden")

          break;
        case "toShort":
          return logoShortPng.classList.contains("flex") && logoTransToShort.classList.contains("hidden") &&
            logoLongPng.classList.contains("hidden") && logoTransToLong.classList.contains("hidden")

        default:
          return false;
          break;
      }
    }
    // const timedInsertion =(transitionNode, logoNode, ejectNode, nextActiveType)=>{
    //   ejectNode.classList.replace("flex", "hidden");

    //   locationComponent.classList.replace("visible", "invisible");
    //   transitionNode.classList.replace("hidden", "flex");

    //   delay(() => {
    //     transitionNode.classList.replace("flex", "hidden");
    //     locationComponent.classList.replace("invisible", "visible");

    //     logoNode.classList.replace("hidden", "flex");

    //     setActiveLogoType(nextActiveType)
    //   },2000)

    // }

    const delay = (x, time) => {
      const tOut = setTimeout(() => {
        x()
      }, time);
      return { clear: () => clearTimeout(tOut) }
    }

    const longComponent = () => {
      const png = toggle(logoLongPng.classList, { curr: "hidden", tar: "flex" })
      const gif = toggle(logoTransToLong.classList, { curr: "hidden", tar: "flex" })
      return {
        png: {

          hide: png.off,
          show: png.on
        },
        gif: {
          hide: gif.off,
          show: gif.on
        }
      }
    }
    const shortComponent = () => {
      const png = toggle(logoShortPng.classList, { curr: "hidden", tar: "flex" })
      const gif = toggle(logoTransToShort.classList, { curr: "hidden", tar: "flex" })
      return {
        png: {

          hide: png.off,
          show: png.on
        },
        gif: {
          hide: gif.off,
          show: gif.on
        }
      }
    }


    const toggleShortLogo = () => {
      // toggle off long logo
      // classCanBeToggledOnForClasslist(logoLongPng.classList, "hidden")?.toggle()
      locationComponent.classList.replace("visible", "invisible");
      longComponent().png.hide()

      if (sess.getItem("canRerender") === true) {
        delay(() => {
          // toggle off transition of short logo
          // classCanBeToggledOnForClasslist(logoTransToShort.classList, "hidden")?.toggle()
          shortComponent().gif.hide()

          // toggle on short logo
          // classCanBeToggledOnForClasslist(logoShortPng.classList, "hidden")?.toggle()
          shortComponent().png.show()
          // console.log("shrunk")
          locationComponent.classList.replace("invisible", "visible");

        }, 2000)//.clear()
        // toggle on transition of short logo
        // classCanBeToggledOffForClasslist(logoTransToShort.classList, "hidden")?.toggle()
        shortComponent().gif.show()

      } else {
        // toggle on logo long instead
        // classCanBeToggledOffForClasslist(logoShortPng.classList, "hidden")?.toggle()
        shortComponent().png.show()
      }

    }

    const toggleLongLogo = () => {
      // toggle off short logo
      // classCanBeToggledOnForClasslist(logoShortPng.classList, "hidden")?.toggle()
      locationComponent.classList.replace("visible", "invisible");
      shortComponent().png.hide()

      if (sess.getItem("canRerender") === true) {
        delay(() => {
          // toggle off transition to short  logo
          // classCanBeToggledOnForClasslist(logoTransToLong.classList, "hidden")?.toggle()
          longComponent().gif.hide()
          // toggle on long logo
          // classCanBeToggledOffForClasslist(logoLongPng.classList, "hidden")?.toggle()
          longComponent().png.show()
          // console.log("expanded")
          locationComponent.classList.replace("invisible", "visible");

        }, 2000)//.clear()
        // toggle on transition to long logo
        // classCanBeToggledOffForClasslist(logoTransToLong.classList, "hidden")?.toggle()
        longComponent().gif.show()

      } else {
        // toggle on long logo anyway
        classCanBeToggledOffForClasslist(logoLongPng.classList, "hidden")?.toggle()
        longComponent().png.show()

      }

    }


    const toggleForContentBox = (entries) => {
      const box = entries[0]?.contentBoxSize
      console.log("box-size", box[0]?.inlineSize);
      // box size in range and short logo is hidden
      if (
        Math.floor(box[0]?.inlineSize) < 724
        // && classCanBeToggledOffForClasslist(logoShortPng.classList, "hidden")
        && isAlreadyTransitioned("toLong")

        // && activeLogoType === "long"
      ) {
        // setTimeout(() => {

        //   setActiveLogoType("short")
        // }, 500);
        toggleShortLogo()
        // timedInsertion(
        //   logoTransToShort,
        //   logoShortPng,
        //   logoLongPng,
        //   "short"
        // );
        console.log("<-- toShort trigger count", "active state", activeLogoType)

        // transitionRef.current.transitioned = { toLong: false, toShort: true }
      }
      // box size out of range and long logo is hidden
      if (
        Math.floor(box[0]?.inlineSize) > 725
        // && classCanBeToggledOnForClasslist(logoLongPng.classList, "hidden") 
        && isAlreadyTransitioned("toShort")
        // && activeLogoType === "short"
      ) {
        // setTimeout(() => {

        //   setActiveLogoType("long")
        // }, 500);
        toggleLongLogo()
        // timedInsertion(
        //   logoTransToLong,
        //   logoLongPng,
        //   logoShortPng,
        //   "long"
        // );
        console.log("<-- toLong trigger count", "active state", activeLogoType)

        // transitionRef.current.transitioned = {toLong: true, toShort: false}
      }
    }


    const toggleForContentRect = (entries) => {
      const rect = entries[0]?.contentRect
      console.log("rect-size", rect[0]?.width)
      if (
        Math.floor(rect[0]?.width) <= 350
        // && classCanBeToggledOffForClasslist(logoShortPng.classList, "hidden")
      ) {
        // toggleShortLogo()
      }
      if (
        Math.floor(rect[0]?.width) > 350
        // && classCanBeToggledOnForClasslist(logoLongPng.classList, "hidden")
      ) {
        // toggleLongLogo()

      }
    }
    const resizeObserver = new ResizeObserver((entries) => {
      if (entries[0]?.contentBoxSize) {
        clearTimeout(tm)
        tm = setTimeout(() => {
          toggleForContentBox(entries)
          sess.setItem("canRerender", false)
          // console.log("is box size?:")

        }, 0);
      } else if (entries[0]?.contentRect) {

        clearTimeout(tm)
        tm = setTimeout(() => {
          toggleForContentRect(entries)
          sess.setItem("canRerender", false)
          // console.log("is rect size?:",entries[0]?.contentRect.width === 270)

        }, 0);

      }

    })
    resizeObserver.observe(containerParent)
    return (() => resizeObserver.unobserve(containerParent))
  }
  useEffect(() => {
    // if (sess.getItem("canRerender") === false){
    //   sess.setItem("canRerender", false)

    // }
    let cleanup = () => { };
    if (document.readyState === "complete") {
      if (window.innerWidth < 744) {
        document.getElementById("address").classList.replace("visible", "invisible");

        document.getElementById("logo_gif_trans_to_short").classList.replace("hidden", "flex");

        setTimeout(() => {
          document.getElementById("logo_gif_trans_to_short").classList.replace("flex", "hidden");

          document.getElementById("logo_short_png").classList.replace("hidden", "flex");

          document.getElementById("address").classList.replace("invisible", "visible");
        }, 2000);
      } else {

        document.getElementById("address").classList.replace("visible", "invisible");

        document.getElementById("logo_gif_trans_to_long").classList.replace("hidden", "flex");
        setTimeout(() => {
          document.getElementById("logo_gif_trans_to_long").classList.replace("flex", "hidden");

          document.getElementById("logo_long_png").classList.replace("hidden", "flex");

          document.getElementById("address").classList.replace("invisible", "visible");

        }, 2000);
      }
      cleanup = toggleOnResize()

    }
    return () => {
      cleanup()
    }
  }, [])

  const LogoLong = () => {
    const [inTransition, setInTransition] = useState(true)

    useEffect(() => {
      const transitionTimeout = setTimeout(() => {
        setInTransition(false)
      }, 2000)

      return () => {
        clearTimeout(transitionTimeout)
      }
    }, [])
    return (
      <>
        {
          inTransition ?
            <img id="logo_gif_trans_to_long" src={imagepath("/img/placeholders/Katundu_reverse.gif")} className="max-w-[14rem] absolute top-0 left-0 z-10 " loading='eager' alt="" />
            : <img id="logo_long_png" src={imagepath("/img/placeholders/Katundu.png")} className="max-w-[14rem]" alt="" />
        }


      </>
    )
  }
  const LogoShort = () => {
    const [inTransition, setInTransition] = useState(true)

    useEffect(() => {
      const transitionTimeout = setTimeout(() => {
        setInTransition(false)
      }, 2000)

      return () => {
        clearTimeout(transitionTimeout)
      }
    }, [])

    return (
      <>
        {
          inTransition ?
            <img id="logo_gif_trans_to_short" src={imagepath("/img/placeholders/Katundu.gif")} className="max-w-[14rem] absolute top-0 left-0 z-10 " loading='eager' alt="" />
            : <img id="logo_short_png" src={imagepath("/img/placeholders/Katundu_short.png")} className="max-w-[2.8rem] object-scale-down object-center" loading='lazy' alt="" />
        }
      </>
    )
  }
  return (
    <Link to={''} id="logo_animation_container" className='cursor-pointer  '>
      {/* {
          activeLogoType === "long" ?
            <LogoLong/>
          : <LogoShort/> 
        } */}
      <img id="logo_gif_trans_to_long" src={imagepath("/img/placeholders/Katundu_reverse.gif")} className="max-w-[14rem] absolute top-0 left-0 z-10  hidden mix-blend-multiply" loading='eager' alt="" />
      <img id="logo_long_png" src={imagepath("/img/placeholders/Katundu.png")} className="max-w-[14rem] hidden" alt="" />
      <img id="logo_gif_trans_to_short" src={imagepath("/img/placeholders/Katundu.gif")} className="max-w-[14rem] absolute top-0 left-0 z-10 hidden mix-blend-multiply " loading='eager' alt="" />
      <img id="logo_short_png" src={imagepath("/img/placeholders/Katundu_short.png")} className="max-w-[2.8rem] object-scale-down object-center hidden" loading='lazy' alt="" />
    </Link>
  )
}

export default LegacyNavLogo