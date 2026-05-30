import { useEffect, useReducer, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { categoriesApi } from '@/api';
import { getIconByName, hexTint } from '@/lib/category-icons';
import type { ApiCategory } from '@/api/endpoints/categories';

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

const SkeletonItem = () => (
  <div className="flex flex-col items-center">
    <div className="flex w-full flex-col items-center gap-1.5 rounded-lg border border-border bg-card p-2.5 sm:p-3 lg:p-4">
      <div className="h-10 w-10 animate-pulse rounded-full bg-muted sm:h-11 sm:w-11 lg:h-12 lg:w-12" />
      <div className="h-3 w-12 animate-pulse rounded bg-muted" />
    </div>
  </div>
);

const QuickCategories = () => {
  const [state, dispatch] = useReducer(reducer, { status: 'loading' });
  const [tick, setTick] = useState(0);
  const refetch = useCallback(() => setTick((t) => t + 1), []);

  useEffect(() => {
    let cancelled = false;
    dispatch({ type: 'LOADING' });
    categoriesApi.getAll('expense')
      .then((cats) => { if (!cancelled) dispatch({ type: 'SUCCESS', payload: cats.slice(0, 9) }); })
      .catch(() => { if (!cancelled) dispatch({ type: 'ERROR' }); });
    return () => { cancelled = true; };
  }, [tick]);

  const categories = state.status === 'success' ? state.categories : [];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground font-manrope sm:text-2xl">
          Quick Categories
        </h2>
        <Link to="/categories" className="text-sm font-semibold text-primary hover:underline">
          View All
        </Link>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5 sm:gap-3 md:grid-cols-6 xl:grid-cols-9 md:gap-4 lg:mt-4 lg:gap-5">
        {state.status === 'loading'
          ? Array.from({ length: 9 }).map((_, i) => <SkeletonItem key={i} />)
          : state.status === 'error'
            ? (
              <div className="col-span-full py-4 text-center text-sm text-muted-foreground">
              Failed to load.{' '}
                <button type="button" onClick={refetch} className="text-primary hover:underline">
                Retry
                </button>
              </div>
            )
            : categories.map((cat) => {
              const Icon = getIconByName(cat.icon);
              return (
                <Link key={cat.id} to="/categories" className="flex flex-col items-center">
                  <div className="flex w-full flex-col items-center gap-1.5 rounded-lg border border-border bg-card p-2.5 transition-shadow hover:shadow-md sm:p-3 lg:p-4">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-full sm:h-11 sm:w-11 lg:h-12 lg:w-12"
                      style={{ backgroundColor: hexTint(cat.color) }}
                    >
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: cat.color }} />
                    </div>
                    <span className="text-center text-[10px] font-semibold leading-tight text-muted-foreground sm:text-xs">
                      {cat.name}
                    </span>
                  </div>
                </Link>
              );
            })
        }
      </div>
    </div>
  );
};

export default QuickCategories;
