import React, { useState, useEffect } from 'react';
import { LoadingStateComponent } from '../../components';

const MyFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating an API call
    setTimeout(() => {
      setFavorites([
        { id: 1, name: 'Product 1', price: 19.99 },
        { id: 2, name: 'Product 2', price: 29.99 },
        { id: 3, name: 'Product 3', price: 39.99 },
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) return <LoadingStateComponent />;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Favorites</h2>
      {favorites.length === 0 ? (
        <p>You haven't added any favorites yet.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map((item) => (
            <li key={item.id} className="border p-4 rounded-lg">
              <h3 className="font-semibold">{item.name}</h3>
              <p>${item.price.toFixed(2)}</p>
              <button className="mt-2 bg-orange-500 text-white px-4 py-2 rounded">
                Add to Cart
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyFavorites;
