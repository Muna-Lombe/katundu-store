
import { useDispatch, useSelector } from "react-redux";
import { InfoIco,titleTagTypes as tags  } from "../assets";
import Logo from "./Logo";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { createdAuth } from "../orm/models/AuthModel";
import { momentDate, sha256 } from "../orm/utilities";
import { auths } from "../orm/selectors";
import types from "../orm/actions/actionTypes";

export default function Login({userId}) {

  const dispatch = useDispatch()
  const location = useLocation()
  const goto = useNavigate()

  const handleSignin = async(e)=>{
      e.preventDefault()
    const forms = document.forms
    const data = {}
   
    for (const form of forms) {
      new FormData(form).forEach((k, v, x) => {
        let target = v.split("-")[0]
        data[target] =  k 
      });
    }
    const h = await Promise.all([sha256(data.password)])
    dispatch(createdAuth({dateCreated:momentDate().shortDate, timeCreated:new Date(),  authStatus:types.AUTH_VALID}))
    // console.log("loc",location)
    goto(location.state.redirect)
  }
  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="flex flex-col items-center">
            {/* <Logo logo="Katundu"/> */}
            <Logo>
              <div id="logo" className="p-1 less-than-xs:border-2 border-[4px] border-black border-spacing-2 rounded-[4px] text less-than-xs:text-base text-[2.4rem] leading-10 font-raleway font-bold">
                <Link to="/" > {tags.footer.storename} </Link>
              </div>
            </Logo>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{' '}
              <a href="&/" className="font-medium text-indigo-600 hover:text-indigo-500">
                create a new account for free
              </a>
            </p>
          </div>
          <form id="Signin-form" name="Signin-form" className="mt-8 space-y-6" action="#" method="POST">
            <input form="Signin-form" type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div className="text">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input form="Signin-form"
                  id="email-address"
                  name="email"

                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 indent-2 sm:text-sm sm:leading-6"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input form="Signin-form"
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 indent-2 sm:text-sm sm:leading-6"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input form="Signin-form"
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                onSubmit={(e) => handleSignin(e)}
                onClick={(e) => handleSignin(e)}
                className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  {/* <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" /> */}
                  <InfoIco/>
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
