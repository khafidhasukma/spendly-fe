// Utility helpers
// Example: formatCurrency, formatDate, etc.

export const formatCurrency = (amount: number, locale = 'id-ID'): string =>
  new Intl.NumberFormat(locale, { style: 'currency', currency: 'IDR' }).format(amount);

export const formatDate = (isoDate: string, locale = 'id-ID'): string =>
  new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(new Date(isoDate));
