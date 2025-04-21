import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { filteredOrdersFromModelV2 } from '../../orm/selectors';
import { LoadingStateComponent } from '../../components';
import { Link } from 'react-router-dom';

const MyOrders = () => {
  // const [orders, setOrders] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  const itemsOrdered = useSelector(filteredOrdersFromModelV2());

  // useEffect(() => {
  //   // Simulating an API call
  //   setTimeout(() => {
  //     setOrders(itemsOrdered);
  //     setIsLoading(false);
  //   }, 1000);
  // }, [itemsOrdered]);

  // if (isLoading) return <LoadingStateComponent />;
  // if (isError) return <BrokenConnection/>;

  // console.log("orders", itemsOrdered);
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>
      {(itemsOrdered?.length === 0) ? (
        <p>You haven't placed any orders yet.</p>
      ) : (
        <ul className="space-y-4">
          {itemsOrdered.map((order) => (
            <li key={order.uuid} className="border p-4 rounded-lg">
              <Link to={`/history`} state={{activeOrder: order.uuid}}>
                <h3 className="font-semibold">Order #{order.uuid}</h3>
                <p>Date: {new Date(order.orderDate).toLocaleDateString()}</p>
                <p>Total: ${order.orderCost.toFixed(2)}</p>
                <p>Status: {order.orderStatus}</p>
                <p>Items: {order.orderQuantity}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyOrders;
