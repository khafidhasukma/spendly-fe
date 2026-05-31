import { useCallback, useEffect, useReducer, useState } from 'react';
import { walletsApi } from '@/api';
import type { WalletsApiData } from '@/types';

type FetchState =
  | { status: 'loading'; data: null }
  | { status: 'success'; data: WalletsApiData }
  | { status: 'error'; data: null };

type FetchAction =
  | { type: 'LOADING' }
  | { type: 'SUCCESS'; payload: WalletsApiData }
  | { type: 'ERROR' };

function reducer(state: FetchState, action: FetchAction): FetchState {
  switch (action.type) {
  case 'LOADING': return { status: 'loading', data: null };
  case 'SUCCESS': return { status: 'success', data: action.payload };
  case 'ERROR':   return { status: 'error', data: null };
  default: return state;
  }
}

export function useWalletList() {
  const [tick, setTick] = useState(0);
  const [state, dispatch] = useReducer(reducer, { status: 'loading', data: null });

  useEffect(() => {
    let cancelled = false;
    dispatch({ type: 'LOADING' });
    walletsApi.getAll()
      .then((result) => { if (!cancelled) dispatch({ type: 'SUCCESS', payload: result }); })
      .catch(() => { if (!cancelled) dispatch({ type: 'ERROR' }); });
    return () => { cancelled = true; };
  }, [tick]);

  const refetch = useCallback(() => setTick((t) => t + 1), []);

  return {
    wallets: state.data?.wallets ?? [],
    recentActivity: state.data?.recent_activity ?? [],
    isLoading: state.status === 'loading',
    error: state.status === 'error',
    refetch,
  };
}
