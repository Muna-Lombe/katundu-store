import React from 'react';
import { useSelector } from 'react-redux';
import { authenticatedUsers } from '../orm/selectors';
import { useGetUserQuery } from '../js/middleware/queryHandler';
import { SecurityCheckIcon, ClockIcon, SecurityAttentionIcon } from '../components/icons/otherIcons';
import { StarIco } from './icons';
import LoadingStateComponent from './LoadingStateComponent';
import RecentlyViewedProducts from './RecentlyViewedProducts';
import RecentOrders from './RecentOrders';
import RecentReturns from './RecentReturns';
import Bonuses from './Bonuses';

const Overview = () => {
  const authId = useSelector(authenticatedUsers)[0]?.uuid;
  const { data: user, isLoading, isError } = useGetUserQuery({ uuid: authId });

  // Mock data for new components (replace with actual data fetching logic)
  const recentlyViewedProducts = [
    { id: 1, name: 'Product 1', image: 'path/to/image1.jpg' },
    { id: 2, name: 'Product 2', image: 'path/to/image2.jpg' },
    { id: 3, name: 'Product 3', image: 'path/to/image3.jpg' },
  ];

  const recentOrders = [
    { id: 1001, date: '2023-05-01' },
    { id: 1002, date: '2023-04-28' },
    { id: 1003, date: '2023-04-25' },
  ];

  const recentReturns = [
    { id: 101, status: 'Pending' },
    { id: 102, status: 'Approved' },
  ];

  const bonuses = [
    { id: 1, name: 'Loyalty Points', value: '500 pts' },
    { id: 2, name: 'Birthday Discount', value: '10% off' },
  ];

  if (isLoading) return <div><LoadingStateComponent /></div>;
  if (isError) return <div>Error loading user data</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Account Overview</h1>
      
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
            <li className="flex items-center">
              <ClockIcon className="h-5 w-5 mr-2 text-gray-400" />
              Last login: {new Date(user.lastLogin).toLocaleString()}
            </li>
            <li className="flex items-center">
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
          <div className="space-y-2">
            <button className="w-full bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition duration-300">
              Update Profile
            </button>
            <button className="w-full bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition duration-300">
              Change Password
            </button>
            <button className="w-full bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition duration-300">
              View Orders
            </button>
          </div>
        </section>

        {/* Recently Viewed Products */}
        <section className="bg-white p-6 rounded-lg shadow">
          <RecentlyViewedProducts products={recentlyViewedProducts} />
        </section>

        {/* Recent Orders */}
        <section className="bg-white p-6 rounded-lg shadow">
          <RecentOrders orders={recentOrders} />
        </section>

        {/* Recent Returns */}
        <section className="bg-white p-6 rounded-lg shadow">
          <RecentReturns returns={recentReturns} />
        </section>

        {/* Bonuses */}
        <section className="bg-white p-6 rounded-lg shadow">
          <Bonuses bonuses={bonuses} />
        </section>
      </div>
    </div>
  );
};

export default Overview;
