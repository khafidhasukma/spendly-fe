import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import Navbar from '../components/layout/Navbar';
import BottomNav from '../components/layout/BottomNav';

const routeTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/scan': 'Scan Receipt',
  '/ai-analysis': 'AI Analysis',
  '/history': 'History',
  '/profile': 'Profile',
  '/categories': 'Categories',
  '/hubungi-kami': 'Hubungi Kami',
  '/faq': 'FAQ',
  '/tnc': 'Terms and Conditions',
  '/privacy-policy': 'Privacy Policy',
};

function MainLayout() {
  const { pathname } = useLocation();
  const title = routeTitles[pathname] ?? 'Spendly';

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar onClose={() => {}} />

      {/* Main content area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar title={title} />

        <main className="flex-1 overflow-y-auto p-4 pb-20 lg:p-8">
          <Outlet />
        </main>
      </div>

      {/* Bottom navigation */}
      <BottomNav />
    </div>
  );
}

export default MainLayout;