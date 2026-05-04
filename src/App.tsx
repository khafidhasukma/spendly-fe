import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import HomePage from './pages/home';
import ScanStrukPage from './pages/scan-struk';
import AnalisisAIPage from './pages/analisis-ai';
import RiwayatPage from './pages/riwayat';
import ProfilePage from './pages/profile';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import CategoriesPage from './pages/categories';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="scan" element={<ScanStrukPage />} />
          <Route path="ai-analysis" element={<AnalisisAIPage />} />
          <Route path="history" element={<RiwayatPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="categories" element={<CategoriesPage />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

