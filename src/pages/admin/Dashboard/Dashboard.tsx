import { Row, Col, Card, Typography, Table, Tag, Space, Progress, Avatar } from 'antd';
import {
  DollarOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  RiseOutlined,
  FallOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import './Dashboard.css';

const { Title, Text } = Typography;

interface RecentOrder {
  key: string;
  orderId: string;
  customer: string;
  game: string;
  amount: number;
  status: 'completed' | 'pending' | 'processing' | 'failed';
  date: string;
}

interface TopGame {
  key: string;
  name: string;
  sales: number;
  revenue: number;
  growth: number;
}

const Dashboard = () => {
  const stats = [
    {
      icon: <DollarOutlined />,
      iconClass: 'primary',
      value: '$12,845',
      label: 'Total Revenue',
      change: '+12.5%',
      positive: true,
    },
    {
      icon: <ShoppingCartOutlined />,
      iconClass: 'success',
      value: '1,284',
      label: 'Total Orders',
      change: '+8.2%',
      positive: true,
    },
    {
      icon: <UserOutlined />,
      iconClass: 'info',
      value: '3,521',
      label: 'Total Users',
      change: '+15.3%',
      positive: true,
    },
    {
      icon: <EyeOutlined />,
      iconClass: 'warning',
      value: '8,942',
      label: 'Page Views',
      change: '-2.4%',
      positive: false,
    },
  ];

  const recentOrders: RecentOrder[] = [
    { key: '1', orderId: 'ORD-001', customer: 'John Doe', game: 'Mobile Legends', amount: 9.99, status: 'completed', date: '2026-01-12' },
    { key: '2', orderId: 'ORD-002', customer: 'Jane Smith', game: 'Free Fire', amount: 19.99, status: 'processing', date: '2026-01-12' },
    { key: '3', orderId: 'ORD-003', customer: 'Mike Johnson', game: 'PUBG Mobile', amount: 49.99, status: 'pending', date: '2026-01-11' },
    { key: '4', orderId: 'ORD-004', customer: 'Sarah Wilson', game: 'Genshin Impact', amount: 29.99, status: 'completed', date: '2026-01-11' },
    { key: '5', orderId: 'ORD-005', customer: 'Tom Brown', game: 'Mobile Legends', amount: 4.99, status: 'failed', date: '2026-01-10' },
  ];

  const topGames: TopGame[] = [
    { key: '1', name: 'Mobile Legends', sales: 542, revenue: 5420, growth: 15.2 },
    { key: '2', name: 'Free Fire', sales: 423, revenue: 4230, growth: 12.8 },
    { key: '3', name: 'PUBG Mobile', sales: 312, revenue: 3120, growth: 8.5 },
    { key: '4', name: 'Genshin Impact', sales: 256, revenue: 2560, growth: 22.1 },
    { key: '5', name: 'Call of Duty Mobile', sales: 189, revenue: 1890, growth: -3.2 },
  ];

  const orderColumns: ColumnsType<RecentOrder> = [
    {
      title: 'Order ID',
      dataIndex: 'orderId',
      key: 'orderId',
      render: (text) => <Text strong style={{ color: 'var(--accent-primary)' }}>{text}</Text>,
    },
    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: 'Game',
      dataIndex: 'game',
      key: 'game',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => `$${amount.toFixed(2)}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const colors: Record<string, string> = {
          completed: 'green',
          processing: 'blue',
          pending: 'orange',
          failed: 'red',
        };
        return <Tag color={colors[status]}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
  ];

  const gameColumns: ColumnsType<TopGame> = [
    {
      title: 'Game',
      dataIndex: 'name',
      key: 'name',
      render: (name) => (
        <Space>
          <Avatar style={{ backgroundColor: 'var(--accent-primary)' }}>{name[0]}</Avatar>
          <Text>{name}</Text>
        </Space>
      ),
    },
    {
      title: 'Sales',
      dataIndex: 'sales',
      key: 'sales',
      render: (sales) => sales.toLocaleString(),
    },
    {
      title: 'Revenue',
      dataIndex: 'revenue',
      key: 'revenue',
      render: (revenue) => `$${revenue.toLocaleString()}`,
    },
    {
      title: 'Growth',
      dataIndex: 'growth',
      key: 'growth',
      render: (growth) => (
        <Space>
          {growth >= 0 ? (
            <RiseOutlined style={{ color: '#00ff88' }} />
          ) : (
            <FallOutlined style={{ color: '#ff4d6a' }} />
          )}
          <Text style={{ color: growth >= 0 ? '#00ff88' : '#ff4d6a' }}>
            {growth >= 0 ? '+' : ''}{growth}%
          </Text>
        </Space>
      ),
    },
  ];

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <Title level={2} className="gaming-title">Dashboard</Title>
        <Text type="secondary">Welcome back! Here's what's happening today.</Text>
      </div>

      {/* Stats Cards */}
      <Row gutter={[24, 24]} className="stats-row">
        {stats.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card className="stats-card">
              <div className={`stats-icon ${stat.iconClass}`}>
                {stat.icon}
              </div>
              <div className="stats-value">{stat.value}</div>
              <div className="stats-label">{stat.label}</div>
              <div className={`stats-change ${stat.positive ? 'positive' : 'negative'}`}>
                {stat.positive ? <RiseOutlined /> : <FallOutlined />} {stat.change} vs last month
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Charts Row */}
      <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
        <Col xs={24} lg={16}>
          <Card className="dashboard-card" title="Revenue Overview">
            <div className="chart-placeholder">
              <div className="chart-bars">
                {[65, 85, 55, 90, 75, 95, 80, 70, 85, 60, 75, 90].map((height, i) => (
                  <div 
                    key={i} 
                    className="chart-bar" 
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
              <div className="chart-labels">
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month) => (
                  <span key={month}>{month}</span>
                ))}
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card className="dashboard-card" title="Payment Methods">
            <div className="payment-stats">
              <div className="payment-item">
                <div className="payment-info">
                  <Text>ABA Bank</Text>
                  <Text type="secondary">45%</Text>
                </div>
                <Progress percent={45} strokeColor="#ff2d78" showInfo={false} />
              </div>
              <div className="payment-item">
                <div className="payment-info">
                  <Text>Wing</Text>
                  <Text type="secondary">30%</Text>
                </div>
                <Progress percent={30} strokeColor="#00d4ff" showInfo={false} />
              </div>
              <div className="payment-item">
                <div className="payment-info">
                  <Text>ACLEDA</Text>
                  <Text type="secondary">15%</Text>
                </div>
                <Progress percent={15} strokeColor="#00ff88" showInfo={false} />
              </div>
              <div className="payment-item">
                <div className="payment-info">
                  <Text>Other</Text>
                  <Text type="secondary">10%</Text>
                </div>
                <Progress percent={10} strokeColor="#ffaa00" showInfo={false} />
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Tables Row */}
      <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
        <Col xs={24} lg={14}>
          <Card className="dashboard-card" title="Recent Orders">
            <Table 
              columns={orderColumns} 
              dataSource={recentOrders} 
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
        <Col xs={24} lg={10}>
          <Card className="dashboard-card" title="Top Games">
            <Table 
              columns={gameColumns} 
              dataSource={topGames} 
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
