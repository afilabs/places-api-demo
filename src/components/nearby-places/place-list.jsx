import React from "react";

import Rating from "../rating";
import DefaultPlaceImg from "../../assets/images/default_place.png";
import { convertPlaceTypeLabel } from "../../utils";

const PlaceItem = ({
  name,
  rating,
  user_ratings_total,
  vicinity,
  photos,
  types,
}) => (
  <div className="place-item">
    <div className="top-content">
      <img
        className="left-img"
        alt={name}
        src={
          photos?.length
            ? `${photos[0].getUrl()}&key=${
                process.env.REACT_APP_GOOGLE_API_KEY
              }`
            : DefaultPlaceImg
        }
      />
      <div className="right-content">
        <p className="name">{name}</p>
        <p className="rating">
          {rating || 0} <Rating rating={rating || 0} /> (
          {user_ratings_total || 0})
        </p>
        <p className="place-type">{convertPlaceTypeLabel(types[0])}</p>
      </div>
    </div>
    <p className="address">{vicinity}</p>
  </div>
);

const PlaceList = ({ placeList }) => (
  <div className="place-list">
    {placeList?.map((place) => (
      <PlaceItem key={place.place_id} {...(place || {})} />
    ))}
  </div>
);

export default React.memo(PlaceList);
