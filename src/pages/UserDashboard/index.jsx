/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { Fragment, useState } from 'react'
import { Dialog, SwitchGroup, Switch, Transition, TransitionChild, Label } from '@headlessui/react'

import {
  BellIcon,
  BriefcaseIcon,
  ChatIcon,
  CogIcon,
  ReviewsIcon,
  CheckedOutIcon,
  HeartIcon,
  UserIcon, 
  SearchIco,
  HomeIco,
  QuestionIcon,
  CancelIco} from '../../components/icons'
import ordersSlice from '../../js/slices/orders/ordersSlice'
import Settings from './Settings'
import UserDashboard from './UserDashboard'
import { Link, useLocation } from 'react-router-dom'
import MyOrders from './MyOrders'

const settingsSubTabs = [
  "Profile Settings",
  "Account Settings",
  "Address Settings",
  "Notifications Settings",
  "Privacy Settings",
  "Security Settings",
  "Payment Settings"
]

const navigation = [
  {
    href: "#" + ("Dashboard").toLowerCase().replace(/\s/g, "-"),
    name: "Dashboard",
    link: ({className, children }) => (
      <Link className={className} to={"/me#" + ("Dashboard").toLowerCase().replace(/\s/g, "-")}>
        {children}
        {/* {" Dashboard"} */}
                
      </Link>
    ),
    icon:({className})=> (
      <span className={className}>
        {HomeIco()}
      </span>
      ) ,
    current: false,
    content: {
      subTabs: [],
      component: {
        header: null,
        content: null
      }
    }
  },
  {
    href: "#" + ("Settings").toLowerCase().replace(/\s/g, "-"),
    name: "Settings",
    link: ({className, children }) => (
      <Link className={className} to={"/me#" + ("Settings").toLowerCase().replace(/\s/g, "-")} >
        {children}
        {/* {" Settings"} */}
                
      </Link>
    ),
    icon:({className})=> (
      <span className={className}>
        {CogIcon()}

      </span>
      ) ,
    current: false,
    content: {
      subTabs: settingsSubTabs.map(st => (
        {
          href: "#" + st.toLowerCase().replace(/\s/g, "-"),
          name: st,
          link: ({className}) => (
            <Link className={className} to={"/me#" + st.toLowerCase().replace(/\s/g, "-")}>
              {st}
            </Link>
          ),
          content: {
            header: null,
            content: null
          }
        }
      )),
      component: {
        header: () => "",
        content: () => ""
      }
    }
  },
  {
    href: "#" + ("My orders").toLowerCase().replace(/\s/g, "-"),
    name: "My orders",
    link: ({className, children }) => (
      <Link className={className} to={"/me#" + ("My orders").toLowerCase().replace(/\s/g, "-")} >
        {children}
        {/* {" My order"} */}
                
      </Link>
    ),
    icon:({className})=> (
      <span className={className}>
        {CheckedOutIcon()}

      </span>
      ) ,
    current: false,
    content: {
      subTabs: [],
      component: {
        header: () => "",
        content: () => ""
      }
    }
  },
  {
    href: "#" + ("My favorites").toLowerCase().replace(/\s/g, "-"),
    name: "My favorites",
    link: ({className, children }) => (
      <Link className={className} to={"/me#" + ("My favorites").toLowerCase().replace(/\s/g, "-")} >
        {children}
        {/* {" My favorite"} */}
                
      </Link>
    ),
    icon:({className})=> (
      <span className={className}>
        {HeartIcon()}

      </span>
      ) ,
    current: false,
    content: {
      subTabs: [],
      component: {
        header: () => "",
        content: () => ""
      }
    }
  },
  {
    href: "#" + ("My reviews").toLowerCase().replace(/\s/g, "-"),
    name: "My reviews",
    link: ({className, children }) => (
      <Link className={className} to={"/me#" + ("My reviews").toLowerCase().replace(/\s/g, "-")} >
        {children}
        {/* {" My review"} */}
                
      </Link>
    ),
    icon:({className})=> (
      <span className={className}>
        {ChatIcon()}

      </span>
      ) ,
    current: true,
    content: {
      subTabs: [],
      component: {
        header: () => "",
        content: () => ""
      }
    }
  },
];
// const navigation = [
//   // dashboard
//   // settings
//   // my orders
//   // my reviews 
//   // my favorites
//   { name: 'Dashboard', href: '#me', icon: HomeIco, current: false },
//   // { name: 'Settings', href: '#', icon: BriefcaseIcon, current: false },
//   { name: 'My Orders', href: '#my-orders', icon: CheckedOutIcon, current: false },
//   { name: 'My Reviews', href: '#my-reviews', icon: ChatIcon, current: false },
//   { name: 'My Favorites', href: '#my-favorites', icon: HeartIcon, current: false },
//   { name: 'Settings', href: '#settings', icon: CogIcon, current: true },
// ]
const secondaryNavigation = [
  { name: 'Help', href: '#help', icon: QuestionIcon },
]
const tabs = [
  { name: 'General', href: '#', current: true },
  { name: 'Password', href: '#', current: false },
  { name: 'Notifications', href: '#', current: false },
  { name: 'Plan', href: '#', current: false },
  { name: 'Billing', href: '#', current: false },
  { name: 'Team Members', href: '#', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function UserDashboardV2() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [automaticTimezoneEnabled, setAutomaticTimezoneEnabled] = useState(true)
  const [autoUpdateApplicantDataEnabled, setAutoUpdateApplicantDataEnabled] = useState(false)
  const location = useLocation()
 
  return (
    <>
      {/*
        This example requires updating your template:
        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
      <div className='h-screen flex flex-row'>
        <Transition show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="fixed inset-0 z-40 flex md:hidden" onClose={setSidebarOpen}>
            <TransitionChild
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </TransitionChild>
            <TransitionChild
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative max-w-xs w-full bg-white pt-5 pb-4 flex-1 flex flex-col">
                <TransitionChild
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-14 p-1">
                    <button
                      type="button"
                      className="h-12 w-12 rounded-full flex items-center justify-center focus:outline-none focus:bg-gray-600"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <CancelIco className="h-6 w-6 text-white" aria-hidden="true" />
                      <span className="sr-only">Close sidebar</span>
                    </button>
                  </div>
                </TransitionChild>
                <div className="flex-shrink-0 px-4 flex items-center">
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/easywire-logo-orange-600-mark-gray-900-text.svg"
                    alt="Easywire"
                  />
                </div>
                <div className="mt-5 flex-1 h-0 overflow-y-auto">
                  <nav className="h-full flex flex-col">
                    <div className="space-y-1">
                      {navigation.map((item,x) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? 'bg-orange-50 border-orange-600 text-orange-600'
                              : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                            'group border-l-4 py-2 px-3 flex items-center text-base font-medium'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          <item.icon
                            className={classNames(
                              item.current ? 'text-orange-500' : 'text-gray-400 group-hover:text-gray-500',
                              'mr-4 flex-shrink-0 h-6 w-6'
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </a>
                      ))}
                    </div>
                    <div className="mt-auto pt-10 space-y-1">
                      {secondaryNavigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="group border-l-4 border-transparent py-2 px-3 flex items-center text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                        >
                          <item.icon
                            className="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                            aria-hidden="true"
                          />
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </nav>
                </div>
              </div>
            </TransitionChild>
            <div className="flex-shrink-0 w-14" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </Dialog>
        </Transition>

        {/* Static sidebar for desktop */}
        <div className="hidden md:flex md:w-64 md:h-screen md:flex-col  ">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <nav className="relative bg-gray-50 border-r border-gray-200 pt-5 pb-4 flex flex-col flex-grow overflow-y-auto">

            {/* sidebar main nav */}
            <div className="flex-grow mt-5">
              <div className="space-y-1">
                {navigation.map((item,x) => (
                  <div className="tablink p-2 w-full flex flex-col items-start ">
                    <item.link
                      key={x}
                      
                      // href={item.href}
                      className={classNames(
                        item.current
                          ? 'bg-orange-50 border-orange-600 text-orange-600'
                          : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50',
                        'w-full group border-l-4 py-2 px-3 flex items-center text-base font-medium gap-3'
                      )}
                    >

                      <item.icon
                        className={classNames(
                           'text-gray-400 group-hover:text-gray-500',
                          ' w-4 aspect-square'
                        )}
                        aria-hidden="true"
                      />
                   
                        {item.name}

                  
                    </item.link>
                    <span className="subtabs flex flex-col items-end ">
                      {
                        item?.content?.subTabs?.map((subtab, subindex) => {
                          return (
                            <subtab.link 
                              className={classNames('border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50 w-full flex justify-end border-l-4 py-2 px-3 text-sm font-medium')} 
                              key={subindex} >
                              {subtab.name}
                            </subtab.link>
                          )
                        })||<></>
                      }
                    </span>
                  </div>
                ))}
              </div>
            </div>
            {/* sidebar secon nav */}
            <div className="flex-shrink-0 block w-full sticky bottom-10">
              {secondaryNavigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="group border-l-4 border-transparent py-2 px-3 flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                >
                  <item.icon className="text-gray-400 group-hover:text-gray-500 mr-3 h-6 w-6" aria-hidden="true" />
                  {item.name}
                </a>
              ))}
            </div>
          </nav>
        </div>

        {/* Content area */}
        {/* Settings */}
        <div className="current-tab md:ml-16 max-h-screen overflow-y-scroll scrollbar">
          <div className="max-w-4xl mx-auto flex flex-col  xl:px-0">
            
            <main className="flex-1">
              <Settings 
                tabs={tabs} 
                classNames={classNames} 
                autoUpdateApplicantDataEnabled={autoUpdateApplicantDataEnabled} 
                automaticTimezoneEnabled={automaticTimezoneEnabled} 
                setAutoUpdateApplicantDataEnabled={setAutoUpdateApplicantDataEnabled} 
                setAutomaticTimezoneEnabled={setAutomaticTimezoneEnabled}
              />
              <MyOrders
                tabs={tabs}
                location={location}
                classNames={classNames}
                autoUpdateApplicantDataEnabled={autoUpdateApplicantDataEnabled}
                automaticTimezoneEnabled={automaticTimezoneEnabled}
                setAutoUpdateApplicantDataEnabled={setAutoUpdateApplicantDataEnabled}
                setAutomaticTimezoneEnabled={setAutomaticTimezoneEnabled}
              />
            </main>
          </div>
        </div>
      </div>
    </>
  )
}
// export {UserDashboard as UserDashboardV2}
export default UserDashboardV2;
