import { Card, Row, Col, Typography, DatePicker, Select, Space, Table, Progress } from 'antd';
import {
  DollarOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  RiseOutlined,
  FallOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import { Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import './Reports.css';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

interface GameReport {
  key: string;
  game: string;
  orders: number;
  revenue: number;
  growth: number;
  share: number;
}

interface PaymentReport {
  key: string;
  method: string;
  transactions: number;
  amount: number;
  percentage: number;
}

const Reports = () => {
  const gameReports: GameReport[] = [
    { key: '1', game: 'Mobile Legends', orders: 1245, revenue: 12450, growth: 15.2, share: 35 },
    { key: '2', game: 'Free Fire', orders: 987, revenue: 9870, growth: 12.8, share: 28 },
    { key: '3', game: 'PUBG Mobile', orders: 654, revenue: 6540, growth: 8.5, share: 18 },
    { key: '4', game: 'Genshin Impact', orders: 432, revenue: 4320, growth: 22.1, share: 12 },
    { key: '5', game: 'Call of Duty Mobile', orders: 245, revenue: 2450, growth: -3.2, share: 7 },
  ];

  const paymentReports: PaymentReport[] = [
    { key: '1', method: 'ABA Bank', transactions: 1542, amount: 15420, percentage: 45 },
    { key: '2', method: 'Wing', transactions: 1028, amount: 10280, percentage: 30 },
    { key: '3', method: 'ACLEDA', transactions: 514, amount: 5140, percentage: 15 },
    { key: '4', method: 'Other', transactions: 343, amount: 3430, percentage: 10 },
  ];

  const gameColumns: ColumnsType<GameReport> = [
    {
      title: 'Game',
      dataIndex: 'game',
      key: 'game',
    },
    {
      title: 'Orders',
      dataIndex: 'orders',
      key: 'orders',
      render: (value) => value.toLocaleString(),
      sorter: (a, b) => a.orders - b.orders,
    },
    {
      title: 'Revenue',
      dataIndex: 'revenue',
      key: 'revenue',
      render: (value) => <Text strong style={{ color: 'var(--accent-primary)' }}>${value.toLocaleString()}</Text>,
      sorter: (a, b) => a.revenue - b.revenue,
    },
    {
      title: 'Growth',
      dataIndex: 'growth',
      key: 'growth',
      render: (value) => (
        <Space>
          {value >= 0 ? <RiseOutlined style={{ color: '#00ff88' }} /> : <FallOutlined style={{ color: '#ff4d6a' }} />}
          <Text style={{ color: value >= 0 ? '#00ff88' : '#ff4d6a' }}>
            {value >= 0 ? '+' : ''}{value}%
          </Text>
        </Space>
      ),
    },
    {
      title: 'Market Share',
      dataIndex: 'share',
      key: 'share',
      render: (value) => (
        <Progress 
          percent={value} 
          size="small" 
          strokeColor="var(--accent-primary)"
          format={(percent) => `${percent}%`}
        />
      ),
    },
  ];

  const paymentColumns: ColumnsType<PaymentReport> = [
    {
      title: 'Payment Method',
      dataIndex: 'method',
      key: 'method',
    },
    {
      title: 'Transactions',
      dataIndex: 'transactions',
      key: 'transactions',
      render: (value) => value.toLocaleString(),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (value) => `$${value.toLocaleString()}`,
    },
    {
      title: 'Percentage',
      dataIndex: 'percentage',
      key: 'percentage',
      render: (value) => (
        <Progress 
          percent={value} 
          size="small" 
          strokeColor="#00d4ff"
          format={(percent) => `${percent}%`}
        />
      ),
    },
  ];

  const summaryStats = [
    { icon: <DollarOutlined />, label: 'Total Revenue', value: '$35,630', change: '+18.5%', positive: true, color: 'primary' },
    { icon: <ShoppingCartOutlined />, label: 'Total Orders', value: '3,563', change: '+12.3%', positive: true, color: 'success' },
    { icon: <UserOutlined />, label: 'New Customers', value: '842', change: '+25.7%', positive: true, color: 'info' },
    { icon: <DollarOutlined />, label: 'Avg Order Value', value: '$10.00', change: '+5.2%', positive: true, color: 'warning' },
  ];

  return (
    <div className="reports-page">
      <div className="page-header">
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={2} className="gaming-title">Reports</Title>
            <Text type="secondary">Analyze sales performance and trends</Text>
          </Col>
          <Col>
            <Space>
              <RangePicker />
              <Select
                defaultValue="month"
                style={{ width: 120 }}
                options={[
                  { value: 'day', label: 'Daily' },
                  { value: 'week', label: 'Weekly' },
                  { value: 'month', label: 'Monthly' },
                  { value: 'year', label: 'Yearly' },
                ]}
              />
              <Button type="primary" icon={<DownloadOutlined />}>
                Export
              </Button>
            </Space>
          </Col>
        </Row>
      </div>

      {/* Summary Stats */}
      <Row gutter={[16, 16]} className="summary-stats">
        {summaryStats.map((stat, index) => (
          <Col xs={12} sm={6} key={index}>
            <Card className="summary-card">
              <div className={`summary-icon ${stat.color}`}>
                {stat.icon}
              </div>
              <div className="summary-value">{stat.value}</div>
              <div className="summary-label">{stat.label}</div>
              <div className={`summary-change ${stat.positive ? 'positive' : 'negative'}`}>
                {stat.positive ? <RiseOutlined /> : <FallOutlined />} {stat.change}
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Revenue Chart */}
      <Card className="report-card" title="Revenue Trend" style={{ marginBottom: 24 }}>
        <div className="chart-placeholder large">
          <div className="line-chart">
            <svg viewBox="0 0 800 200" className="chart-svg">
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255, 45, 120, 0.5)" />
                  <stop offset="100%" stopColor="rgba(255, 45, 120, 0)" />
                </linearGradient>
              </defs>
              <path
                d="M 0 150 L 66 120 L 133 140 L 200 80 L 266 100 L 333 60 L 400 90 L 466 40 L 533 70 L 600 30 L 666 50 L 733 20 L 800 40"
                fill="none"
                stroke="var(--accent-primary)"
                strokeWidth="3"
              />
              <path
                d="M 0 150 L 66 120 L 133 140 L 200 80 L 266 100 L 333 60 L 400 90 L 466 40 L 533 70 L 600 30 L 666 50 L 733 20 L 800 40 L 800 200 L 0 200 Z"
                fill="url(#lineGradient)"
              />
            </svg>
          </div>
          <div className="chart-x-labels">
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month) => (
              <span key={month}>{month}</span>
            ))}
          </div>
        </div>
      </Card>

      {/* Tables */}
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={14}>
          <Card className="report-card" title="Sales by Game">
            <Table 
              columns={gameColumns} 
              dataSource={gameReports}
              pagination={false}
            />
          </Card>
        </Col>
        <Col xs={24} lg={10}>
          <Card className="report-card" title="Payment Methods">
            <Table 
              columns={paymentColumns} 
              dataSource={paymentReports}
              pagination={false}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Reports;
