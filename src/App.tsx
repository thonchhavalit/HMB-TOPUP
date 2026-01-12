import { ConfigProvider, App as AntApp } from 'antd';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { darkTheme, lightTheme } from './theme/themeConfig';
import MainLayout from './components/Layout/MainLayout';
import HomePage from './pages/HomePage/HomePage';
import TopUpPage from './pages/TopUpPage/TopUpPage';
import OrderStatusPage from './pages/OrderStatusPage/OrderStatusPage';
import SupportPage from './pages/SupportPage/SupportPage';

// Admin imports
import AdminLayout from './components/AdminLayout/AdminLayout';
import Dashboard from './pages/admin/Dashboard/Dashboard';
import Orders from './pages/admin/Orders/Orders';
import Products from './pages/admin/Products/Products';
import Users from './pages/admin/Users/Users';
import Reports from './pages/admin/Reports/Reports';
import Settings from './pages/admin/Settings/Settings';

function AppContent() {
  const { isDark } = useTheme();
  
  return (
    <ConfigProvider theme={isDark ? darkTheme : lightTheme}>
      <AntApp>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/topup" element={<TopUpPage />} />
              <Route path="/topup/:gameId" element={<TopUpPage />} />
              <Route path="/order-status" element={<OrderStatusPage />} />
              <Route path="/support" element={<SupportPage />} />
            </Route>
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="orders" element={<Orders />} />
              <Route path="products" element={<Products />} />
              <Route path="users" element={<Users />} />
              <Route path="reports" element={<Reports />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </Router>
      </AntApp>
    </ConfigProvider>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
