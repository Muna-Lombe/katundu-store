import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { filteredOrdersFromModel } from '../../orm/selectors';
import { LoadingStateComponent } from '../../components';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const itemsOrdered = useSelector(filteredOrdersFromModel());

  useEffect(() => {
    // Simulating an API call
    setTimeout(() => {
      setOrders(itemsOrdered);
      setIsLoading(false);
    }, 1000);
  }, [itemsOrdered]);

  if (isLoading) return <LoadingStateComponent />;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>
      {orders.length === 0 ? (
        <p>You haven't placed any orders yet.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li key={order.id} className="border p-4 rounded-lg">
              <h3 className="font-semibold">Order #{order.id}</h3>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
              <p>Total: ${order.total.toFixed(2)}</p>
              <p>Status: {order.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyOrders;
