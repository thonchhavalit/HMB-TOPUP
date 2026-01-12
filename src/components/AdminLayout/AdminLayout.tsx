import { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { Layout, Menu, Button, Avatar, Dropdown, Badge, Space, Typography, Tooltip } from 'antd';
import {
  DashboardOutlined,
  ShoppingCartOutlined,
  AppstoreOutlined,
  UserOutlined,
  SettingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BellOutlined,
  LogoutOutlined,
  SunOutlined,
  MoonOutlined,
  BarChartOutlined,
  GlobalOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { useTheme } from '../../context/ThemeContext';
import logo from '../../assets/image.png';
import './AdminLayout.css';

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();

  const menuItems: MenuProps['items'] = [
    {
      key: '/admin',
      icon: <DashboardOutlined />,
      label: <Link to="/admin">Dashboard</Link>,
    },
    {
      key: '/admin/orders',
      icon: <ShoppingCartOutlined />,
      label: <Link to="/admin/orders">Orders</Link>,
    },
    {
      key: '/admin/products',
      icon: <AppstoreOutlined />,
      label: <Link to="/admin/products">Products</Link>,
    },
    {
      key: '/admin/users',
      icon: <UserOutlined />,
      label: <Link to="/admin/users">Users</Link>,
    },
    {
      key: '/admin/reports',
      icon: <BarChartOutlined />,
      label: <Link to="/admin/reports">Reports</Link>,
    },
    {
      key: '/admin/settings',
      icon: <SettingOutlined />,
      label: <Link to="/admin/settings">Settings</Link>,
    },
  ];

  const getSelectedKey = () => {
    const path = location.pathname;
    if (path === '/admin') return ['/admin'];
    const match = menuItems.find(item => 
      item?.key !== '/admin' && path.startsWith(item?.key as string)
    );
    return match ? [match.key as string] : ['/admin'];
  };

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: <Link to="/">Logout</Link>,
      danger: true,
    },
  ];

  return (
    <Layout className="admin-layout">
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        className="admin-sider"
        width={250}
        collapsedWidth={80}
      >
        <div className="admin-logo">
          <Link to="/admin">
            <img src={logo} alt="HMB" className="admin-logo-img" />
            {!collapsed && <span className="admin-logo-text gaming-title">ADMIN</span>}
          </Link>
        </div>
        <Menu
          mode="inline"
          selectedKeys={getSelectedKey()}
          items={menuItems}
          className="admin-menu"
        />
      </Sider>
      
      <Layout>
        <Header className="admin-header">
          <div className="admin-header-left">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className="collapse-btn"
            />
          </div>
          
          <div className="admin-header-right">
            <Space size="middle">
              {/* View Site Button */}
              <Tooltip title="View User Site">
                <Link to="/">
                  <Button
                    type="text"
                    icon={<GlobalOutlined />}
                    className="header-icon-btn view-site-btn"
                  >
                    View Site
                  </Button>
                </Link>
              </Tooltip>
              
              <Button
                type="text"
                icon={isDark ? <SunOutlined /> : <MoonOutlined />}
                onClick={toggleTheme}
                className="header-icon-btn"
              />
              
              <Badge count={5} size="small">
                <Button
                  type="text"
                  icon={<BellOutlined />}
                  className="header-icon-btn"
                />
              </Badge>
              
              <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
                <Space className="admin-user-dropdown">
                  <Avatar 
                    style={{ backgroundColor: '#ff2d78' }}
                    icon={<UserOutlined />}
                  />
                  <Text className="admin-username">Admin</Text>
                </Space>
              </Dropdown>
            </Space>
          </div>
        </Header>
        
        <Content className="admin-content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
