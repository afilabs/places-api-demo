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

      const allTypes = new Set(Object.keys(PLACE_TYPES));

      placeService.nearbySearch(
        {
          location: placeDetails.geometry.location,
          radius: 500,
        },
        (results) => {
          console.log(
            results.map((p) => ({
              types: p.types.join(', '),
              vicinity: p.vicinity,
              matchedType: p.types.find((t) => allTypes.has(t)),
            })),
          );
          const filteredPlaces = results
            .map((place) => ({
              ...place,
              type: place.types.find((t) => allTypes.has(t)),
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
    [placeService, onSelectPlace, searchNearbyPlaces, autocompleteToken],
  );

  return (
    <div className="place-search">
      <PlaceAutocompleteInput onPlaceSelect={handlePlaceSelect} />
    </div>
  );
};

export default React.memo(PlaceSearch);
