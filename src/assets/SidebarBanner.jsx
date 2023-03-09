
import React from 'react'

const SidebarBanner = ({ onClick, mainText = "Receive goods", subText = "For Free!",ctaText = "Learn more" }) => {

  // width="310" height="142"
  const CTA = () => (
    <g>
      <rect x="110" y="90"  rx="19.5" onClick={onClick} //stroke="#FF2D87"
        className="w-[55%] h-[26%] fill-[#2967FF] cursor-pointer">
      </rect>
      <text x='157' y='109' z={50} fontFamily='Raleway' dominantBaseline={"middle"} className="w-auto flex gap-2 "  >
        <tspan className="w-max h-max border text-base fill-white font-raleway hover:font-semibold font-medium" >
          {ctaText}
        </tspan>
      </text>
    </g>
  )
  const MainText = ()=>(
    <text x='110' y='40' fontFamily='Raleway' dominantBaseline={"middle"} className="w-auto flex gap-2"  >
      <tspan className="text-xl fill-[#2967FF]  font-semibold" >
        {mainText}
      </tspan> 
      <tspan x="110" y="68" className="text-xl fill-[#FF2D87] font-semibold uppercase" >
        {subText}
      </tspan>
    </text>
  )
  return (
    <div className=" lg:w-[22rem] lg:h-[10rem] top-4 ">
  {/* // className="absolute w-[425px] h-[225px] top-0 -left-[0.5rem] -z-50" */}
      <svg   viewBox="0 0 330 143" fill="none" xmlns="http://www.w3.org/2000/svg"
          className="w-auto flex justify-center items-center"
      >
        <rect x="11.5" y="0.5" width="310" height="142" rx="19.5" fill="none" stroke="#FF2D87">

        </rect>
          <MainText/>
          <CTA/>
        {/* <text x="50%" y="50%" dominant-baseline="middle" color='black' text-anchor="middle">TEXT </text> */}
            <g clipPath="url(#clip0_6330_4)">
                <path d="M90.9999 114H37.9092L45.1892 54.4449H83.6311L90.9999 114Z" fill="#FF2D87"/>
                <path d="M87.2712 114H34.1804L41.4604 54.4449H79.9912L87.2712 114Z" fill="#FF7CB4"/>
                <path d="M48.918 80.3773C48.918 77.1581 51.0487 75.2803 53.8009 75.2803C56.5531 75.2803 58.595 77.1581 58.595 80.4668C58.595 83.7754 56.4643 85.5638 53.7121 85.5638C50.9599 85.5638 48.918 83.6859 48.918 80.3773ZM64.5433 75.7274L68.9824 75.8168L56.2868 93.9695L51.8477 93.8801L64.5433 75.7274ZM54.955 80.4668C54.955 78.6783 54.4224 78.1418 53.8009 78.1418C53.2682 78.1418 52.6468 78.6783 52.6468 80.3773C52.6468 82.1658 53.1794 82.7023 53.8009 82.7023C54.3336 82.7917 54.955 82.2552 54.955 80.4668ZM62.235 89.2301C62.235 86.0109 64.3658 84.1331 67.118 84.1331C69.8702 84.1331 71.9121 86.0109 71.9121 89.3195C71.9121 92.6281 69.7814 94.4166 67.0292 94.4166C64.277 94.4166 62.1463 92.4493 62.235 89.2301ZM68.1833 89.2301C68.1833 87.4417 67.6507 86.9051 67.0292 86.9051C66.4965 86.9051 65.875 87.4417 65.875 89.1407C65.875 90.9291 66.4077 91.4657 67.0292 91.4657C67.5619 91.5551 68.1833 91.0186 68.1833 89.2301Z" fill="#FF2D87"/>
                <path d="M54.0673 57.3959C54.0673 58.3795 53.2683 59.1843 52.2917 59.1843C51.3151 59.1843 50.5161 58.3795 50.5161 57.3959C50.5161 56.4122 51.3151 55.6074 52.2917 55.6074C53.2683 55.6074 54.0673 56.4122 54.0673 57.3959Z" fill="#2967FF"/>
                <path d="M72.6225 57.3959C72.6225 58.3795 71.8235 59.1843 70.8469 59.1843C69.8703 59.1843 69.0713 58.3795 69.0713 57.3959C69.0713 56.4122 69.8703 55.6074 70.8469 55.6074C71.8235 55.6074 72.6225 56.4122 72.6225 57.3959Z" fill="#2967FF"/>
                <path d="M52.2918 57.217C51.8479 57.217 51.4928 56.8593 51.5816 56.4122C51.6703 54.5344 52.0255 49.7056 53.0021 44.7874C54.7777 36.2923 57.7074 32 61.7913 32C65.8752 32 68.7162 36.2923 70.3143 44.8768C71.2021 49.7056 71.4684 54.6238 71.5572 56.5016C71.5572 56.9487 71.2021 57.3064 70.8469 57.3064C70.403 57.3064 70.1367 56.9487 70.0479 56.5911C69.8704 49.5267 68.1835 33.6096 61.7913 33.6096C55.3991 33.6096 53.446 49.5267 53.0908 56.5911C53.0908 56.9487 52.7357 57.217 52.2918 57.217Z" fill="#2D2D2F"/>
                <path d="M49.4507 114H2.7522L9.14439 61.6881H43.0585L49.4507 114Z" fill="white"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M49.4507 114L43.0585 61.6881H9.14439L2.7522 114H49.4507ZM48.447 113.106L42.2733 62.5823H9.92963L3.75597 113.106H48.447Z" fill="#2967FF"/>
                <path d="M46.6985 114H0L6.39219 61.6881H40.3063L46.6985 114Z" fill="white"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M46.6985 114L40.3063 61.6881H6.39219L0 114H46.6985ZM45.6948 113.106L39.5211 62.5823H7.17743L1.00377 113.106H45.6948Z" fill="#2967FF"/>
                <path d="M15.8917 65.8909C16.7743 65.8909 17.4898 65.1703 17.4898 64.2813C17.4898 63.3924 16.7743 62.6718 15.8917 62.6718C15.0092 62.6718 14.2937 63.3924 14.2937 64.2813C14.2937 65.1703 15.0092 65.8909 15.8917 65.8909Z" fill="white"/>
                <path d="M33.8252 64.2813C33.8252 65.1756 33.115 65.8909 32.2272 65.8909C31.3394 65.8909 30.6292 65.1756 30.6292 64.2813C30.6292 63.3871 31.3394 62.6718 32.2272 62.6718C33.115 62.6718 33.8252 63.3871 33.8252 64.2813Z" fill="white"/>
                <path d="M15.9806 64.1026C15.6255 64.1026 15.3591 63.7449 15.3591 63.3872C15.4479 61.7776 15.7143 57.4853 16.6021 53.1931C18.1113 45.6816 20.7747 41.9259 24.326 41.9259C27.8772 41.9259 30.4518 45.7711 31.8723 53.1931C32.6713 57.4853 32.8489 61.7776 32.9377 63.3872C32.9377 63.7449 32.6713 64.1026 32.3162 64.1026C31.9611 64.1026 31.6947 63.8343 31.606 63.4766C31.4284 57.3065 29.9191 43.2672 24.4147 43.2672C18.8216 43.2672 17.046 57.3065 16.7796 63.4766C16.6021 63.8343 16.3357 64.1026 15.9806 64.1026Z" fill="#2D2D2F"/>
                <path d="M11.5415 92.807V85.6532H16.5282V87.3661H13.5382V88.555H15.9753V90.147H13.5382V92.807H11.5415Z" fill="#2967FF"/>
                <path d="M17.3113 92.807V85.6532H20.6495C21.0045 85.6532 21.3321 85.7271 21.6325 85.8749C21.9329 86.0159 22.1888 86.204 22.4005 86.4391C22.6189 86.6675 22.7896 86.9328 22.9124 87.2351C23.0353 87.5306 23.0968 87.8296 23.0968 88.1318C23.0968 88.5483 23.0046 88.9379 22.8203 89.3006C22.636 89.6566 22.38 89.9488 22.0523 90.1772L23.5883 92.807H21.3355L20.0556 90.6105H19.3081V92.807H17.3113ZM19.3081 88.8976H20.5676C20.6904 88.8976 20.8031 88.8304 20.9055 88.6961C21.0147 88.5617 21.0693 88.3736 21.0693 88.1318C21.0693 87.8833 21.0079 87.6952 20.885 87.5676C20.7621 87.4332 20.6392 87.3661 20.5164 87.3661H19.3081V88.8976Z" fill="#2967FF"/>
                <path d="M29.4024 91.0941V92.807H24.2211V85.6532H29.3103V87.3661H26.2179V88.3736H28.8597V89.9656H26.2179V91.0941H29.4024Z" fill="#2967FF"/>
                <path d="M35.5122 91.0941V92.807H30.3309V85.6532H35.4201V87.3661H32.3277V88.3736H34.9695V89.9656H32.3277V91.0941H35.5122Z" fill="#2967FF"/>
            </g>
          
            
        <defs>
        <clipPath id="clip0_6330_4">
        <rect width="91" height="82" fill="white" transform="translate(0 32)"/>
        </clipPath>
        </defs>
        
      </svg>

  </div>
  )
}

export default SidebarBanner