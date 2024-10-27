import React from 'react';
import { Link } from 'react-router-dom';

const RecentReturns = ({ returns }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Recent Returns</h3>
      <ul className="space-y-2">
        {returns.map((returnItem) => (
          <li key={returnItem.uuid} className="flex justify-between items-center">
            <Link to={`/return/${returnItem.uuid}`} className="max-w-40 text-blue-600 hover:underline truncate">Return #{returnItem.uuid}</Link>
            <span className="text-sm text-gray-500">{returnItem.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentReturns;
