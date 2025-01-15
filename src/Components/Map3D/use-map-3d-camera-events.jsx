import { useEffect, useRef } from 'react';

const cameraPropNames = ['center', 'range', 'heading', 'tilt', 'roll'];

const DEFAULT_CAMERA_PROPS = {
  center: { lat: 0, lng: 0, altitude: 0 },
  range: 0,
  heading: 0,
  tilt: 0,
  roll: 0,
};

/**
 * Binds event-listeners for all camera-related events to the Map3dElement.
 * The values from the events are aggregated into a Map3DCameraProps object,
 * and changes are dispatched via the onCameraChange callback.
 */
export function useMap3DCameraEvents(mapEl, onCameraChange) {
  const cameraPropsRef = useRef(DEFAULT_CAMERA_PROPS);

  useEffect(() => {
    if (!mapEl) return;

    const cleanupFns = [];

    let updateQueued = false;

    for (const p of cameraPropNames) {
      const removeListener = addDomListener(mapEl, `gmp-${p}change`, () => {
        const newValue = mapEl[p];

        if (newValue == null) return;

        if (p === 'center') {
          cameraPropsRef.current.center = newValue.toJSON();
        } else {
          cameraPropsRef.current[p] = newValue;
        }

        if (onCameraChange && !updateQueued) {
          updateQueued = true;

          // queue a microtask so all synchronously dispatched events are handled first
          queueMicrotask(() => {
            updateQueued = false;
            onCameraChange(cameraPropsRef.current);
          });
        }
      });

      cleanupFns.push(removeListener);
    }

    return () => {
      for (const removeListener of cleanupFns) removeListener();
    };
  }, [mapEl, onCameraChange]);
}

/**
 * Adds an event-listener and returns a function to remove it again.
 */
function addDomListener(element, type, listener) {
  element.addEventListener(type, listener);

  return () => {
    element.removeEventListener(type, listener);
  };
}
