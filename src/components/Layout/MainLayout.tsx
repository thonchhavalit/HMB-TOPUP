import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import AppHeader from '../Header/Header';
import AppFooter from '../Footer/Footer';

const { Content } = Layout;

const MainLayout = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <AppHeader />
      <Content style={{ flex: 1 }}>
        <Outlet />
      </Content>
      <AppFooter />
    </Layout>
  );
};

export default MainLayout;
