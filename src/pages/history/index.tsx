import { TransactionHistoryScreen } from '@/features/history';
import { usePageTitle } from '@/hooks';

const HistoryPage = () => {
  usePageTitle('Transaction History');
  return <TransactionHistoryScreen />;
};

export default HistoryPage;
