import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import ProfileSettings from '../../components/settings/ProfileSettings'
import AccountSettings from '../../components/settings/AccountSettings'
import AddressSettings from '../../components/settings/AddressSettings'
import NotificationsSettings from '../../components/settings/NotificationsSettings'
import PrivacySettings from '../../components/settings/PrivacySettings'
import SecuritySettings from '../../components/settings/SecuritySettings'
import PaymentSettings from '../../components/settings/PaymentSettings'
import { PinLocation } from '../../components'
import { BellIcon, BriefcaseIcon, InfoIco, PinIco, UserIcon } from '../../components/icons'
import { PaymentIcon, PrivacyIcon, SecurityIcon } from '../../components/icons/otherIcons'

const Settings = () => {
  const location = useLocation()
  const [activeTab, setActiveTab] = useState('#profile-settings')

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  const tabs = [
    {name: "Profile Settings", icon: <UserIcon className="w-5 h-5" />, href: "#profile-settings"},
    {name: "Account Settings", icon: <BriefcaseIcon className="w-5 h-5" />, href: "#account-settings"},
    {name: "Address Settings", icon: <PinIco className="w-5 h-5" />, href: "#address-settings"},
    {name: "Notifications Settings", icon: <BellIcon className="w-5 h-5" />, href: "#notifications-settings"},
    {name: "Privacy Settings", icon: <PrivacyIcon className="w-5 h-5" />, href: "#privacy-settings"},
    {name: "Security Settings", icon: <SecurityIcon className="w-5 h-5" />, href: "#security-settings"},
    {name: "Payment Settings", icon: <PaymentIcon className="w-5 h-5" />, href: "#payment-settings"}
  ]

  const renderActiveSettings = () => {
    switch(activeTab) {
      case '#profile-settings':
        return <ProfileSettings classFn={classNames} />;
      case '#account-settings':
        return <AccountSettings classFn={classNames} />;
      case '#address-settings':
        return <AddressSettings classFn={classNames} />;
      case '#notifications-settings':
        return <NotificationsSettings classFn={classNames} />;
      case '#privacy-settings':
        return <PrivacySettings classFn={classNames} />;
      case '#security-settings':
        return <SecuritySettings classFn={classNames} />;
      case '#payment-settings':
        return <PaymentSettings classFn={classNames} />;
      default:
        return <ProfileSettings classFn={classNames} />;
    }
  }

  return (
    <div className="relative max-w-4xl mx-auto md:px-8 xl:px-0">
      <div className="pt-10 pb-16">
        <div className="px-4 sm:px-6 md:px-0">
          <h1 className="text-3xl font-extrabold text-gray-900">Settings</h1>
        </div>
        <div className="px-4 sm:px-6 md:px-0">
          <div className="py-6">
            {/* Tabs */}
            <div className="hidden lg:block">
              <div className="border-b border-gray-200">
                <nav className="-mb-px w-full flex space-x-8 items-center truncate text-ellipsis">
                  {tabs.map((tab) => (
                    <a
                      key={tab.name}
                      href={tab.href}
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveTab(tab.href);
                      }}
                      className={classNames(
                        tab.href === activeTab
                          ? 'border-orange-500 text-orange-600'
                          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                        'w-full whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex flex-row items-center truncate text-ellipsis'
                      )}
                    >
                      <span className='mr-2 w-fit'>
                        {tab.icon}
                      </span>

                      {tab.name}
                    </a>
                  ))}
                </nav>
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
