import moment from 'moment';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - moment locale imports lack type declarations
import 'moment/locale/id';

moment.locale('id');

export { moment };

// id rupiah amount
export function formatRupiah(amount: number): string {
  const abs = new Intl.NumberFormat('id-ID', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.abs(amount));
  if (amount < 0) return `-Rp${abs}`;
  return `Rp${abs}`;
}

export function formatDate(isoDate: string): string {
  return moment(isoDate).format('LL');
}

export function formatRelativeDayHeading(isoDate: string): string {
  if (moment(isoDate).isSame(moment(), 'day')) return 'Today';
  if (moment(isoDate).isSame(moment().subtract(1, 'day'), 'day')) return 'Yesterday';
  return moment(isoDate).format('D MMM YYYY');
}

export function resolveAvatarUrl(avatarUrl: string | null | undefined): string | null {
  if (!avatarUrl) return null;
  if (avatarUrl.startsWith('http://') || avatarUrl.startsWith('https://') || avatarUrl.startsWith('blob:')) {
    return avatarUrl;
  }
  const base = (import.meta.env.VITE_BACKEND_URL as string ?? '').replace(/\/api$/, '');
  return `${base}${avatarUrl}`;
}
