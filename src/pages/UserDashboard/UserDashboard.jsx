import React, { lazy, useState } from 'react'
import { LoadingStateComponent, Sidebar } from '../../components';
import { AvatarIco, CommentIco, SearchHistoryIco, SearchIco, StarIco } from '../../components/icons';
import { Link } from 'react-router-dom';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authenticatedUsers, filteredOrdersFromModel } from '../../orm/selectors';
import { useGetUserQuery } from '../../js/middleware/queryHandler';
import daisyui from 'daisyui';

const UserDashboard = () => {
  const itemsOrdered = useSelector(filteredOrdersFromModel());
  const location = useLocation()

  const tabs = [
    { key: "History", component: lazy(() => import("../../components/OrderHistory")), icon: "" }, 
    { key: "Profile", component: lazy(() => import("../../components/OrderHistory")), icon: "" }, 
    { key: "Settings", component: lazy(() => import("../../components/OrderHistory")), icon:""}
  ];
  // const History = lazy(() => import("./pages/History"))
  const TabsComponents = ({tabs, activeTabIdx}) => {
    return tabs.map((tab, idx) => {
      return (
        <div className={"tab-component"+( activeTabIdx === idx ? " visible w-full" : " hidden "  )}>
          
          < tab.component itemsOrdered={itemsOrdered} listStyle={"list"} />
        </div>
      )
    })
    
  }
  const settingsTabs = [
    "Profile Settings",
    "Account Settings", 
    "Address Settings", 
    "Notifications Settings", 
    "Privacy Settings", 
    "Security Settings" , 
    "Payment Settings"
  ]
  
  const sidebarTabs = [
    {
      id:"#"+("Dashboard").toLowerCase().replace(/\s/g, "-"), 
      text:"Dashboard", 
      link:({children})=>(
        <Link to={"/me#" + ("Dashboard").toLowerCase().replace(/\s/g, "-")} className="hover:bg-slate-200 hover:border-l hover:border-l-orange-600 hover:font-medium">
          {"Dashboard"}
          <div className="subtabs-wrapper flex flex-col items-end">
            {children}

          </div>
        </Link>
      ),
      content:{
        subTabs:[],
        component:{
          header: null,
          content: null
        } 
      }
    },
    {
      id:"#"+("Settings").toLowerCase().replace(/\s/g, "-"),
      text:"Settings",
      link:({children})=>(
        <Link to={"/me#" +("Settings").toLowerCase().replace(/\s/g, "-")} className="hover:bg-slate-200 hover:border-l hover:border-l-orange-600 hover:font-medium">
          {"Settings"}
          <div className="subtabs-wrapper flex flex-col items-end">
            {children}

          </div>
        </Link>
      ),
      content:{
        subTabs:settingsTabs.map(st=> (
          {
            id:"#"+st.toLowerCase().replace(/\s/g, "-"),
            text:st,
            link:()=>(
              <Link to={"/me#" + st.toLowerCase().replace(/\s/g, "-")}>
                {st}
              </Link>
            ),
            content:{
              header:null,
              content:null
            }      
          }
        )),
        component:{
          header:()=>"",
          content:()=>""
        } 
      }
    },
    {
      id:"#"+("My orders").toLowerCase().replace(/\s/g, "-"),
      text:"My orders",
      link:({children})=>(
        <Link to={"/me#" + ("My orders").toLowerCase().replace(/\s/g, "-")} className="hover:bg-slate-200 hover:border-l hover:border-l-orange-600 hover:font-medium">
          {"My order"}
          <div className="subtabs-wrapper flex flex-col items-end">
            {children}

          </div>
        </Link>
      ),
      content:{
        subTabs:[],
        component:{
          header:()=>"",
          content:()=>""
        } 
      }
    },
    {
      id:"#"+("My favorites").toLowerCase().replace(/\s/g, "-"),
      text:"My favorites",
      link:({children})=>(
        <Link to={"/me#"+("My favorites").toLowerCase().replace(/\s/g,"-")} >
          {"My favorite"}
          <div className="subtabs-wrapper flex flex-col items-end">
            {children}

          </div>
        </Link>
      ),
      content:{
        subTabs:[],
        component:{
          header:()=>"",
          content:()=>""
        } 
      }
    },
    {
      id:"#"+("My reviews").toLowerCase().replace(/\s/g, "-"),
      text:"My reviews",
      link:({children})=>(
        <Link to={"/me#"+("My reviews").toLowerCase().replace(/\s/g, "-")} className="hover:bg-slate-200 hover:border-l hover:border-l-orange-600 hover:font-medium">
          {"My review"}
          <div className="subtabs-wrapper flex flex-col items-end">
            {children}

          </div>
        </Link>
      ),
      content:{
        subTabs:[],
        component:{
          header:()=>"",
          content:()=>""
        } 
      }
    },
    // {text:"My profile", content:{
    //     subTabs:[],
    //     component:{
    //       header:()=>"",
    //       content:()=>""
    //     } 
    //   }
    // },
    // {text:"My payment methods", content:{
    //     subTabs:[],
    //     component:{
    //       header:()=>"",
    //       content:()=>""
    //     } 
    //   }
    // } 
  ];


  const settingsComponent =({})=>{
    
    return(
      <div className="settings-component">
        <h2>Settings</h2>
        <div className="settings">
        
        </div>
      </div>
    )
  }
  const UserHeader = () =>{
    let user = null;
    const authId = useSelector(authenticatedUsers)[0]?.uuid;
    const { data, isLoading, isSuccess, isError, error } = useGetUserQuery({ uuid: authId }); 
    if(isLoading) return <LoadingStateComponent/>
    if(isError) return <div>{error.message}</div>
    if(isSuccess){
      console.log("data", data)
      user = data;
    }
    return(
      <div className="w-auto max-w-[98%] flex flex-col  items-end">
        <div className="avater-header w-full max-w-[10rem] flex flex-col items-end p-2 gap-1">
          <div className="avatar w-full m-1 child:max-w-[5rem] flex justify-center">
            <AvatarIco />
          </div>
          <div className="user-name px-2 w-full flex justify-end text-lg">
            {user?.name}
          </div>
          <button className="edit-btn w-full flex justify-center text-lg ring-2 ring-orange-500 rounded-lg">
            edit
          </button>
        </div>
        {/* <div className="user-info-header py-2 w-full max-w-[10rem] flex flex-row justify-center gap-2 child:cursor-pointer">
          <div className="starred-items fill-white stroke-slate-400">
            <StarIco value={1} maxCount={1} size={19}/>
          </div>
          <div className="searched-items stroke-slate-400">

            <p><SearchHistoryIco size={16} fillColor={"#64748b"}/></p>
          </div>
          <div className="reviewed-items stroke-slate-400">
            <p><CommentIco className={"fill-slate-400 "} size={20}/></p>
          </div>
        </div> */}
        
      </div>
    )
  }
  

  const DashHeader=({content})=>{
    return(
      <div className="dash-headder">
        {
          content ? 
            content()
          : <UserHeader/>
        }
      </div>
    )
  }
  const DashContent =({content})=>{
    const [activeTabIdx, setActiveTabIdx] = useState(0)
    const DashTabs = ()=>(
      <>
        <div className="tab-names w-full  flex flex-row">
          {
            tabs.map((tab, idx) => {
              return (
                <ul className={(activeTabIdx === idx ? " border-t  rounded-t-lg  " : " border-b  " + (idx === activeTabIdx - 1 ? "  rounded-br-lg " : idx === activeTabIdx + 1 ? "  rounded-bl-lg  " : "")) + " border-orange-600  px-2 flex flex-row cursor-pointer transition delay-75"}>
                  <li onClick={(e) => (e.preventDefault(), setActiveTabIdx(idx))}>{tab.key}</li>
                </ul>
              )
            })
          }
        </div>
        <div className="tab-content w-full">
          <TabsComponents tabs={tabs} activeTabIdx={activeTabIdx} />
        </div>
      </>
    )
    return(
      <div className="dash-content w-full px-4 flex flex-col gap-4 ">

        {
          content ?
            content()
          : <DashTabs/>
        }
      </div>
    )
  }
  const ContentSections = ({tab})=>{
    return(
      <>
        <DashHeader content={tab?.content?.component?.header} />
        <DashContent content={tab?.content?.component?.content} />
      </>
    )
  }
  return (
    <div className='user-dashboard-wrapper flex flex-row'>
      <Sidebar tabs={sidebarTabs} />
      <div className="user-dashboard-content w-full">
        <ContentSections tabs={sidebarTabs[location.hash||"#dashboard"]} />
      </div>
    </div>
  )
}

export default UserDashboard