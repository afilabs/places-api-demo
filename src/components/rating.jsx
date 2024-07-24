import React from "react";

import StarRateIcon from "../assets/images/star_rate.svg";
import HalfStarRateIcon from "../assets/images/star_half.svg";

const Rating = ({ rating = 0 }) => {
  const ratingNum = +(rating || 0);

  return !ratingNum ? null : (
    <>
      {rating >= 1 && (
        <img width={20} alt="Star rate icon" src={StarRateIcon} />
      )}
      {rating >= 2 && (
        <img width={20} alt="Star rate icon" src={StarRateIcon} />
      )}
      {rating >= 3 && (
        <img width={20} alt="Star rate icon" src={StarRateIcon} />
      )}
      {rating >= 4 && (
        <img width={20} alt="Star rate icon" src={StarRateIcon} />
      )}
      {rating === 5 && (
        <img width={20} alt="Star rate icon" src={StarRateIcon} />
      )}
      {rating % 1 > 0 && (
        <img width={20} alt="Star rate icon" src={HalfStarRateIcon} />
      )}
    </>
  );
};

export default React.memo(Rating);
