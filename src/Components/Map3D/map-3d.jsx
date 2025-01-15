import { useMapsLibrary } from '@vis.gl/react-google-maps';
import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import { useMap3DCameraEvents } from './use-map-3d-camera-events';
import { useCallbackRef, useDeepCompareEffect } from './hooks';

export const Map3D = forwardRef((props, forwardedRef) => {
  useMapsLibrary('maps3d');

  const [map3DElement, map3dRef] = useCallbackRef();

  useMap3DCameraEvents(map3DElement, (p) => {
    if (!props.onCameraChange) return;

    props.onCameraChange(p);
  });

  const [customElementsReady, setCustomElementsReady] = useState(false);
  useEffect(() => {
    customElements.whenDefined('gmp-map-3d').then(() => {
      setCustomElementsReady(true);
    });
  }, []);

  const { center, heading, tilt, range, roll, ...map3dOptions } = props;

  useDeepCompareEffect(() => {
    if (!map3DElement) return;

    // copy all values from map3dOptions to the map3D element itself
    Object.assign(map3DElement, map3dOptions);
  }, [map3DElement, map3dOptions]);

  useImperativeHandle(forwardedRef, () => map3DElement, [map3DElement]);

  const centerString = useMemo(() => {
    const lat = center?.lat ?? 0.0;
    const lng = center?.lng ?? 0.0;
    const altitude = center?.altitude ?? 0.0;

    return [lat, lng, altitude].join(',');
  }, [center?.lat, center?.lng, center?.altitude]);

  if (!customElementsReady) return null;

  return (
    <gmp-map-3d
      ref={map3dRef}
      center={centerString}
      range={String(range)}
      heading={String(heading)}
      tilt={String(tilt)}
      roll={String(roll)}
    ></gmp-map-3d>
  );
});
