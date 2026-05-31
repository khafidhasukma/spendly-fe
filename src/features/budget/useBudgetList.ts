import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { budgetApi, categoriesApi } from '@/api';
import type { BudgetItem, BudgetSummary } from '@/types/budget';
import type { ApiCategory } from '@/types';

export function useBudgetList() {
  const [budgets, setBudgets] = useState<BudgetItem[]>([]);
  const [summary, setSummary] = useState<BudgetSummary | undefined>();
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAll = useCallback(async () => {
    setIsLoading(true);
    try {
      const [budgetData, summaryData, categoryData] = await Promise.all([
        budgetApi.getAll(),
        budgetApi.getSummary(),
        categoriesApi.getAll('expense'),
      ]);
      setBudgets(budgetData);
      setSummary(summaryData);
      setCategories(categoryData);
    } catch {
      toast.error('Failed to load budgets');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchAll();
  }, [fetchAll]);

  return { budgets, summary, categories, isLoading, refetch: fetchAll };
}
