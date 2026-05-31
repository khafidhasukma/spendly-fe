import { useEffect, useReducer, useCallback, useState } from 'react';
import { categoriesApi } from '@/api';
import type { ApiCategory } from '@/types';

type State =
  | { status: 'loading' }
  | { status: 'success'; categories: ApiCategory[] }
  | { status: 'error' };

type Action =
  | { type: 'LOADING' }
  | { type: 'SUCCESS'; payload: ApiCategory[] }
  | { type: 'ERROR' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
  case 'LOADING': return { status: 'loading' };
  case 'SUCCESS': return { status: 'success', categories: action.payload };
  case 'ERROR':   return { status: 'error' };
  default: return state;
  }
}

export function useCategoriesList() {
  const [state, dispatch] = useReducer(reducer, { status: 'loading' });
  const [tick, setTick] = useState(0);

  const refetch = useCallback(() => setTick((t) => t + 1), []);

  useEffect(() => {
    let cancelled = false;
    dispatch({ type: 'LOADING' });
    categoriesApi.getAll()
      .then((cats) => { if (!cancelled) dispatch({ type: 'SUCCESS', payload: cats }); })
      .catch(() => { if (!cancelled) dispatch({ type: 'ERROR' }); });
    return () => { cancelled = true; };
  }, [tick]);

  return { state, refetch };
}
