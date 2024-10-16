import React, { lazy, useState, useEffect, Suspense } from 'react'
import { LoadingStateComponent, Sidebar } from '../../components';
import { AvatarIco } from '../../components/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authenticatedUsers } from '../../orm/selectors';
import { useGetUserQuery } from '../../js/middleware/queryHandler';

// Lazy load components
const Overview = lazy(() => import('../../components/Overview'));
const MyOrders = lazy(() => import('./MyOrders'));
const MyFavorites = lazy(() => import('./MyFavorites'));
const MyReviews = lazy(() => import('./MyReviews'));
const Settings = lazy(() => import('./Settings'));
const Help = lazy(() => import('./Help'));

const UserDashboard = ({ navigation, secondaryNavigation }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('#overview');

  useEffect(() => {
    const hash = location.hash || '#overview';
    setActiveTab(hash);
  }, [location]);

  const authId = useSelector(authenticatedUsers)[0]?.uuid;
  const { data: user, isLoading, isError, error } = useGetUserQuery({ uuid: authId });

  const allTabs = [...navigation, ...secondaryNavigation];

  const renderContent = () => {
    const ActiveComponent = allTabs.find(tab => tab.href === activeTab)?.component || Overview;
    return (
      <Suspense fallback={<LoadingStateComponent />}>
        <ActiveComponent />
      </Suspense>
    );
  };

  const handleTabClick = (tabHref) => {
    setActiveTab(tabHref);
    navigate(`/me${tabHref}`);
  };

  const sidebarTabs = allTabs.map((item) => (
    <button
      key={item.id}
      onClick={() => handleTabClick(item.href)}
      className={`w-full flex lg:flex-nowrap gap-2 text-nowrap text-left px-4 py-2 hover:bg-orange-200 hover:border-l hover:border-l-orange-600 hover:font-medium ${
        activeTab === item.href ? 'bg-slate-200 border-l border-l-orange-600 font-medium' : ''
      }`}
    >
      <item.icon className="inline-block mr-2 w-5 h-5" />
      {item.name}
    </button>
  ));

  return (
    <div className='user-dashboard-wrapper flex flex-row'>
      <Sidebar tabs={sidebarTabs} />
      <div className="user-dashboard-content w-full p-4">
        <div className="mt-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
