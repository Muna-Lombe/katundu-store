import React from 'react'
import { imagepath } from '../assets/images'

const GridBanner = () => {
  const banners = [
    // imagepath("/img/placeholders/Banner_1.png"),
    "https://sun9-9.vkuserphoto.ru/impg/SKWBgfK9CunhNJYkITc-HFEcdmXX2vOObhg1cQ/ZMJgaSZl1A4.jpg?size=943x271&quality=95&sign=a45f863df71009a59790af07240f99b1&type=album",
    "https://sun9-67.vkuserphoto.ru/impg/-s-n_WnhCUnVn_YQjQNFehJycEjuGieD7fh9xw/f1KuAmrxADM.jpg?size=942x273&quality=95&sign=fd898cd170b6033c4202ac4573ccd169&type=album",
    // "https://sun9-44.vkuserphoto.ru/impg/YA-ZXGa790SrEmeS5RfFE8JEIte4gI-pJxX3Zg/Ckea6R-VmZA.jpg?size=943x272&quality=95&sign=763568ffd3d219978dae1a08577204f2&type=album",
    // "https://sun9-80.vkuserphoto.ru/impg/65XER12ySwgb5MtROa95rQFVs6shEKE00tDFKQ/4oQRLK3hkbE.jpg?size=939x270&quality=95&sign=f9e938c5c19ffc5ee6dd753776ad97fb&type=album",

  ]
  return (
    
      <span className="m-2 grid grid-cols-2 grid-flow-row row-auto auto-rows-auto gap-4 ">
        {
          banners.map((b, x) =>
            <img id={("grid_banner_" + (x + 1))} data-active-banner={x === 0} key={x} className={"banner w-full greater-than-sm:h-full less-than-sm:aspect-[14/6] object-fit border border-transparent rounded-lg"} src={b} loading='eager' placeholder='some' alt="" />
          )
        }
      </span>
   
   
  )
}

export default GridBanner