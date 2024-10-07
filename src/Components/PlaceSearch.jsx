import React, { useEffect, useState, useCallback } from 'react';
import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps';

import PlaceAutocompleteInput from './PlaceAutocompleteInput';
import { PLACE_TYPES } from '../Constants';
import './PlaceSearch.scss';

const PlaceSearch = ({ onSelectPlace, onNearbyResultsReceived }) => {
  const map = useMap();
  const googleMaps = useMapsLibrary('places');

  const [placeService, setPlaceService] = useState(null);
  const [autocompleteToken, setAutocompleteToken] = useState(null);

  useEffect(() => {
    if (googleMaps && map) {
      setPlaceService(new googleMaps.PlacesService(map));
      setAutocompleteToken(new googleMaps.AutocompleteSessionToken());
    }
  }, [map, googleMaps]);

  const searchNearbyPlaces = useCallback(
    (placeDetails) => {
      if (!placeService || !placeDetails.geometry) return;

      const allTypes = Object.keys(PLACE_TYPES);

      placeService.nearbySearch(
        {
          location: placeDetails.geometry.location,
          radius: 500,
        },
        (results) => {
          const filteredPlaces = results
            .map((place) => ({
              ...place,
              type: place.types.find((t) => allTypes.includes(t)),
            }))
            .filter((place) => place.type);
          onNearbyResultsReceived(filteredPlaces);
        },
      );
    },
    [placeService, onNearbyResultsReceived],
  );

  const handlePlaceSelect = useCallback(
    (place) => {
      if (!place || !placeService) return;

      placeService.getDetails(
        {
          placeId: place.place_id,
          fields: ['geometry', 'name', 'formatted_address'],
          sessionToken: autocompleteToken,
        },
        (result) => {
          onSelectPlace(result);
          searchNearbyPlaces(result);
          setAutocompleteToken(new googleMaps.AutocompleteSessionToken());
        },
      );
    },
    [placeService],
  );

  return (
    <div className="PlaceSearch">
      <PlaceAutocompleteInput onPlaceSelect={handlePlaceSelect} />
    </div>
  );
};

export default React.memo(PlaceSearch);
