import moment from 'moment';
import 'moment/dist/locale/id';

moment.locale('id');

export { moment };

export const formatCurrency = (amount: number, locale = 'id-ID'): string =>
  new Intl.NumberFormat(locale, { style: 'currency', currency: 'IDR' }).format(amount);

// id rupiah amount
export function formatRupiahAmount(amount: number): string {
  const abs = new Intl.NumberFormat('id-ID', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.abs(amount));
  if (amount < 0) return `-Rp${abs}`;
  return `Rp${abs}`;
}

// 11 Mei 2026
export function formatDate(isoDate: string): string {
  return moment(isoDate).format('LL');
}

// section heading for grouped transaction lists
export function formatRelativeDayHeading(isoDate: string): string {
  if (moment(isoDate).isSame(moment(), 'day')) return 'Today';
  if (moment(isoDate).isSame(moment().subtract(1, 'day'), 'day')) return 'Yesterday';
  return moment(isoDate).format('D MMM YYYY');
}

// keeps first segment before bullet (e.g. apple pay only)
export function paymentSourceLabel(paymentMethod: string): string {
  const sep = ' • ';
  const i = paymentMethod.indexOf(sep);
  if (i === -1) return paymentMethod.trim();
  return paymentMethod.slice(0, i).trim();
}
