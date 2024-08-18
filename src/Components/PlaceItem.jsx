import React, { forwardRef } from 'react';
import Rating from './Rating';
import DefaultPlaceImg from '../assets/images/default_place.png';
import { formatSnakeCase } from '../Utils';
import './PlaceItem.scss';

const PlaceItem = forwardRef(
  ({ active, name, rating = 0, user_ratings_total = 0, vicinity, photos = [], type, onClick }, ref) => {
    const imageUrl = photos.length
      ? `${photos[0].getUrl()}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
      : DefaultPlaceImg;

    return (
      <div ref={ref} className={`PlaceItem ${active ? 'active' : ''}`} onClick={onClick}>
        <div className="top-content">
          <img className="item-image" alt={name} src={imageUrl} />
          <div className="details">
            <p className="item-name">{name}</p>
            <p className="item-rating">
              {rating} <Rating rating={rating} /> ({user_ratings_total})
            </p>
            <p className="item-type">{formatSnakeCase(type)}</p>
          </div>
        </div>
        <p className="item-address">{vicinity}</p>
      </div>
    );
  },
);

export default React.memo(PlaceItem);
