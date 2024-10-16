import React, { lazy, useState } from 'react'
import { Dialog, SwitchGroup, Switch, Transition, TransitionChild, Label } from '@headlessui/react'
import { useSelector } from 'react-redux';
import { filteredOrdersFromModel } from '../../orm/selectors';

const MyOrders = ({tabs, location, classNames,autoUpdateApplicantDataEnabled,automaticTimezoneEnabled,setAutoUpdateApplicantDataEnabled, setAutomaticTimezoneEnabled}) => {
  const itemsOrdered = useSelector(filteredOrdersFromModel());

  const subtabs = [
    { key: "History", component: lazy(() => import("../../components/OrderHistory")), icon: "" },
    { key: "Profile", component: lazy(() => import("../../components/OrderHistory")), icon: "" },
    { key: "Settings", component: lazy(() => import("../../components/OrderHistory")), icon: "" }
  ];
  // const History = lazy(() => import("./pages/History"))
  const TabsComponents = ({ subtabs, activeTabIdx }) => {
    return subtabs.map((subtab, idx) => {
      return (
        <div className={"subtab-component" + (activeTabIdx === idx ? " visible w-full" : " hidden ")}>

          < subtab.component itemsOrdered={itemsOrdered} listStyle={"list"} />
        </div>
      )
    })

  }
  const DashContent = ({ content }) => {
    const [activeTabIdx, setActiveTabIdx] = useState(0)
    const DashTabs = () => (
      <>
        <div className="subtab-names w-full  flex flex-row">
          {
            subtabs.map((subtab, idx) => {
              return (
                <ul className={(activeTabIdx === idx ? " border-t  rounded-t-lg  " : " border-b  " + (idx === activeTabIdx - 1 ? "  rounded-br-lg " : idx === activeTabIdx + 1 ? "  rounded-bl-lg  " : "")) + " border-orange-600  px-2 flex flex-row cursor-pointer transition delay-75"}>
                  <li onClick={(e) => (e.preventDefault(), setActiveTabIdx(idx))}>{subtab.key}</li>
                </ul>
              )
            })
          }
        </div>
        <div className="subtab-content w-full">
          <TabsComponents subtabs={subtabs} activeTabIdx={activeTabIdx} />
        </div>
      </>
    )
    return (
      <div className="dash-content w-full flex flex-col gap-4 ">

        {
          content ?
            content()
            : <DashTabs />
        }
      </div>
    )
  }
  const ContentSections = ({ subtab }) => {
    return (
      <>

        <DashContent content={subtab?.content?.component?.content} />
      </>
    )
  }
  return (
    <div className="relative max-w-4xl mx-auto md:px-8 xl:px-0">
      <div className="pt-10 pb-16">
        <div className="px-4 sm:px-6 md:px-0">
          <h1 className="text-3xl font-extrabold text-gray-900">My Orders</h1>
        </div>
        <div className="">
          <div className="py-6">
            {/* Tabs */}
            
            <ContentSections subtab={subtabs[location.hash || "#dashboard"]}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyOrders