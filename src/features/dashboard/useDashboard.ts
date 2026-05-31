import { useState, useEffect, useCallback, useReducer } from 'react';
import { dashboardApi } from '@/api';
import type { DashboardApiData } from '@/types/dashboard';

type FetchState =
  | { status: 'loading'; data: null; error: null }
  | { status: 'success'; data: DashboardApiData; error: null }
  | { status: 'error'; data: null; error: string };

type FetchAction =
  | { type: 'LOADING' }
  | { type: 'SUCCESS'; payload: DashboardApiData }
  | { type: 'ERROR'; payload: string };

function fetchReducer(state: FetchState, action: FetchAction): FetchState {
  switch (action.type) {
  case 'LOADING': return { status: 'loading', data: null, error: null };
  case 'SUCCESS': return { status: 'success', data: action.payload, error: null };
  case 'ERROR':   return { status: 'error', data: null, error: action.payload };
  default: return state;
  }
}

export interface DashboardState {
  data: DashboardApiData | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useDashboard(): DashboardState {
  const [tick, setTick] = useState(0);
  const [state, dispatch] = useReducer(
    fetchReducer,
    { status: 'loading', data: null, error: null },
  );

  useEffect(() => {
    let cancelled = false;
    dispatch({ type: 'LOADING' });
    dashboardApi.getDashboard()
      .then((result) => { if (!cancelled) dispatch({ type: 'SUCCESS', payload: result }); })
      .catch(() => { if (!cancelled) dispatch({ type: 'ERROR', payload: 'Failed to load dashboard data.' }); });
    return () => { cancelled = true; };
  }, [tick]);

  const refetch = useCallback(() => setTick((t) => t + 1), []);

  return {
    data: state.data,
    isLoading: state.status === 'loading',
    error: state.error,
    refetch,
  };
}
