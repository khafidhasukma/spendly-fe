import {
  UtensilsCrossed,
  ShoppingBag,
  ShoppingCart,
  Shirt,
  HeartPulse,
  Scissors,
  Zap,
  Fuel,
  Car,
  Home,
  House,
  LayoutGrid,
  Coffee,
  Monitor,
  Dumbbell,
  BookOpen,
  Plane,
  Music,
  Wifi,
  Pill,
  Baby,
  PawPrint,
  Gift,
  Wrench,
  Smartphone,
  Bus,
  Train,
  Bike,
  Gamepad2,
  Wallet,
  CreditCard,
  Banknote,
  Building2,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';
import type { CategoryIconOption, ColorOption } from '@/types';

// map by kebab-id (used in ICON_OPTIONS)
export const ICON_OPTIONS: CategoryIconOption[] = [
  { id: 'UtensilsCrossed', label: 'F&B',          icon: UtensilsCrossed },
  { id: 'ShoppingBag',     label: 'Shopping',      icon: ShoppingBag    },
  { id: 'ShoppingCart',    label: 'Groceries',     icon: ShoppingCart   },
  { id: 'Shirt',           label: 'Lifestyle',     icon: Shirt          },
  { id: 'HeartPulse',      label: 'Health',        icon: HeartPulse     },
  { id: 'Scissors',        label: 'Beauty (alt)',  icon: Scissors       },
  { id: 'Sparkles',        label: 'Beauty',        icon: Sparkles       },
  { id: 'Zap',             label: 'Electricity',   icon: Zap            },
  { id: 'Fuel',            label: 'Gas',           icon: Fuel           },
  { id: 'Car',             label: 'Transport',     icon: Car            },
  { id: 'Home',            label: 'Home',          icon: Home           },
  { id: 'House',           label: 'Household',     icon: House          },
  { id: 'LayoutGrid',      label: 'Others',        icon: LayoutGrid     },
  { id: 'Coffee',          label: 'Coffee',        icon: Coffee         },
  { id: 'Monitor',         label: 'Electronics',   icon: Monitor        },
  { id: 'Dumbbell',        label: 'Fitness',       icon: Dumbbell       },
  { id: 'BookOpen',        label: 'Education',     icon: BookOpen       },
  { id: 'Plane',           label: 'Travel',        icon: Plane          },
  { id: 'Music',           label: 'Entertainment', icon: Music          },
  { id: 'Wifi',            label: 'Internet',      icon: Wifi           },
  { id: 'Pill',            label: 'Medicine',      icon: Pill           },
  { id: 'Baby',            label: 'Kids',          icon: Baby           },
  { id: 'PawPrint',        label: 'Pets',          icon: PawPrint       },
  { id: 'Gift',            label: 'Gifts',         icon: Gift           },
  { id: 'Wrench',          label: 'Repairs',       icon: Wrench         },
  { id: 'Smartphone',      label: 'Phone',         icon: Smartphone     },
  { id: 'Bus',             label: 'Bus',           icon: Bus            },
  { id: 'Train',           label: 'Train',         icon: Train          },
  { id: 'Bike',            label: 'Bike',          icon: Bike           },
  { id: 'Gamepad2',        label: 'Gaming',        icon: Gamepad2       },
  { id: 'Wallet',          label: 'Wallet',        icon: Wallet         },
  { id: 'CreditCard',      label: 'Card',          icon: CreditCard     },
  { id: 'Banknote',        label: 'Cash',          icon: Banknote       },
  { id: 'Building2',       label: 'Office',        icon: Building2      },
];

// fast lookup by PascalCase name (as returned by the API)
const ICON_BY_NAME: Record<string, LucideIcon> = Object.fromEntries(
  ICON_OPTIONS.map((o) => [o.id, o.icon]),
);

export function getIconByName(name: string | null | undefined): LucideIcon {
  if (!name) return LayoutGrid;
  return ICON_BY_NAME[name] ?? LayoutGrid;
}

export const COLOR_PALETTE: ColorOption[] = [
  { color: 'text-orange-500', bgColor: 'bg-orange-100 dark:bg-orange-500/20' },
  { color: 'text-blue-500',   bgColor: 'bg-blue-100 dark:bg-blue-500/20'   },
  { color: 'text-red-500',    bgColor: 'bg-red-100 dark:bg-red-500/20'     },
  { color: 'text-pink-500',   bgColor: 'bg-pink-100 dark:bg-pink-500/20'   },
  { color: 'text-green-500',  bgColor: 'bg-green-100 dark:bg-green-500/20' },
  { color: 'text-yellow-500', bgColor: 'bg-yellow-100 dark:bg-yellow-500/20' },
  { color: 'text-slate-500',  bgColor: 'bg-slate-100 dark:bg-slate-500/20' },
  { color: 'text-gray-500',   bgColor: 'bg-gray-100 dark:bg-gray-500/20'   },
  { color: 'text-purple-500', bgColor: 'bg-purple-100 dark:bg-purple-500/20' },
  { color: 'text-teal-500',   bgColor: 'bg-teal-100 dark:bg-teal-500/20'   },
  { color: 'text-indigo-500', bgColor: 'bg-indigo-100 dark:bg-indigo-500/20' },
  { color: 'text-amber-600',  bgColor: 'bg-amber-100 dark:bg-amber-500/20' },
];

export function getNextColor(index: number): ColorOption {
  return COLOR_PALETTE[index % COLOR_PALETTE.length];
}

// derive a tinted bg rgba from a hex color string — safe against null/undefined
export function hexTint(hex: string | null | undefined, alpha = 0.12): string {
  if (!hex || hex.length < 7) return `rgba(107,114,128,${alpha})`;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  if (isNaN(r) || isNaN(g) || isNaN(b)) return `rgba(107,114,128,${alpha})`;
  return `rgba(${r},${g},${b},${alpha})`;
}
