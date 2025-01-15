import { useCallback, useEffect, useRef, useState } from 'react';
import isDeepEqual from 'fast-deep-equal';

export function useCallbackRef() {
  const [el, setEl] = useState(null);
  const ref = useCallback((value) => setEl(value), [setEl]);

  return [el, ref];
}

export function useDeepCompareEffect(effect, deps) {
  const ref = useRef(undefined);

  if (!ref.current || !isDeepEqual(deps, ref.current)) {
    ref.current = deps;
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, ref.current);
}

export function useDebouncedEffect(effect, timeout, deps) {
  const timerRef = useRef(0);

  useEffect(
    () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = 0;
      }

      timerRef.current = setTimeout(() => effect(), timeout);
      return () => clearTimeout(timerRef.current);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [timeout, ...deps],
  );
}
