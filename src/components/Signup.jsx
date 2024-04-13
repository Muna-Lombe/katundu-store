
import { useDispatch, useSelector } from "react-redux";
import { InfoIco,titleTagTypes as tags  } from "../assets";
import Logo from "./Logo";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { createdAuth } from "../orm/models/AuthModel";
import { momentDate, sha256 } from "../orm/utilities";
import types from "../orm/actions/actionTypes";
import { useEffect } from "react";
import { authenticatedUsers, isAuthedUser } from "../orm/selectors";
import { useSignupUserMutation } from "../js/middleware/queryHandler";

export default function Signup({userId}) {

  const dispatch = useDispatch()
  const location = useLocation()
  const goto = useNavigate()
  const [signupUser, { isLoading: signupIsLoading }] = useSignupUserMutation()

  const sess = sessionStorage;
  const extractJwt = (headers) => {
    console.log("headers", headers)
    const authorizationHeader = headers["authorization"];

    // Remove the "Bearer " text from the authorization header
    const jwtToken = authorizationHeader.replace("Bearer ", "");

    // Update the jwt-auth variable in the collection parent with the JWT token
    sess.setItem("jwt", jwtToken);
  }
  const handleSignin = async(e)=>{
    try {
      e.preventDefault()
      const forms = document.forms
      const data = {}
     
      for (const form of forms) {
        new FormData(form).forEach((k, v, x) => {
          let target = v.split("-")[0]
          data[target] =  k 
        });
      }
      //  data['password'] = [...(await Promise.all([sha256(data.password)]))][0]
      data['email'] = data.email
      data['password'] = [...(await Promise.all([sha256(data.password)]))][0]
      // console.log(data)
      await signupUser({ initialCred: {user:data} })
      // console.log(data)
      dispatch(createdAuth({dateCreated:momentDate().shortDate, timeCreated:new Date().toString(),  authStatus:types.AUTH_VALID}))
      location.state.pathname ||= "/login"
      goto(location.state,{state:{from: location.pathname}})
      
    } catch (error) {
      console.log(error)
    }
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
          <form id="Signup-form" name="Signup-form" className="mt-8 space-y-6" action="#" method="POST" onSubmit={(e) => handleSignin(e)}>
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

                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full  border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-orange-600 indent-2 sm:text-sm sm:leading-6"
                  placeholder="Email address"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input form="Signup-form"
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-orange-600 indent-2 sm:text-sm sm:leading-6"
                  placeholder="Password"
                />
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
