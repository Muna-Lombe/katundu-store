import React from 'react';
import { useSelector } from 'react-redux';
import { authenticatedUsers } from '../orm/selectors';
import { useGetUserProfileOverviewQuery, useGetUserQuery } from '../js/middleware/queryHandler';
import { SecurityCheckIcon, ClockIcon, SecurityAttentionIcon } from '../components/icons/otherIcons';
import { StarIco } from './icons';
import LoadingStateComponent from './LoadingStateComponent';
import RecentlyViewedProducts from './RecentlyViewedProducts';
import RecentOrders from './RecentOrders';
import RecentReturns from './RecentReturns';
import Bonuses from './Bonuses';
import BrokenConnection from '../pages/BrokenConnection';
import { Link } from 'react-router-dom';

const Overview = () => {
  const authId = useSelector(authenticatedUsers)[0]?.uuid;
  const { data: user, isLoading, isError } = useGetUserQuery({ uuid: authId });
  const { data: profileOverview, isLoading: isProfileOverviewLoading, isError: isProfileOverviewError } = useGetUserProfileOverviewQuery({ uuid: authId });



  if (isLoading || isProfileOverviewLoading) return <div><LoadingStateComponent /></div>;
  if (isError || isProfileOverviewError) return <div><BrokenConnection/></div>;

  console.log("profileOverview", profileOverview)
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Account Overview</h1>
      
      <div className="bonuses mb-6">
        <Bonuses bonuses={profileOverview?.bonuses} />

      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Account Information */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Account Information</h2>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Member Since:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
        </section>

        {/* Recent Activity */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <ul className="space-y-2">
            <li className="flex items-center gap-1">
              <ClockIcon className="h-5 w-5 mr-2 text-gray-400" />
              Last login: {new Date(user.lastLogin).toLocaleString()}
            </li>
            <li className="flex items-center gap-1">
              <StarIco className="h-5 w-5 mr-2 text-gray-400" />
              Last order: 3 days ago
            </li>
          </ul>
        </section>

        {/* Account Security */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Account Security</h2>
          <ul className="space-y-2">
            <li className="flex items-center">
              <SecurityCheckIcon className="h-5 w-5 mr-2 text-green-500" />
              Two-factor authentication: {user.twoFactorEnabled ? 'Enabled' : 'Disabled'}
            </li>
            <li className="flex items-center">
              <SecurityAttentionIcon className="h-5 w-5 mr-2 text-yellow-500" />
              Password last changed: 30 days ago
            </li>
          </ul>
        </section>

        {/* Quick Actions */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-2 grid gap-2">
            <Link to="/me#settings" state={{activeTabIdx: 0}} className="w-[80%] bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition duration-300">
              Update Profile
            </Link>
            <Link to="/me#settings" state={{activeTabIdx: 5}} className="w-[80%] bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition duration-300">
              Change Password
            </Link>
            <Link to="/me#my-orders"  className="w-[80%] bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition duration-300">
              View Orders
            </Link>
          </div>
        </section>

        {/* Recently Viewed Products */}
        <section className="bg-white p-6 rounded-lg shadow">
          <RecentlyViewedProducts products={profileOverview?.recentlyViewedProducts} />
        </section>

        {/* Recent Orders */}
        <section className="bg-white p-6 rounded-lg shadow">
          <RecentOrders orders={profileOverview?.recentOrders} />
        </section>

        {/* Recent Returns */}
        <section className="bg-white p-6 rounded-lg shadow">
          <RecentReturns returns={profileOverview?.recentReturns} />
        </section>

        {/* Bonuses */}
        <section className="bg-white p-6 rounded-lg shadow">
          <Bonuses bonuses={profileOverview?.bonuses} />
        </section>
      </div>
    </div>
  );
};

export default Overview;
