import React, { useState, useEffect } from 'react';
import { LoadingStateComponent } from '../../components';

const MyReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating an API call
    setTimeout(() => {
      setReviews([
        { id: 1, productName: 'Product 1', rating: 4, comment: 'Great product!' },
        { id: 2, productName: 'Product 2', rating: 5, comment: 'Excellent quality!' },
        { id: 3, productName: 'Product 3', rating: 3, comment: 'Good, but could be better.' },
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) return <LoadingStateComponent />;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Reviews</h2>
      {reviews.length === 0 ? (
        <p>You haven't written any reviews yet.</p>
      ) : (
        <ul className="space-y-4">
          {reviews.map((review) => (
            <li key={review.id} className="border p-4 rounded-lg">
              <h3 className="font-semibold">{review.productName}</h3>
              <p>Rating: {review.rating}/5</p>
              <p>{review.comment}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyReviews;
