import { dequal } from 'dequal';
import { useEffect, useRef } from 'react';

export default function useCustomCompareEffect(
  effect: () => void,
  deps: any[],
  depsEqual: typeof dequal,
) {
  const ref = useRef();

  if (!ref.current || !depsEqual(deps, ref.current)) {
    // @ts-ignore
    ref.current = deps;
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, ref.current);
}
