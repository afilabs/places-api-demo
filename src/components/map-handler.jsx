import React, { useEffect, useState } from "react";
import { useMap } from "@vis.gl/react-google-maps";

const MapHandler = ({ place }) => {
  const map = useMap();
  const [circle, setCircle] = useState(null);

  useEffect(() => {
    if (!map || !place) return;

    if (place.geometry?.viewport) {
      map.fitBounds(place.geometry?.viewport);

      circle?.setMap(null);
      setCircle(
        new window.google.maps.Circle({
          strokeColor: "rgba(0, 148, 255, 1)",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "rgba(0, 148, 255, 0.35)",
          fillOpacity: 0.35,
          map,
          center: place.geometry?.location,
          radius: 500,
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, place]);

  return null;
};

export default React.memo(MapHandler);
