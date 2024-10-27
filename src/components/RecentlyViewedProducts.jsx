import React from 'react';
import { Link } from 'react-router-dom';
import { encodeUrlWWWFormComponent } from '../utilities';

const RecentlyViewedProducts = ({ products }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Recently Viewed Products</h3>
      <ul className="space-y-2">
        {products.map((product) => (
          <li key={product.uuid} className="flex items-center space-x-2">
            <img src={product.image} alt={product.name} className="w-10 h-10 object-cover rounded" />
            <Link to={encodeUrlWWWFormComponent("/products/" + product?.name + "-" + product?.uuid)} className="text-blue-600 hover:underline">{product.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentlyViewedProducts;
