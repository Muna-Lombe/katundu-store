
import { useDispatch, useSelector } from "react-redux";
import { InfoIco,titleTagTypes as tags  } from "../icons";
import Logo from "../Logo";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { createdAuth } from "../../orm/models/AuthModel";
import { momentDate, sha256 } from "../../orm/utilities";
import types from "../../orm/actions/actionTypes";
import { useEffect, useState } from "react";
import { authenticatedUsers, isAuthedUser } from "../../orm/selectors";
import { useSignupUserMutation } from "../../js/middleware/queryHandler";
import Toast from "../banners/Toast";
import ToggleVisibleIco from "../icons/ToggleVisibleIco.jsx";

export default function Signup({userId}) {

  const dispatch = useDispatch()
  const location = useLocation()
  const goto = useNavigate()
  const [pwComplexity, setPwComplexity] = useState({
    length:{
      valid:false,
      message:"Password must be at least 8 characters long"
    },
    upperCase:{
      valid:false,
      message:"Password must contain an uppercase letter"
    },
    lowerCase:{
      valid:false,
      message:"Password must contain a lowercase letter"
    },
    number:{
      valid:false,
      message:"Password must contain a number"
    },
    specialChar:{
      valid:false,
      message:"Password must contain a special"
    }
  })
  const [signupUser, { isLoading: signupIsLoading, isError, error: signupError, data, isSuccess }] = useSignupUserMutation()

  const sess = sessionStorage;
  // const extractJwt = (headers) => {
  //   console.log("headers", headers)
  //   const authorizationHeader = headers["authorization"];

  //   // Remove the "Bearer " text from the authorization header
  //   const jwtToken = authorizationHeader.replace("Bearer ", "");

  //   // Update the jwt-auth variable in the collection parent with the JWT token
  //   sess.setItem("jwt", jwtToken);
  // }
  const validatePasswordComplexity = (pw) => {
    const password = pw
    const upperCase = new RegExp('[A-Z]')
    const lowerCase = new RegExp('[a-z]')
    const number = new RegExp('[0-9]')
    const specialChar = new RegExp('[!@#$%^&*(),.?":{}|<>]')
    const length = password.length >= 8
    setPwComplexity(ps => ({
      ...ps,
      length: {
        valid: length,
        message: "Password must be at least 8 characters long"
      },
      upperCase: {
        valid: upperCase.test(password),
        message: "Password must contain an uppercase letter"
      },
      lowerCase: {
        valid: lowerCase.test(password),
        message: "Password must contain a lowercase letter"
      },
      number: {
        valid: number.test(password),
        message: "Password must contain a number"
      },
      specialChar: {
        valid: specialChar.test(password),
        message: "Password must contain a special"
      }

    }))



  }
  const handleSignup = async(e)=>{
    try {
      e.preventDefault()
      const forms = document.forms
      const data = {}
     
      for (const form of forms) {
        new FormData(form).forEach((k, v, x) => {
          let target = v.split("-")[0]
          data[target] =  k 
          console.log("k",k, "v", target)
        });
      }
      
      data['email'] = data.email
      const npw = [...(await Promise.all([sha256(data.password)]))][0]
      // console.log(data, npw)
      data['password'] = npw
      if(!Object.values(pwComplexity).every(v=> v.valid === true)){
        return ;
      }
      const response = await signupUser({ initialCred: {user:data} })
      // console.log(data)
      // dispatch(createdAuth({dateCreated:momentDate().shortDate, timeCreated:new Date().toString(),  authStatus:types.AUTH_VALID}))
      location.state.pathname = "/signin"
      if(!isError && !response.error){
        goto(location.state,{state:{from: location.pathname}})

      }
      
    } catch (error) {
      console.log(error)
    }
  }
  const PasswordComplexity = ()=>{
    const ComplexityItem = ({item})=>(
      <div className="flex flex-row gap-1">
        <div className="flex flex-row gap-1">
          <div className="flex flex-row gap-1">
            <div className="flex items-center justify-center">
              <div className={`w-3 h-3 rounded-full ${item.valid ? "bg-green-500" : "bg-red-500"}`}></div>
            </div>
            <div className="flex items-center justify-center">
              <p>{item.message}</p>
            </div>
          </div>
        </div>
      </div>
    )
    return(
      <div className="p-2 flex flex-col gap-1 bg-slate-200 border border-gray-400 rounded-md">
        {
          Object.keys(pwComplexity).map((key, index) => (<ComplexityItem item={pwComplexity[key]}/>))
        }
      </div>
    )
        
  }
  
  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="flex flex-col items-center">
            {/* <Logo logo="Katundu"/> */}
            <Logo>
              <div id="logo" className="p-1 less-than-xs:border-2 border-[4px] border-black border-spacing-2 rounded-[4px] text less-than-xs:text-base text-[2.4rem] leading-10 font-raleway lining-nums tabular-nums  font-bold">
                <Link to="/" > {tags.footer.storename} </Link>
              </div>
            </Logo>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Signup for your account
            </h2>
            
          </div>
          <PasswordComplexity/>
          <div id="signup-toast" className="showtoast hidden">
            {
              isError &&
              <Toast error={isError || false} message={data?.message || signupError.data.errors[0].detail} onOpen={() => {
                document.getElementById("signup-toast").classList.toggle("hidden", false)
              }} onClose={() => {
                document.getElementById("signup-toast").classList.toggle("hidden", true)
              }} />
            }
          </div>
          <form id="Signup-form" name="Signup-form" className="mt-8 space-y-6" action="#" method="POST" onSubmit={(e) => handleSignup(e)}>
            <div className="-space-y-px rounded-md shadow-sm">

              <div className="text">
                <label htmlFor="name" className="sr-only">
                  name
                </label>
                <input form="Signup-form"
                  id="name"
                  name="name"

                  type="text"
                  required
                  className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-orange-600 indent-2 sm:text-sm sm:leading-6"
                  placeholder="User name"
                />
              </div>
              <div className="text">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input form="Signup-form"
                  id="email-address"
                  name="email"
                  pattern={"[\-a-zA-Z0-9~!$%^&amp;*_=+\}\{'?]+(\.[\-a-zA-Z0-9~!$%^&amp;*_=+\}\{'?]+)*@[a-zA-Z0-9_][\-a-zA-Z0-9_]*(\.[\-a-zA-Z0-9_]+)*\.[cC][oO][mM](:[0-9]{1,5})?"}
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full  border-0 h-[36px] p-0.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-orange-600 indent-2 sm:text-sm sm:leading-6"
                  placeholder="Email address"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <div className="viewable-password-field h-[36px] relative flex flex-flex-nowrap w-full rounded-b-md border-0 p-0.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-none focus:z-10 focus:ring-2 focus:ring-inset focus:ring-orange-600 indent-2 sm:text-sm sm:leading-6">
                  <input form="Signup-form"
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="w-full px-2 "
                    placeholder="Password"
                    onChange={(e) => validatePasswordComplexity(e.target.value)}
                  />
                  <ToggleVisibleIco targetComponentId={"password"}/>

                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                // onSubmit={(e) => handleSignin(e)}
                // onClick={(e) => handleSignin(e)}
                className="group relative flex w-full justify-center rounded-md bg-orange-600 py-2 px-3 text-sm font-semibold text-white dark:text-black  hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  {/* <LockClosedIcon className="h-5 w-5 text-orange-500 group-hover:text-orange-400" aria-hidden="true" /> */}
                  <InfoIco/>
                </span>
                Sign up
              </button>
            </div>
          </form>
          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account? 
            <Link to="/signin" className="font-medium text-orange-600 hover:text-orange-500" >
               {" Login to continue."} 
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}
