import React, { useEffect, useRef } from 'react';
import PlaceItem from './PlaceItem';
import './PlaceList.scss';

const PlaceList = ({ placeList = [], activePlace, onPlaceClick }) => {
  const itemRefs = useRef({});

  useEffect(() => {
    if (activePlace && itemRefs.current[activePlace.place_id]) {
      itemRefs.current[activePlace.place_id].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [activePlace]);

  return (
    <div className="PlaceList">
      {placeList.map((place) => (
        <PlaceItem
          key={place.place_id}
          ref={(el) => (itemRefs.current[place.place_id] = el)}
          {...place}
          active={activePlace.place_id === place.place_id}
          onClick={() => onPlaceClick(place)}
        />
      ))}
    </div>
  );
};

export default React.memo(PlaceList);
