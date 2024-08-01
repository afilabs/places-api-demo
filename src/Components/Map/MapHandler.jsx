import React, { useEffect, useRef } from 'react';

const MapHandler = ({ map, place }) => {
  const circleRef = useRef(null);

  useEffect(() => {
    if (!map || !place) return;

    if (place.geometry?.viewport) {
      map.setCenter(place.geometry?.location);
      map.setZoom(17);
    }

    const updateCircle = () => {
      if (circleRef.current) {
        circleRef.current.setCenter(place.geometry?.location);
      } else {
        circleRef.current = new window.google.maps.Circle({
          strokeColor: 'rgba(0, 148, 255, 1)',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: 'rgba(0, 148, 255, 0.35)',
          fillOpacity: 0.35,
          map,
          center: place.geometry?.location,
          radius: 500,
        });
      }
    };

    updateCircle();
  }, [map, place]);

  return null;
};

export default React.memo(MapHandler);
