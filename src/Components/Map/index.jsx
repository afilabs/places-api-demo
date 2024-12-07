import React, { useEffect } from 'react';
import { useMap, Map as Gmap } from '@vis.gl/react-google-maps';

import MapHandler from './MapHandler';
import Marker from './Marker';

const Map = ({ myLocation, places, activePlace, onMarkerClick }) => {
  const map = useMap();

  const handleMarkerClick = (place) => {
    onMarkerClick(place);
  };

  useEffect(() => {
    if (activePlace?.place_id) {
      map.panTo(activePlace.geometry?.location);
    }
  }, [activePlace, map]);

  return (
    <>
      <Gmap
        mapId={process.env.REACT_APP_GOOGLE_MAP_ID}
        defaultZoom={12}
        defaultCenter={{ lat: 49.25307278849622, lng: -123.12095840000302 }}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
      >
        <MapHandler map={map} place={myLocation} />
        {myLocation && <Marker style={{ width: 30 }} key="home" type="Home" position={myLocation.geometry?.location} />}
        {places?.map((place) => (
          <Marker
            active={activePlace.place_id === place.place_id}
            style={{ width: 30 }}
            key={place.place_id}
            type={place.type}
            position={place.geometry?.location}
            onToggle={() => handleMarkerClick(place)}
          />
        ))}
      </Gmap>
    </>
  );
};

export default Map;
