import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/home';
import ScanStrukPage from './pages/scan-struk';
import AnalisisAIPage from './pages/analisis-ai';
import RiwayatPage from './pages/riwayat';
import ProfilePage from './pages/profile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="scan-struk" element={<ScanStrukPage />} />
          <Route path="analisis-ai" element={<AnalisisAIPage />} />
          <Route path="riwayat" element={<RiwayatPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

