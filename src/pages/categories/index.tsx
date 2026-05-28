import { useState } from 'react';
import {
  UtensilsCrossed,
  Shirt,
  Heart,
  Scissors,
  ShoppingCart,
  Zap,
  Fuel,
  LayoutGrid,
} from 'lucide-react';
import PageHeader from '@/components/ui/page-header';
import { CategoriesEmptyState, CategoryCard, CategoriesFeaturesSection } from '@/components/categories';
import { usePageTitle } from '@/hooks';
import type { Category } from '@/types';

const INITIAL_CATEGORIES: Category[] = [
  { id: 'fnb',         iconId: 'utensils',      name: 'F&B',         icon: UtensilsCrossed, color: 'text-orange-500', bgColor: 'bg-orange-100 dark:bg-orange-500/20', transactions: 0, total: 0 },
  { id: 'apparels',    iconId: 'shirt',         name: 'Apparels',    icon: Shirt,           color: 'text-blue-500',   bgColor: 'bg-blue-100 dark:bg-blue-500/20',   transactions: 0, total: 0 },
  { id: 'health',      iconId: 'heart-pulse',   name: 'Health',      icon: Heart,           color: 'text-red-500',    bgColor: 'bg-red-100 dark:bg-red-500/20',    transactions: 0, total: 0 },
  { id: 'beauty',      iconId: 'scissors',      name: 'Beauty',      icon: Scissors,        color: 'text-pink-500',   bgColor: 'bg-pink-100 dark:bg-pink-500/20',   transactions: 0, total: 0 },
  { id: 'groceries',   iconId: 'shopping-cart', name: 'Groceries',   icon: ShoppingCart,    color: 'text-green-500',  bgColor: 'bg-green-100 dark:bg-green-500/20',  transactions: 0, total: 0 },
  { id: 'electricity', iconId: 'zap',           name: 'Electricity', icon: Zap,             color: 'text-yellow-500', bgColor: 'bg-yellow-100 dark:bg-yellow-500/20', transactions: 0, total: 0 },
  { id: 'gas',         iconId: 'fuel',          name: 'Gas',         icon: Fuel,            color: 'text-slate-500',  bgColor: 'bg-slate-100 dark:bg-slate-500/20',  transactions: 0, total: 0 },
  { id: 'others',      iconId: 'layout-grid',   name: 'Others',      icon: LayoutGrid,      color: 'text-gray-500',   bgColor: 'bg-gray-100 dark:bg-gray-500/20',   transactions: 0, total: 0 },
];


const CategoriesPage = () => {
  usePageTitle('Categories');
  const [categories] = useState<Category[]>(INITIAL_CATEGORIES);
  const hasTransactions = categories.some((c) => c.transactions > 0);

  return (
    <div className="space-y-6 sm:space-y-8 md:space-y-10">
      {/* Header */}
      <PageHeader
        breadcrumb={[
          { label: 'Dashboard', to: '/dashboard' },
          { label: 'Categories Management' },
        ]}
        title="Categories Management"
        description="Manage your spending categories to get more accurate financial reports."
      />

      {/* Category Grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:gap-5 lg:grid-cols-3 xl:grid-cols-4 xl:gap-6">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            {...category}
          />
        ))}
      </div>

      {/* Empty State */}
      {!hasTransactions && <CategoriesEmptyState />}

      {/* Features Section */}
      <CategoriesFeaturesSection />
    </div>
  );
};

export default CategoriesPage;