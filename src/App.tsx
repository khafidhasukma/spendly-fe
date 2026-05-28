import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute, GuestRoute } from './components/auth';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import PublicLayout from './layouts/PublicLayout';
import LandingPage from './pages/landing';
import DashboardPage from './pages/dashboard';
import ScanStrukPage from './pages/scan-struk';
import AnalisisAIPage from './pages/analisis-ai';
import HistoryPage from './pages/history';
import ProfilePage from './pages/profile';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import CategoriesPage from './pages/categories';
import ContactUsPage from './pages/contact-us';
import FAQPage from './pages/faq';
import TncPage from './pages/tnc';
import PrivacyPolicyPage from './pages/privacy-policy';
import ForgotPasswordPage from './pages/forgot-password';
import BudgetPage from './pages/budget';
import WalletPage from './pages/wallet';
import NotFoundPage from './pages/not-found';

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Toaster position="top-center" />
        <BrowserRouter>
          <Routes>
            {/* Public pages with navbar + footer */}
            <Route element={<PublicLayout />}>
              <Route index element={<LandingPage />} />
              <Route path="tnc" element={<TncPage />} />
              <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="contact-us" element={<ContactUsPage />} />
              <Route path="faq" element={<FAQPage />} />
            </Route>

            {/* App pages with sidebar — butuh login */}
            <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="scan" element={<ScanStrukPage />} />
              <Route path="ai-analysis" element={<AnalisisAIPage />} />
              <Route path="history" element={<HistoryPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="categories" element={<CategoriesPage />} />
              <Route path="budget" element={<BudgetPage />} />
              <Route path="wallet" element={<WalletPage />} />
            </Route>

            {/* Auth pages — hanya untuk guest (belum login) */}
            <Route element={<GuestRoute><AuthLayout /></GuestRoute>}>
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="forgot-password" element={<ForgotPasswordPage />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
