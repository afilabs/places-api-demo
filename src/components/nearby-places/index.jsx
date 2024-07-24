import React, { useEffect, useMemo, useState } from "react";
import ReactSelect, { components } from "react-select";

import PlaceList from "./place-list";
import { PLACE_TYPE_OPTIONS } from "../../constants";

import "./index.scss";

const CustomMultiValue = (props) => {
  return (
    <components.MultiValue {...props}>
      <div style={{ display: "flex", alignItems: "center", columnGap: 6 }}>
        <img
          alt={props.data.label}
          src={props.data.icon}
          style={{ width: 20, height: 20 }}
        />
        <span>{props.data.label}</span>
      </div>
    </components.MultiValue>
  );
};

const CustomOption = (props) => {
  return (
    <components.Option {...props}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          columnGap: 6,
          padding: 6,
          backgroundColor: props.data.bgColor,
        }}
      >
        <span
          style={{ height: 8, width: 8, backgroundColor: props.data.color }}
        />
        <span>{props.data.label}</span>
      </div>
    </components.Option>
  );
};

const NearbyPlaces = ({
  allNearbySearchResult,
  nearbySearchResult,
  onSetNearbySearchResult,
}) => {
  const [selectedTypes, setSelectedTypes] = useState([]);

  useEffect(() => {
    onSetNearbySearchResult([...allNearbySearchResult]);
  }, [allNearbySearchResult, onSetNearbySearchResult]);

  const allPlaceTypes = useMemo(() => {
    const allTypes = PLACE_TYPE_OPTIONS.filter((typeOption) =>
      [
        ...new Set(
          allNearbySearchResult?.reduce(
            (types, curPlace) => [...types, ...(curPlace.types || [])],
            []
          )
        ),
      ]?.includes(typeOption.value)
    );
    setSelectedTypes(allTypes);

    return allTypes;
  }, [allNearbySearchResult]);

  const handleChangePlaceTypeFilter = (types) => {
    const typeValues = types?.map(({ value }) => value);
    onSetNearbySearchResult(
      allNearbySearchResult?.filter(
        (place) =>
          place.types?.filter((type) => typeValues?.includes(type))?.length
      )
    );
    setSelectedTypes(types);
  };

  return (
    <div className="nearby-places-container">
      <label className="place-type-filter">Place Types</label>
      <ReactSelect
        closeMenuOnSelect={false}
        value={selectedTypes}
        isMulti
        options={allPlaceTypes}
        components={{
          MultiValue: CustomMultiValue,
          Option: CustomOption,
        }}
        onChange={handleChangePlaceTypeFilter}
      />
      <PlaceList placeList={nearbySearchResult} />
    </div>
  );
};

export default React.memo(NearbyPlaces);
