import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Menu, Button, Drawer, Space, Tooltip } from 'antd';
import { MenuOutlined, HomeOutlined, ThunderboltOutlined, SearchOutlined, CustomerServiceOutlined, SunOutlined, MoonOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { useTheme } from '../../context/ThemeContext';
import logo from '../../assets/image.png';
import './Header.css';

const { Header: AntHeader } = Layout;

const AppHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();

  const menuItems: MenuProps['items'] = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: <Link to="/">Home</Link>,
    },
    {
      key: '/topup',
      icon: <ThunderboltOutlined />,
      label: <Link to="/topup">Top Up</Link>,
    },
    {
      key: '/order-status',
      icon: <SearchOutlined />,
      label: <Link to="/order-status">Check Order</Link>,
    },
    {
      key: '/support',
      icon: <CustomerServiceOutlined />,
      label: <Link to="/support">Support</Link>,
    },
  ];

  const getSelectedKey = () => {
    if (location.pathname === '/') return ['/'];
    const match = menuItems.find(item => 
      item?.key !== '/' && location.pathname.startsWith(item?.key as string)
    );
    return match ? [match.key as string] : ['/'];
  };

  return (
    <AntHeader className="app-header">
      <div className="header-container">
        <Link to="/" className="logo-link">
          <img src={logo} alt="HMB Top-Up" className="logo-image" />
          <span className="logo-text gaming-title">TOP-UP</span>
        </Link>

        {/* Desktop Menu */}
        <Menu
          mode="horizontal"
          selectedKeys={getSelectedKey()}
          items={menuItems}
          className="desktop-menu"
          style={{ 
            background: 'transparent', 
            borderBottom: 'none',
            flex: 1,
            justifyContent: 'flex-end'
          }}
        />

        {/* Theme Toggle Button */}
        <Tooltip title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
          <Button
            type="text"
            icon={isDark ? <SunOutlined /> : <MoonOutlined />}
            onClick={toggleTheme}
            className="theme-toggle-btn"
          />
        </Tooltip>

        {/* Admin Panel Button - For Testing */}
        <Tooltip title="Admin Panel">
          <Link to="/admin">
            <Button
              type="text"
              icon={<SettingOutlined />}
              className="admin-link-btn"
            />
          </Link>
        </Tooltip>

        {/* Mobile Menu Button */}
        <Button
          type="text"
          icon={<MenuOutlined style={{ fontSize: '20px', color: '#fff' }} />}
          onClick={() => setMobileMenuOpen(true)}
          className="mobile-menu-btn"
        />

        {/* Mobile Drawer */}
        <Drawer
          title={
            <Space>
              <img src={logo} alt="HMB" style={{ height: 32 }} />
              <span className="gaming-title" style={{ color: '#ff2d78' }}>TOP-UP</span>
            </Space>
          }
          placement="right"
          onClose={() => setMobileMenuOpen(false)}
          open={mobileMenuOpen}
          styles={{
            header: { 
              background: isDark ? '#12121a' : '#ffffff', 
              borderBottom: `1px solid ${isDark ? '#2a2a3e' : '#e8e8ed'}` 
            },
            body: { 
              background: isDark ? '#0a0a0f' : '#f5f5f8', 
              padding: 0 
            },
          }}
        >
          <Menu
            mode="vertical"
            selectedKeys={getSelectedKey()}
            items={menuItems}
            onClick={() => setMobileMenuOpen(false)}
            style={{ 
              background: 'transparent', 
              borderRight: 'none',
            }}
          />
          <div style={{ padding: '16px', borderTop: `1px solid ${isDark ? '#2a2a3e' : '#e8e8ed'}` }}>
            <Space direction="vertical" style={{ width: '100%' }} size="middle">
              <Button 
                block 
                icon={isDark ? <SunOutlined /> : <MoonOutlined />}
                onClick={toggleTheme}
              >
                {isDark ? 'Light Mode' : 'Dark Mode'}
              </Button>
              <Link to="/admin" style={{ display: 'block' }}>
                <Button 
                  block 
                  type="primary"
                  icon={<SettingOutlined />}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Admin Panel
                </Button>
              </Link>
            </Space>
          </div>
        </Drawer>
      </div>
    </AntHeader>
  );
};

export default AppHeader;
