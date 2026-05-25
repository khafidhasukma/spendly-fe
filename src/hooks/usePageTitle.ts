import { useEffect } from 'react';

const usePageTitle = (page?: string) => {
  useEffect(() => {
    document.title = page ? `Spendly | ${page}` : 'Spendly';
    return () => {
      document.title = 'Spendly';
    };
  }, [page]);
};

export default usePageTitle;
