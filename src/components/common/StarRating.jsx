// Star rating component
const StarRating = ({ rating, reviews }) => (
  <div className="flex items-center gap-2">
    {[...Array(5)].map((_, i) => (
      <img
        key={i}
        src={i < rating ? '/icons/star-filled.svg' : '/icons/star.svg'}
        alt="star"
        className="w-4 h-4"
      />
    ))}
    <span className="text-xs ml-1">({reviews} Review{reviews !== 1 ? 's' : ''})</span>
  </div>
);
export default StarRating;