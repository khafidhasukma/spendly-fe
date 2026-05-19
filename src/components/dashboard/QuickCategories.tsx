import {
  ShoppingBag,
  ShoppingCart,
  Scissors,
  Fuel,
  UtensilsCrossed,
  HeartPulse,
  Home,
  Zap,
  Car,
  type LucideIcon,
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface QuickCategory {
  id: string;
  label: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
}

const categories: QuickCategory[] = [
  { id: 'lifestyle',    label: 'Lifestyle',    icon: ShoppingBag,     color: 'text-purple-500', bgColor: 'bg-purple-50 dark:bg-purple-500/20'   },
  { id: 'groceries',   label: 'Groceries',    icon: ShoppingCart,    color: 'text-green-500',  bgColor: 'bg-green-50 dark:bg-green-500/20'    },
  { id: 'beauty',      label: 'Beauty',       icon: Scissors,        color: 'text-pink-500',   bgColor: 'bg-pink-50 dark:bg-pink-500/20'     },
  { id: 'gas',         label: 'Gas',          icon: Fuel,            color: 'text-orange-500', bgColor: 'bg-orange-50 dark:bg-orange-500/20'   },
  { id: 'fnb',         label: 'F&B',          icon: UtensilsCrossed, color: 'text-amber-600',  bgColor: 'bg-amber-50 dark:bg-amber-500/20'    },
  { id: 'health',      label: 'Health',       icon: HeartPulse,      color: 'text-red-500',    bgColor: 'bg-red-50 dark:bg-red-500/20'      },
  { id: 'household',   label: 'Household',    icon: Home,            color: 'text-blue-500',   bgColor: 'bg-blue-50 dark:bg-blue-500/20'     },
  { id: 'electricity', label: 'Electricity',  icon: Zap,             color: 'text-teal-500',   bgColor: 'bg-teal-50 dark:bg-teal-500/20'     },
  { id: 'transport',   label: 'Transport',    icon: Car,             color: 'text-indigo-500', bgColor: 'bg-indigo-50 dark:bg-indigo-500/20'   },
];

const QuickCategories = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-foreground font-manrope">Quick Categories</h2>
        <Link to="/categories" className="text-sm font-semibold text-primary hover:underline">
          View All
        </Link>
      </div>

      <div className="mt-4 grid grid-cols-9 gap-5">
        {categories.map(({ id, label, icon: Icon, color, bgColor }) => (
          <Link key={id} to="/categories" className="flex flex-col items-center">
            <div className="flex w-full flex-col items-center gap-2 rounded-lg border border-border bg-card p-4 hover:shadow-md transition-shadow">
              <div className={`flex h-12 w-12 items-center justify-center rounded-full ${bgColor}`}>
                <Icon className={`h-5 w-5 ${color}`} />
              </div>
              <span className="text-center text-xs font-semibold text-muted-foreground leading-tight">{label}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default QuickCategories;
