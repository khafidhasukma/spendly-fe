import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from './contexts/ThemeContext';
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

const App = () => {
  return (
    <ThemeProvider>
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

          {/* App pages with sidebar */}
          <Route element={<MainLayout />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="scan" element={<ScanStrukPage />} />
            <Route path="ai-analysis" element={<AnalisisAIPage />} />
            <Route path="history" element={<HistoryPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="categories" element={<CategoriesPage />} />
          </Route>

          {/* Auth pages */}
          <Route element={<AuthLayout />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="forgot-password" element={<ForgotPasswordPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
