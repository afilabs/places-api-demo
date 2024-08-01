import React from 'react';

import StarRateIcon from '../assets/images/star_rate.svg';
import HalfStarRateIcon from '../assets/images/star_half.svg';

const Rating = ({ rating = 0 }) => {
  const ratingNum = +(rating || 0);
  const fullStars = Math.floor(ratingNum);
  const hasHalfStar = ratingNum % 1 > 0;

  if (!ratingNum) return null;

  return (
    <>
      {[...Array(fullStars)].map((_, index) => (
        <img key={`full-${index}`} width={20} alt="Star rate icon" src={StarRateIcon} />
      ))}
      {hasHalfStar && <img key="half" width={20} alt="Half star rate icon" src={HalfStarRateIcon} />}
    </>
  );
};

export default React.memo(Rating);
