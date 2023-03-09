import React, { Suspense } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AvatarIco, CartIco, HomeIco } from '../assets'
import Navbar from './Navbar'
import Footer from './Footer'
import NoItems from './NoItems'

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
          {/* <div id="home_ico">
            <Link to="/">
              <HomeIco />
            </Link>

          </div> */}

          <div id="user_profile_ico">
            <Link to="/history">
              <AvatarIco size={"2.5rem"} />
            </Link>
          </div>
          {/* <div id="cart_ico">
            <Link to="/cart">
              <CartIco isCartBtn={true} />
            </Link>
          </div> */}
        </div>
      </div>
    </Suspense>
  )
  const MainbarNav =() =>(
    <div id="mainbar_nav" className="sticky top-0 w-full min-h-[10%] h-max flex items-center bg-white z-10">
      <Navbar />
    </div>
  )
  return (
    <Suspense fallback={<NoItems />}>

      <div id="App" className="dark relative p-2 min-w-[200px] w-auto max-w-[2528px]  min-h-screen flex flex-col justify-start gap-4 2n-child:self-start">

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