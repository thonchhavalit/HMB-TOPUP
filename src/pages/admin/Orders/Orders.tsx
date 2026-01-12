import { useState } from 'react';
import { 
  Card, 
  Table, 
  Tag, 
  Space, 
  Button, 
  Input, 
  Select, 
  DatePicker, 
  Typography, 
  Modal, 
  Descriptions,
  Row,
  Col,
  Statistic,
  message,
} from 'antd';
import {
  SearchOutlined,
  EyeOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ReloadOutlined,
  ExportOutlined,
  FilterOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import './Orders.css';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

interface Order {
  key: string;
  orderId: string;
  customer: string;
  email: string;
  phone: string;
  game: string;
  package: string;
  playerId: string;
  amount: number;
  paymentMethod: string;
  status: 'completed' | 'pending' | 'processing' | 'failed' | 'refunded';
  createdAt: string;
}

const Orders = () => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchText, setSearchText] = useState('');

  const orders: Order[] = [
    { key: '1', orderId: 'ORD-2026-001', customer: 'John Doe', email: 'john@example.com', phone: '+855 12 345 678', game: 'Mobile Legends', package: '86 Diamonds', playerId: '123456789', amount: 1.99, paymentMethod: 'ABA Bank', status: 'completed', createdAt: '2026-01-12 14:30' },
    { key: '2', orderId: 'ORD-2026-002', customer: 'Jane Smith', email: 'jane@example.com', phone: '+855 98 765 432', game: 'Free Fire', package: '520 Diamonds', playerId: '987654321', amount: 9.99, paymentMethod: 'Wing', status: 'processing', createdAt: '2026-01-12 13:45' },
    { key: '3', orderId: 'ORD-2026-003', customer: 'Mike Johnson', email: 'mike@example.com', phone: '+855 11 222 333', game: 'PUBG Mobile', package: '660 UC', playerId: '456789123', amount: 9.99, paymentMethod: 'ABA Bank', status: 'pending', createdAt: '2026-01-12 12:20' },
    { key: '4', orderId: 'ORD-2026-004', customer: 'Sarah Wilson', email: 'sarah@example.com', phone: '+855 77 888 999', game: 'Genshin Impact', package: '3280 Genesis', playerId: '789123456', amount: 49.99, paymentMethod: 'ACLEDA', status: 'completed', createdAt: '2026-01-12 11:15' },
    { key: '5', orderId: 'ORD-2026-005', customer: 'Tom Brown', email: 'tom@example.com', phone: '+855 66 555 444', game: 'Mobile Legends', package: '172 Diamonds', playerId: '321654987', amount: 3.99, paymentMethod: 'Wing', status: 'failed', createdAt: '2026-01-12 10:00' },
    { key: '6', orderId: 'ORD-2026-006', customer: 'Emily Davis', email: 'emily@example.com', phone: '+855 99 111 222', game: 'Free Fire', package: '1080 Diamonds', playerId: '654987321', amount: 19.99, paymentMethod: 'ABA Bank', status: 'completed', createdAt: '2026-01-11 16:30' },
    { key: '7', orderId: 'ORD-2026-007', customer: 'Alex Lee', email: 'alex@example.com', phone: '+855 88 333 444', game: 'Call of Duty Mobile', package: '880 CP', playerId: '147258369', amount: 9.99, paymentMethod: 'Wing', status: 'refunded', createdAt: '2026-01-11 14:45' },
    { key: '8', orderId: 'ORD-2026-008', customer: 'Chris Taylor', email: 'chris@example.com', phone: '+855 77 666 555', game: 'Mobile Legends', package: '878 Diamonds', playerId: '963852741', amount: 19.99, paymentMethod: 'ABA Bank', status: 'completed', createdAt: '2026-01-11 09:20' },
  ];

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      completed: 'green',
      processing: 'blue',
      pending: 'orange',
      failed: 'red',
      refunded: 'purple',
    };
    return colors[status];
  };

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleStatusChange = (orderId: string, newStatus: string) => {
    message.success(`Order ${orderId} status updated to ${newStatus}`);
  };

  const filteredOrders = orders.filter(order => {
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesSearch = 
      order.orderId.toLowerCase().includes(searchText.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchText.toLowerCase()) ||
      order.playerId.includes(searchText);
    return matchesStatus && matchesSearch;
  });

  const columns: ColumnsType<Order> = [
    {
      title: 'Order ID',
      dataIndex: 'orderId',
      key: 'orderId',
      render: (text) => <Text strong style={{ color: 'var(--accent-primary)' }}>{text}</Text>,
      sorter: (a, b) => a.orderId.localeCompare(b.orderId),
    },
    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer',
      render: (text, record) => (
        <div>
          <Text>{text}</Text>
          <br />
          <Text type="secondary" style={{ fontSize: 12 }}>{record.email}</Text>
        </div>
      ),
    },
    {
      title: 'Game',
      dataIndex: 'game',
      key: 'game',
    },
    {
      title: 'Package',
      dataIndex: 'package',
      key: 'package',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => <Text strong>${amount.toFixed(2)}</Text>,
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: 'Payment',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={getStatusColor(status)}>{status.toUpperCase()}</Tag>
      ),
      filters: [
        { text: 'Completed', value: 'completed' },
        { text: 'Processing', value: 'processing' },
        { text: 'Pending', value: 'pending' },
        { text: 'Failed', value: 'failed' },
        { text: 'Refunded', value: 'refunded' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button 
            type="text" 
            icon={<EyeOutlined />} 
            onClick={() => handleViewOrder(record)}
          />
          {record.status === 'pending' && (
            <>
              <Button 
                type="text" 
                icon={<CheckCircleOutlined />}
                style={{ color: '#00ff88' }}
                onClick={() => handleStatusChange(record.orderId, 'completed')}
              />
              <Button 
                type="text" 
                icon={<CloseCircleOutlined />}
                style={{ color: '#ff4d6a' }}
                onClick={() => handleStatusChange(record.orderId, 'failed')}
              />
            </>
          )}
        </Space>
      ),
    },
  ];

  const orderStats = {
    total: orders.length,
    completed: orders.filter(o => o.status === 'completed').length,
    pending: orders.filter(o => o.status === 'pending').length,
    totalRevenue: orders.filter(o => o.status === 'completed').reduce((sum, o) => sum + o.amount, 0),
  };

  return (
    <div className="orders-page">
      <div className="page-header">
        <Title level={2} className="gaming-title">Order Management</Title>
        <Text type="secondary">Manage and track all customer orders</Text>
      </div>

      {/* Stats */}
      <Row gutter={[16, 16]} className="order-stats">
        <Col xs={12} sm={6}>
          <Card className="stat-card">
            <Statistic title="Total Orders" value={orderStats.total} />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card className="stat-card">
            <Statistic 
              title="Completed" 
              value={orderStats.completed} 
              valueStyle={{ color: '#00ff88' }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card className="stat-card">
            <Statistic 
              title="Pending" 
              value={orderStats.pending}
              valueStyle={{ color: '#ffaa00' }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card className="stat-card">
            <Statistic 
              title="Revenue" 
              value={orderStats.totalRevenue}
              precision={2}
              prefix="$"
              valueStyle={{ color: 'var(--accent-primary)' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Filters */}
      <Card className="filter-card">
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={8} md={6}>
            <Input 
              placeholder="Search orders..." 
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Col>
          <Col xs={24} sm={8} md={4}>
            <Select 
              style={{ width: '100%' }}
              placeholder="Status"
              value={statusFilter}
              onChange={setStatusFilter}
              options={[
                { value: 'all', label: 'All Status' },
                { value: 'completed', label: 'Completed' },
                { value: 'processing', label: 'Processing' },
                { value: 'pending', label: 'Pending' },
                { value: 'failed', label: 'Failed' },
                { value: 'refunded', label: 'Refunded' },
              ]}
            />
          </Col>
          <Col xs={24} sm={8} md={6}>
            <RangePicker style={{ width: '100%' }} />
          </Col>
          <Col xs={24} md={8} style={{ textAlign: 'right' }}>
            <Space>
              <Button icon={<FilterOutlined />}>More Filters</Button>
              <Button icon={<ReloadOutlined />}>Refresh</Button>
              <Button type="primary" icon={<ExportOutlined />}>Export</Button>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Orders Table */}
      <Card className="orders-table-card">
        <Table 
          columns={columns} 
          dataSource={filteredOrders}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} orders`,
          }}
          scroll={{ x: 1200 }}
        />
      </Card>

      {/* Order Detail Modal */}
      <Modal
        title={<span className="gaming-title">Order Details</span>}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="close" onClick={() => setIsModalOpen(false)}>
            Close
          </Button>,
          selectedOrder?.status === 'pending' && (
            <Button 
              key="approve" 
              type="primary"
              onClick={() => {
                handleStatusChange(selectedOrder.orderId, 'completed');
                setIsModalOpen(false);
              }}
            >
              Approve Order
            </Button>
          ),
        ]}
        width={700}
      >
        {selectedOrder && (
          <Descriptions bordered column={2}>
            <Descriptions.Item label="Order ID" span={2}>
              <Text strong style={{ color: 'var(--accent-primary)' }}>
                {selectedOrder.orderId}
              </Text>
            </Descriptions.Item>
            <Descriptions.Item label="Customer">{selectedOrder.customer}</Descriptions.Item>
            <Descriptions.Item label="Email">{selectedOrder.email}</Descriptions.Item>
            <Descriptions.Item label="Phone">{selectedOrder.phone}</Descriptions.Item>
            <Descriptions.Item label="Game">{selectedOrder.game}</Descriptions.Item>
            <Descriptions.Item label="Package">{selectedOrder.package}</Descriptions.Item>
            <Descriptions.Item label="Player ID">{selectedOrder.playerId}</Descriptions.Item>
            <Descriptions.Item label="Amount">
              <Text strong>${selectedOrder.amount.toFixed(2)}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="Payment">{selectedOrder.paymentMethod}</Descriptions.Item>
            <Descriptions.Item label="Status" span={2}>
              <Tag color={getStatusColor(selectedOrder.status)}>
                {selectedOrder.status.toUpperCase()}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Created At" span={2}>
              {selectedOrder.createdAt}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  );
};

export default Orders;
