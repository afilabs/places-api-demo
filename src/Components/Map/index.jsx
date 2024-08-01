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
        defaultZoom={10}
        defaultCenter={{ lat: 12.6613229, lng: 107.9451323 }}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
      />
      <MapHandler map={map} place={myLocation} />
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
    </>
  );
};

export default Map;
