import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import ProfileSettings from '../../components/settings/ProfileSettings'
import AccountSettings from '../../components/settings/AccountSettings'
import AddressSettings from '../../components/settings/AddressSettings'
import NotificationsSettings from '../../components/settings/NotificationsSettings'
import PrivacySettings from '../../components/settings/PrivacySettings'
import SecuritySettings from '../../components/settings/SecuritySettings'
import PaymentSettings from '../../components/settings/PaymentSettings'
import { BellIcon, BriefcaseIcon, InfoIco, PinIco, UserIcon } from '../../components/icons'
import { PaymentIcon, PrivacyIcon, SecurityIcon } from '../../components/icons/otherIcons'
import DropDownMenu from '../../components/DropDownMenu'
import BrokenConnection from '../BrokenConnection'
import { LoadingStateComponent } from '../../components'
import { useGetUserSettingsQuery, useUpdateUserSettingsMutation } from '../../js/middleware/queryHandler'
import { authenticatedUsersV2 } from '../../orm/selectors'
import { useSelector } from 'react-redux'

const tabs = [
  {name: "Profile Settings", icon: <UserIcon className="w-5 h-5" />, href: ":~profile-settings"},
  {name: "Account Settings", icon: <BriefcaseIcon className="w-5 h-5" />, href: ":~account-settings"},
  {name: "Address Settings", icon: <PinIco className="w-5 h-5" />, href: ":~address-settings"},
  {name: "Notifications Settings", icon: <BellIcon className="w-5 h-5" />, href: ":~notifications-settings"},
  {name: "Privacy Settings", icon: <PrivacyIcon className="w-5 h-5" />, href: ":~privacy-settings"},
  {name: "Security Settings", icon: <SecurityIcon className="w-5 h-5" />, href: ":~security-settings"},
  {name: "Payment Settings", icon: <PaymentIcon className="w-5 h-5" />, href: ":~payment-settings"}
]
const Settings = () => {
  const location = useLocation()
  const [activeTab, setActiveTab] = useState( location?.state?.activeTabIdx ? {index: location?.state?.activeTabIdx, href: tabs[location?.state?.activeTabIdx]?.href} : {index:0,href:':~profile-settings'})
  
  
  const authId = useSelector(authenticatedUsersV2)[0]?.uuid;
  const {data: userSettingsData, isLoading, isError} = useGetUserSettingsQuery(authId, {skip: !activeTab.href.includes(':~profile-settings')})
  const [updateUserSettings] = useUpdateUserSettingsMutation()

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }


  const renderActiveSettings = () => {
    if (!userSettingsData) return null;

    switch(activeTab.href) {
      case ':~profile-settings':
        return <section id=':~profile-settings' className='w-full'>
          <ProfileSettings updateProfileSettings={(profileUpdate)=>updateUserSettings({uuid:authId, update: profileUpdate})} classFn={classNames} data={userSettingsData.profile} />
          
        </section>;
      case ':~account-settings':
        return <section className='w-full'><AccountSettings updateAccounteSettings={(accountUpdate)=>updateUserSettings({uuid:authId, update: accountUpdate})} classFn={classNames} data={userSettingsData.account} /></section>;
      case ':~address-settings':
        return <AddressSettings updateAddressSettings={(addressUpdate)=>updateUserSettings({uuid:authId, update: addressUpdate})} classFn={classNames} data={userSettingsData.address} />;
      case ':~notifications-settings':
        return <NotificationsSettings updateNotificationsSettings={(notificationsUpdate)=>updateUserSettings({uuid:authId, update: notificationsUpdate})} classFn={classNames} data={userSettingsData.notifications} />;
      case ':~privacy-settings':
        return <PrivacySettings updatePrivacySettings={(privacyUpdate)=>updateUserSettings({uuid:authId, update: privacyUpdate})} classFn={classNames} data={userSettingsData.privacy} />;
      case ':~security-settings':
        return <SecuritySettings updateSecuritySettings={(securityUpdate)=>updateUserSettings({uuid:authId, update: securityUpdate})} classFn={classNames} data={userSettingsData.security} />;
      case ':~payment-settings':
        return <PaymentSettings updatePaymentSettings={(paymentUpdate)=>updateUserSettings({uuid:authId, update: paymentUpdate})} classFn={classNames} data={userSettingsData.payment} />;
      default:
        return <ProfileSettings updateProfileSettings={(profileUpdate)=>updateUserSettings({uuid:authId, update: profileUpdate})} classFn={classNames} data={userSettingsData.profile} />;
    }
  }

  if (isLoading) return <div><LoadingStateComponent /></div>;
  if (isError) return <div><BrokenConnection/></div>;

  return (
    <div className="relative max-w-4xl mx-auto md:px-8 xl:px-0">
      <div className="pt-10 pb-16">
        <div className="px-4 sm:px-6 md:px-0">
          <h1 className="text-3xl font-extrabold text-gray-900">Settings</h1>
        </div>
        <div className="px-4 sm:px-6 md:px-0">
          <div className="py-6">
            {/* Tabs */}
            <div className="">
              <div className="border-b border-gray-200">
                <nav className="hidden lg:flex -mb-px w-full flex flex-row space-x-8 items-center truncate text-ellipsis">
                  {tabs.map((tab, idx) => (
                    <a
                      key={tab.name}
                      href={location.pathname + "#settings" + tab.href}
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveTab({ index: idx, href: tab.href });
                      }}
                      className={classNames(
                        tab.href === activeTab.href
                          ? 'border-orange-500 text-orange-600'
                          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                        'w-max whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex flex-row items-center truncate text-ellipsis'
                      )}
                    >
                      <span className='mr-2 w-fit'>
                        {tab.icon}
                      </span>

                      {tab.name}
                    </a>
                  ))}
                </nav>
                <div className="flex lg:hidden w-full flex justify-end items-center">
                  <DropDownMenu
                    menu={
                      {
                        name: tabs[activeTab.index].name.split(" ")[0], 
                        items: tabs.map((tab,idx)=>({
                          ...tab,
                          href: `#settings${tab.href}`,
                          fn: () => setActiveTab({index:idx, href:tab.href}), 
                          classNames: ()=>classNames(tab.href === activeTab.href ? 'border-orange-500 text-orange-600 ' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 ', ' w-full whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex flex-row items-center truncate text-ellipsis')
                        })), 
                        activeTab: activeTab.href,
                       
                      }
                    }
                    location={location}
                  />
                </div>
              </div>
            </div>
            
            {/* Settings content */}
            {renderActiveSettings()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
