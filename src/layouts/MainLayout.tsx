import { Outlet, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
import Sidebar from '../components/layout/Sidebar';
import Navbar from '../components/layout/Navbar';
import BottomNav from '../components/layout/BottomNav';
import { useTheme } from '../contexts/ThemeContext';

const routeTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/scan': 'Scan Receipt',
  '/ai-analysis': 'AI Analysis',
  '/history': 'History',
  '/profile': 'Profile',
  '/categories': 'Categories',
  '/contact-us': 'Contact Us',
  '/faq': 'FAQ',
  '/tnc': 'Terms and Conditions',
  '/privacy-policy': 'Privacy Policy',
};

const MainLayout = () => {
  const { pathname } = useLocation();
  const { dark } = useTheme();
  const title = routeTitles[pathname] ?? 'Spendly';

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar onClose={() => {}} />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar title={title} />

        <main className="flex-1 overflow-y-auto p-4 pb-20 lg:p-8">
          <Outlet />
        </main>
      </div>

      <BottomNav />

      <Toaster richColors position="top-center" theme={dark ? 'dark' : 'light'} />
    </div>
  );
}

export default MainLayout;
