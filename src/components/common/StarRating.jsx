const StarRating = ({ rating, reviews }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2  items-center gap-2">
    <span className="flex items-center">
      {[...Array(5)].map((_, i) => (
      <img
        key={i}
        src={i < rating ? '/icons/star-filled.svg' : '/icons/star.svg'}
        alt="star"
        className="w-4 h-4"
      />
    ))}
    </span>
    <span className="text-xs ml-1">({reviews} Review{reviews !== 1 ? 's' : ''})</span>
  </div>
);
export default StarRating;
