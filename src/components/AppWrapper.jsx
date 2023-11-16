import React, { Suspense } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AvatarIco, CartIco, HomeIco } from '../assets'
import Navbar from './Navbar'
import Footer from './Footer'
import NoItems from './NoItems'
import ProductMinified from './ProductMinified'
import BackBtn from './BackBtn'

const AppWrapper = ({children}) => {
  
  const location = useLocation()

  const isAuthPath = () => (
    location.pathname.includes("signin")
    || location.pathname.includes("signup")

  )
  const FooterNav = ()=>(
    <Suspense fallback={<NoItems />}>
            
      <div id="footer_nav" className=" sticky bottom-2 left-[90%] right-1 min-h-[10%]  w-[60px] h-min z-10 flex xs:hidden sm:hidden  md:hidden lg:hidden xl:hidden bg-white border border-gray-300 rounded-tl-lg rounded-bl-lg no_highlights">
        <div id="bottom_nav_bar" className="w-full  p-2 flex flex-col justify-between gap-2">
          

          <div id="user_profile_ico">
            <Link to="/history">
              <AvatarIco size={"2.5rem"} />
            </Link>
          </div>
          
        </div>
      </div>
    </Suspense>
  )
  const MainbarNav =() =>(
    <div id="mainbar_nav" className="sticky top-0 w-full min-h-[10%] p-2 h-max flex flex-col items-center bg-white z-10 border border-b-slate-200">
      <Navbar>
        {/* <ProductMinified> */}
          {/* <BackBtn location={location}/> */}
        {/* </ProductMinified> */}
      </Navbar>
    </div>
  )
  return (
    <Suspense fallback={<NoItems />}>

      <div id="App" className="dark relative min-w-[200px] w-auto max-w-[2528px]  min-h-full flex flex-col justify-start gap-4 2n-child:self-start child:p-2">

        {
          !isAuthPath()
          ? <MainbarNav/>
          :""
        }
        
        
        {children}
        {/* <FooterNav /> */}
        <footer id="footer" className="py-2 w-full max-h-[10rem] h-auto  flex self-baseline sticky top-full  z-10    bg-[#F8F8F8] no_highlights">
          <Footer />
        </footer>

      </div>
    </Suspense>

  )
}

export default AppWrapper