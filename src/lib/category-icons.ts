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
  type LucideIcon,
} from 'lucide-react';

export interface CategoryIconOption {
  id: string;
  label: string;
  icon: LucideIcon;
}

export const ICON_OPTIONS: CategoryIconOption[] = [
  { id: 'utensils',     label: 'F&B',         icon: UtensilsCrossed },
  { id: 'shopping-bag', label: 'Shopping',     icon: ShoppingBag    },
  { id: 'shopping-cart',label: 'Groceries',    icon: ShoppingCart   },
  { id: 'shirt',        label: 'Apparels',     icon: Shirt          },
  { id: 'heart-pulse',  label: 'Health',       icon: HeartPulse     },
  { id: 'scissors',     label: 'Beauty',       icon: Scissors       },
  { id: 'zap',          label: 'Electricity',  icon: Zap            },
  { id: 'fuel',         label: 'Gas',          icon: Fuel           },
  { id: 'car',          label: 'Transport',    icon: Car            },
  { id: 'home',         label: 'Household',    icon: Home           },
  { id: 'layout-grid',  label: 'Others',       icon: LayoutGrid     },
  { id: 'coffee',       label: 'Coffee',       icon: Coffee         },
  { id: 'monitor',      label: 'Electronics',  icon: Monitor        },
  { id: 'dumbbell',     label: 'Fitness',      icon: Dumbbell       },
  { id: 'book-open',    label: 'Education',    icon: BookOpen       },
  { id: 'plane',        label: 'Travel',       icon: Plane          },
  { id: 'music',        label: 'Entertainment',icon: Music          },
  { id: 'wifi',         label: 'Internet',     icon: Wifi           },
  { id: 'pill',         label: 'Medicine',     icon: Pill           },
  { id: 'baby',         label: 'Kids',         icon: Baby           },
  { id: 'paw-print',    label: 'Pets',         icon: PawPrint       },
  { id: 'gift',         label: 'Gifts',        icon: Gift           },
  { id: 'wrench',       label: 'Repairs',      icon: Wrench         },
  { id: 'smartphone',   label: 'Phone',        icon: Smartphone     },
  { id: 'bus',          label: 'Bus',          icon: Bus            },
  { id: 'train',        label: 'Train',        icon: Train          },
  { id: 'bike',         label: 'Bike',         icon: Bike           },
  { id: 'gamepad',      label: 'Gaming',       icon: Gamepad2       },
  { id: 'wallet',       label: 'Wallet',       icon: Wallet         },
  { id: 'credit-card',  label: 'Card',         icon: CreditCard     },
  { id: 'banknote',     label: 'Cash',         icon: Banknote       },
  { id: 'building',     label: 'Office',       icon: Building2      },
];

export interface ColorOption {
  color: string;
  bgColor: string;
}

export const COLOR_PALETTE: ColorOption[] = [
  { color: 'text-orange-500', bgColor: 'bg-orange-100' },
  { color: 'text-blue-500',   bgColor: 'bg-blue-100'   },
  { color: 'text-red-500',    bgColor: 'bg-red-100'    },
  { color: 'text-pink-500',   bgColor: 'bg-pink-100'   },
  { color: 'text-green-500',  bgColor: 'bg-green-100'  },
  { color: 'text-yellow-500', bgColor: 'bg-yellow-100' },
  { color: 'text-slate-500',  bgColor: 'bg-slate-100'  },
  { color: 'text-gray-500',   bgColor: 'bg-gray-100'   },
  { color: 'text-purple-500', bgColor: 'bg-purple-100' },
  { color: 'text-teal-500',   bgColor: 'bg-teal-100'   },
  { color: 'text-indigo-500', bgColor: 'bg-indigo-100' },
  { color: 'text-amber-600',  bgColor: 'bg-amber-100'  },
];

export function getIconById(id: string): LucideIcon {
  return ICON_OPTIONS.find((o) => o.id === id)?.icon ?? LayoutGrid;
}

export function getNextColor(index: number): ColorOption {
  return COLOR_PALETTE[index % COLOR_PALETTE.length];
}
