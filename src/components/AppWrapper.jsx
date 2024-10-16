import React, { Suspense } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AvatarIco, CartIco, HomeIco } from './icons'
import Navbar from './navbar/Navbar'
import Footer from './Footer'
import NoItems from './NoItems'
import ProductMinified from './ProductMinified'
import BackBtn from './buttons/BackBtn'
import { useDispatch, useSelector } from 'react-redux'
import { connectionRetries, toastMessage } from '../orm/selectors'
import { updatedToastMessage } from '../orm/models/ToastMessageModel'
import types from '../orm/actions/actionTypes'
import BrokenConnection from '../pages/BrokenConnection'
import BrokenConnNavbar from './navbar/BrokenConnNavbar'

const AppWrapper = ({children}) => {
  
  const location = useLocation()
  const toasts = useSelector(toastMessage)
  const isAuthPath = () => (
    location.pathname.includes("signin")
    || location.pathname.includes("signup")
    || location.pathname.includes("reset-password")
    

  )
  const retries = useSelector(connectionRetries) || null;
  
  const dispatch = useDispatch()
  const ToastMessage = ({ toast = { type: "TOAST_ERROR", text: { header: "Error", body: "Something is wrong somewhere" }, status: "TOAST_VALID" }})=>{
    if (isAuthPath ){
      return <div className="hidden"></div>
    }
    if(toast.type && (toast.status==="TOAST_VALID")){
      setTimeout(() => {
        dispatch(updatedToastMessage({uuid:toast.uuid, status:types.TOAST_EXPIRED}))
      }, 3000);
      
      const color = (toast.type === types.TOAST_ERROR ? " text-red-500" : " text-green-500");
      const borderColor = (toast.type === types.TOAST_ERROR ? " border-red-500" : " border-green-500");
      return(
        <div className='absolute z-50 top-0 my-3 w-full flex justify-center  bg-white bg-opacity-50'>
          <div className={"p-2 w-80 bg-white border rounded-lg "+borderColor}>
            <p className='w-full justify-center font-medium'>
              <span>{toast.id}</span>
            </p>
            <p className={'w-full font-sans font-medium '+color}>
              {toast.text.header}
            </p>
            <p className='w-full'>
              <span>
                {toast.text.body}
              </span>
            </p>
  
          </div>
        </div>
      )
      
    }

    return <div className="hidden"></div>
  }
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
    <div id="mainbar_nav" className="sticky top-0 w-full min-h-[10%] p-2 h-max flex flex-col items-center bg-white z-10 border-b-2 border-b-slate-200">
      <Navbar>
        {/* <ProductMinified> */}
          {/* <BackBtn location={location}/> */}
        {/* </ProductMinified> */}
      </Navbar>
    </div>
  )
  const NoConnectionMainbarNav = () => (
    <div id="mainbar_nav" className="sticky top-0 w-full min-h-[10%] p-2 h-max flex flex-col items-center bg-white z-10 border-b-2 border-b-slate-200">
      <BrokenConnNavbar noConn={true}/>

    </div>
  )
  // sessionStorage.getItem("connectionRetry") > 2
  if(retries?.attempt > 2 && retries?.status === types.DO_NOT_RETRY_CONNECTION){
    return (
      <div className="broken-connection">
        <NoConnectionMainbarNav />
        <BrokenConnection/>
      </div>
    )
  }
  return (
    <Suspense fallback={<NoItems />}>

      <div id="App" className=" dark:child:bg-slate-700 relative min-w-[200px] w-auto max-w-[2528px]  h-auto flex flex-col justify-start gap-4 child:px-2 ">
        {
          toasts.length?
            <ToastMessage toast={toasts[0]}/>
            :<></>

        }
        {
          !isAuthPath()
          ? <MainbarNav/>
          :""
        }
        <div className="main_wrapper min-h-screen ">
          {children}

        </div>
        <footer id="footer" className="py-2 w-full less-than-logo-min:min-h-[200px] h-auto flex top-full z-10 bg-[#F8F8F8] no_highlights">
            <Footer />
        </footer>
          
        

      </div>
    </Suspense>

  )
}

export default AppWrapper