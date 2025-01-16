import { APIProvider } from '@vis.gl/react-google-maps';
import React, { useEffect, useMemo, useState } from 'react';
import Map from './Components/Map';
import PlaceList from './Components/PlaceList';
import PlaceSearch from './Components/PlaceSearch';
import PlaceTypeSelector from './Components/PlaceTypeSelector';
import { PLACE_TYPE_OPTIONS } from './Constants';
import { getAvailablePlaceTypeOptions } from './Utils';

import './App.scss';

const App = () => {
  const [myLocation, setMyLocation] = useState(null);
  const [allResults, setAllResults] = useState([]);
  const [selectedPlaceTypes, setSelectedPlaceTypes] = useState([]);
  const [activePlace, setActivePlace] = useState({});
  const [placeTypeOptions, setPlaceTypeOptions] = useState(PLACE_TYPE_OPTIONS);

  useEffect(() => {
    const availableOptions = getAvailablePlaceTypeOptions(allResults, PLACE_TYPE_OPTIONS);
    setPlaceTypeOptions(availableOptions);
    setSelectedPlaceTypes(availableOptions);
  }, [allResults]);

  const filteredPlaces = useMemo(() => {
    const types = selectedPlaceTypes.map(({ value }) => value);
    return allResults.filter((place) => types.includes(place.type));
  }, [allResults, selectedPlaceTypes]);

  const handlePlaceClick = (place) => {
    setActivePlace(activePlace.place_id !== place.place_id ? place : {});
  };

  return (
    <APIProvider apiKey={process.env.REACT_APP_GOOGLE_API_KEY}>
      <div className="control-panel">
        <label>Your location</label>
        <PlaceSearch onSelectPlace={setMyLocation} onNearbyResultsReceived={setAllResults} />
        <PlaceTypeSelector
          options={placeTypeOptions}
          onSelectionChange={setSelectedPlaceTypes}
          selectedOptions={selectedPlaceTypes}
        />
        <PlaceList placeList={filteredPlaces} activePlace={activePlace} onPlaceClick={handlePlaceClick} />
      </div>
      <Map myLocation={myLocation} places={filteredPlaces} activePlace={activePlace} onMarkerClick={handlePlaceClick} />
    </APIProvider>
  );
};

export default App;
