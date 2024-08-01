import React, { useEffect, useState, useCallback } from 'react';
import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps';

import { PLACE_TYPES } from '../Constants';
import './PlaceSearch.scss';

const PlaceSearch = ({ onSelectPlace, onNearbyResultsReceived }) => {
  const map = useMap();
  const googleMaps = useMapsLibrary('places');

  const [autocomplete, setAutocomplete] = useState(null);
  const [placeService, setPlaceService] = useState(null);
  const [autocompleteToken, setAutocompleteToken] = useState(null);

  const [suggestions, setSuggestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!googleMaps || !map) return;

    setAutocomplete(new googleMaps.AutocompleteService());
    setPlaceService(new googleMaps.PlacesService(map));
    setAutocompleteToken(new googleMaps.AutocompleteSessionToken());

    return () => setAutocomplete(null);
  }, [map, googleMaps]);

  const handleFetchSuggestions = useCallback(
    async (term) => {
      if (!autocomplete || !term) {
        setSuggestions([]);
        return;
      }

      const request = { input: term, sessionToken: autocompleteToken };
      const response = await autocomplete.getPlacePredictions(request);
      setSuggestions(response.predictions);
    },
    [autocomplete, autocompleteToken],
  );

  const handleChange = useCallback(
    (event) => {
      const newValue = event.target.value;
      setSearchTerm(newValue);
      handleFetchSuggestions(newValue);
    },
    [handleFetchSuggestions],
  );

  const searchNearbyPlaces = useCallback(
    (placeDetails) => {
      const allTypes = new Set(Object.keys(PLACE_TYPES));

      const handleNearbyResults = (results) => {
        console.log(
          results.map((p) => ({
            types: p.types.join(', '),
            vicinity: p.vicinity,
            matchedType: p.types.find((t) => allTypes.has(t)),
          })),
        );
        const filteredPlaces = results.reduce((places, place) => {
          const type = place.types.find((t) => allTypes.has(t));
          if (type) {
            places.push({
              ...place,
              types: undefined,
              type,
            });
          }
          return places;
        }, []);

        onNearbyResultsReceived(filteredPlaces);
      };

      if (placeService) {
        placeService.nearbySearch(
          {
            location: placeDetails.geometry.location,
            radius: 500,
          },
          handleNearbyResults,
        );
      }
    },
    [placeService, onNearbyResultsReceived],
  );

  const handleSelectSuggestion = useCallback(
    (placeId) => {
      if (!placeService) return;

      const request = {
        placeId,
        fields: ['geometry', 'name', 'formatted_address'],
        sessionToken: autocompleteToken,
      };

      placeService.getDetails(request, (result) => {
        onSelectPlace(result);
        searchNearbyPlaces(result);
        setSuggestions([]);
        setSearchTerm(result.formatted_address || '');
        setAutocompleteToken(new googleMaps.AutocompleteSessionToken());
      });
    },
    [googleMaps, placeService, onSelectPlace, searchNearbyPlaces, autocompleteToken],
  );

  return (
    <div className="place-search">
      <input value={searchTerm} onChange={handleChange} placeholder="Search for a place" />

      {suggestions.length > 0 && (
        <ul className="suggestion-list">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.place_id}
              className="suggestion-item"
              onClick={() => handleSelectSuggestion(suggestion.place_id)}
            >
              {suggestion.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default React.memo(PlaceSearch);
