const RatingStars = ({ rating, reviewCount, questionCount }) => (
  <div className="flex flex-wrap items-center gap-2">
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <span 
          key={i} 
          className={`text-lg ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
        >
          ★
        </span>
      ))}
      <span className="ml-2 text-gray-600">{rating}</span>
    </div>
    <span className="text-gray-500">• {reviewCount} отзыва</span>
    <span className="text-gray-500">• {questionCount} вопрос</span>
  </div>
);

export default RatingStars; 