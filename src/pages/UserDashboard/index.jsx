import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserDashboard from './UserDashboard';

// Import icons
import {
  HomeIco,
  CogIcon,
  CheckedOutIcon,
  HeartIcon,
  ChatIcon,
  QuestionIcon,
  InfoIco
} from '../../components/icons';

// Import components
import Overview from '../../components/Overview';
import Help from './Help';
import Settings from './Settings';
import MyOrders from './MyOrders';
import MyFavorites from './MyFavorites';
import MyReviews from './MyReviews';
import { LogoutIcon } from '../../components/icons/otherIcons';
import About from '../About';

// Define navigation items
const navigation = [
  {
    id: 'overview',
    name: 'Overview',
    href: '#overview',
    icon: HomeIco,
    component: Overview,
  },
  {
    id: 'settings',
    name: 'Settings',
    href: '#settings',
    icon: CogIcon,
    component: Settings,
  },
  {
    id: 'my-orders',
    name: 'My Orders',
    href: '#my-orders',
    icon: CheckedOutIcon,
    component: MyOrders,
  },
  {
    id: 'my-favorites',
    name: 'My Favorites',
    href: '#my-favorites',
    icon: HeartIcon,
    component: MyFavorites,
  },
  {
    id: 'my-reviews',
    name: 'My Reviews',
    href: '#my-reviews',
    icon: ChatIcon,
    component: MyReviews,
  },
];

const secondaryNavigation = [
  { id: 'help', name: 'Help', href: '#help', icon: QuestionIcon, component: Help },
  { id: 'about', name: 'About', href: '#about', icon: InfoIco, component: About },
  { id: 'logout', name: 'Logout', href: '#logout', icon: LogoutIcon, component: null },
];

const UserDashboardIndex = () => {
  return (
    <Routes>
      <Route 
        path="/*" 
        element={
          <UserDashboard 
            navigation={navigation} 
            secondaryNavigation={secondaryNavigation} 
          />
        } 
      />
    </Routes>
  );
};

export default UserDashboardIndex;
