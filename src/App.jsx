import React, { useMemo, useState } from "react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

import MapHandler from "./components/map-handler";
import PlaceAutocomplete from "./components/place-autocomplete";
import NearbyPlaces from "./components/nearby-places";
import { PLACE_MARKERS } from "./constants";

import "./App.scss";

const App = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [allNearbySearchResult, setAllNearbySearchResult] = useState([]);
  const [nearbySearchResult, setNearbySearchResult] = useState([]);

  const renderLeftMapBox = useMemo(
    () => (
      <div className="left-box-map">
        <label>Your location</label>
        <PlaceAutocomplete
          onPlaceSelect={setSelectedPlace}
          onSetNearbySearchResult={setAllNearbySearchResult}
        />
        <NearbyPlaces
          allNearbySearchResult={allNearbySearchResult}
          nearbySearchResult={nearbySearchResult}
          onSetNearbySearchResult={setNearbySearchResult}
        />
      </div>
    ),
    [allNearbySearchResult, nearbySearchResult]
  );

  return (
    <APIProvider apiKey={process.env.REACT_APP_GOOGLE_API_KEY}>
      <Map
        defaultZoom={3}
        defaultCenter={{ lat: 12.6613229, lng: 107.9451323 }}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
      />
      {renderLeftMapBox}
      <MapHandler place={selectedPlace} />
      {nearbySearchResult?.map((item) => (
        <Marker
          key={item.place_id}
          position={item.geometry?.location}
          icon={{
            url: PLACE_MARKERS[item?.types[0]] || PLACE_MARKERS.bank,
            scaledSize: new window.google.maps.Size(38, 38),
          }}
        />
      ))}
    </APIProvider>
  );
};

export default App;
