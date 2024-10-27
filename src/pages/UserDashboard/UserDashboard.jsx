import React, { lazy, useState, useEffect, Suspense } from 'react'
import { LoadingStateComponent, Sidebar } from '../../components';
import { AvatarIco } from '../../components/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authenticatedUsers } from '../../orm/selectors';
import { useGetUserQuery, useLogoutUserMutation } from '../../js/middleware/queryHandler';
import { createdToastMessage } from '../../orm/models/ToastMessageModel';
import types from '../../orm/actions/actionTypes';

// Lazy load components
const Overview = lazy(() => import('../../components/Overview'));
// const MyOrders = lazy(() => import('./MyOrders'));
// const MyFavorites = lazy(() => import('./MyFavorites'));
// const MyReviews = lazy(() => import('./MyReviews'));
// const Settings = lazy(() => import('./Settings'));
// const Help = lazy(() => import('./Help'));

const UserDashboard = ({ navigation, secondaryNavigation }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('#overview');

  useEffect(() => {
    const hash = location.hash || '#overview';
    setActiveTab(hash);
  }, [location]);

  const authId = useSelector(authenticatedUsers)[0]?.uuid;
  // const { data: user, isLoading, isError, error } = useGetUserQuery({ uuid: authId });
  const [logoutUser, {isLoading: logoutIsLoading, isError: logoutIsError, error: logoutError, isSuccess: logoutIsSuccess}] = useLogoutUserMutation();

  const allTabs = [...navigation, {name: "divider"}, ...secondaryNavigation];

  const renderContent = () => {
    const ActiveComponent = allTabs.find(tab => tab.href === activeTab)?.component || Overview;
    return (
      <Suspense fallback={<LoadingStateComponent />}>
        <ActiveComponent />
      </Suspense>
    );
  };
  
  const handleLogout = () => {
    logoutUser();
    navigate("/");
  }

  const handleTabClick = (tabHref) => {
    if(tabHref === "#logout"){
      handleLogout();
    }else{
      setActiveTab(tabHref);
      navigate(`/me${tabHref}`);
    }
  };

  const sidebarTabs = allTabs.map((item) => (
    item.name === "divider" ? <div key={item.id} className="w-full my-2 h-[1px] bg-gray-200" /> :
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
  
  if(logoutIsLoading){
    return <LoadingStateComponent />
  }
  if(logoutIsError){
    dispatch(createdToastMessage({
      status: types.TOAST_VALID,
      text: {
        header: "Error",
        body: logoutError.message
      },
      type: types.TOAST_ERROR,
      id: "logout error"
    }));
  }

  if(logoutIsSuccess){
    navigate("/");
  }

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
