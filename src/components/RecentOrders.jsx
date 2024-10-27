import React from 'react';
import { Link } from 'react-router-dom';

const RecentOrders = ({ orders }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Recent Orders</h3>
      <ul className="space-y-2">
        {orders.map((order) => (
          <li key={order.uuid} className="flex justify-between items-center">
            <Link to={`/order/${order.uuid}`} className="max-w-40 text-blue-600 hover:underline truncate">Order #{order.uuid}</Link>
            <span className="text-sm text-gray-500">{new Date(order.date).toLocaleDateString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentOrders;
