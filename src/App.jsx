import { APIProvider } from '@vis.gl/react-google-maps';
import React, { useEffect, useMemo, useState, useCallback } from 'react';
import Map from './Components/Map';
import { Map3D } from './Components/Map3D';
import PlaceList from './Components/PlaceList';
import PlaceSearch from './Components/PlaceSearch';
import PlaceTypeSelector from './Components/PlaceTypeSelector';
import { PLACE_TYPE_OPTIONS } from './Constants';
import { getAvailablePlaceTypeOptions } from './Utils';

import './App.scss';

const INITIAL_VIEW_PROPS = {
  center: { lat: 37.72809, lng: -119.64473, altitude: 1300 },
  range: 5000,
  heading: 61,
  tilt: 69,
  roll: 0,
};
console.log(process.env.REACT_APP_GOOGLE_API_KEY);

const key = `${process.env.REACT_APP_GOOGLE_API_KEY}`;

const Map3DExample = () => {
  const [viewProps, setViewProps] = useState(INITIAL_VIEW_PROPS);

  const handleCameraChange = useCallback((props) => {
    setViewProps((oldProps) => ({ ...oldProps, ...props }));
  }, []);

  return (
    <>
      <Map3D {...viewProps} onCameraChange={handleCameraChange} defaultLabelsDisabled />
    </>
  );
};

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
    <APIProvider apiKey={key}>
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
      <Map3DExample
      // myLocation={myLocation}
      // places={filteredPlaces}
      // activePlace={activePlace}
      // onMarkerClick={handlePlaceClick}
      />
    </APIProvider>
  );
};

export default App;
