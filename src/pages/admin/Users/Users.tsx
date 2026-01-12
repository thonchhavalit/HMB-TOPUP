import { useState } from 'react';
import { 
  Card, 
  Table, 
  Button, 
  Space, 
  Input, 
  Typography, 
  Tag,
  Avatar,
  Row,
  Col,
  Statistic,
  Modal,
  Descriptions,
} from 'antd';
import {
  SearchOutlined,
  EyeOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import './Users.css';

const { Title, Text } = Typography;

interface User {
  key: string;
  id: string;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  status: 'active' | 'inactive' | 'banned';
  joinDate: string;
  lastOrder: string;
}

const Users = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState('');

  const users: User[] = [
    { key: '1', id: 'USR-001', name: 'John Doe', email: 'john@example.com', phone: '+855 12 345 678', totalOrders: 15, totalSpent: 149.85, status: 'active', joinDate: '2025-06-15', lastOrder: '2026-01-12' },
    { key: '2', id: 'USR-002', name: 'Jane Smith', email: 'jane@example.com', phone: '+855 98 765 432', totalOrders: 23, totalSpent: 287.77, status: 'active', joinDate: '2025-05-20', lastOrder: '2026-01-11' },
    { key: '3', id: 'USR-003', name: 'Mike Johnson', email: 'mike@example.com', phone: '+855 11 222 333', totalOrders: 8, totalSpent: 79.92, status: 'active', joinDate: '2025-08-10', lastOrder: '2026-01-10' },
    { key: '4', id: 'USR-004', name: 'Sarah Wilson', email: 'sarah@example.com', phone: '+855 77 888 999', totalOrders: 31, totalSpent: 456.69, status: 'active', joinDate: '2025-03-05', lastOrder: '2026-01-12' },
    { key: '5', id: 'USR-005', name: 'Tom Brown', email: 'tom@example.com', phone: '+855 66 555 444', totalOrders: 5, totalSpent: 29.95, status: 'inactive', joinDate: '2025-09-22', lastOrder: '2025-12-15' },
    { key: '6', id: 'USR-006', name: 'Emily Davis', email: 'emily@example.com', phone: '+855 99 111 222', totalOrders: 42, totalSpent: 623.58, status: 'active', joinDate: '2025-01-10', lastOrder: '2026-01-12' },
    { key: '7', id: 'USR-007', name: 'Alex Lee', email: 'alex@example.com', phone: '+855 88 333 444', totalOrders: 2, totalSpent: 15.98, status: 'banned', joinDate: '2025-11-01', lastOrder: '2025-11-05' },
    { key: '8', id: 'USR-008', name: 'Chris Taylor', email: 'chris@example.com', phone: '+855 77 666 555', totalOrders: 19, totalSpent: 198.81, status: 'active', joinDate: '2025-04-18', lastOrder: '2026-01-11' },
  ];

  const handleView = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchText.toLowerCase()) ||
    user.email.toLowerCase().includes(searchText.toLowerCase()) ||
    user.id.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns: ColumnsType<User> = [
    {
      title: 'User',
      key: 'user',
      render: (_, record) => (
        <Space>
          <Avatar 
            style={{ backgroundColor: 'var(--accent-primary)' }}
            icon={<UserOutlined />}
          />
          <div>
            <Text strong>{record.name}</Text>
            <br />
            <Text type="secondary" style={{ fontSize: 12 }}>{record.email}</Text>
          </div>
        </Space>
      ),
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Orders',
      dataIndex: 'totalOrders',
      key: 'totalOrders',
      sorter: (a, b) => a.totalOrders - b.totalOrders,
    },
    {
      title: 'Total Spent',
      dataIndex: 'totalSpent',
      key: 'totalSpent',
      render: (value) => <Text strong style={{ color: 'var(--accent-primary)' }}>${value.toFixed(2)}</Text>,
      sorter: (a, b) => a.totalSpent - b.totalSpent,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const colors: Record<string, string> = {
          active: 'green',
          inactive: 'orange',
          banned: 'red',
        };
        return <Tag color={colors[status]}>{status.toUpperCase()}</Tag>;
      },
      filters: [
        { text: 'Active', value: 'active' },
        { text: 'Inactive', value: 'inactive' },
        { text: 'Banned', value: 'banned' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Join Date',
      dataIndex: 'joinDate',
      key: 'joinDate',
      sorter: (a, b) => new Date(a.joinDate).getTime() - new Date(b.joinDate).getTime(),
    },
    {
      title: 'Last Order',
      dataIndex: 'lastOrder',
      key: 'lastOrder',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Button 
          type="text" 
          icon={<EyeOutlined />}
          onClick={() => handleView(record)}
        />
      ),
    },
  ];

  const userStats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    totalRevenue: users.reduce((sum, u) => sum + u.totalSpent, 0),
    avgOrderValue: users.reduce((sum, u) => sum + u.totalSpent, 0) / users.reduce((sum, u) => sum + u.totalOrders, 0),
  };

  return (
    <div className="users-page">
      <div className="page-header">
        <Title level={2} className="gaming-title">Users</Title>
        <Text type="secondary">Manage customer accounts and activity</Text>
      </div>

      {/* Stats */}
      <Row gutter={[16, 16]} className="user-stats">
        <Col xs={12} sm={6}>
          <Card className="stat-card">
            <Statistic title="Total Users" value={userStats.total} />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card className="stat-card">
            <Statistic 
              title="Active Users" 
              value={userStats.active}
              valueStyle={{ color: '#00ff88' }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card className="stat-card">
            <Statistic 
              title="Total Revenue" 
              value={userStats.totalRevenue}
              precision={2}
              prefix="$"
              valueStyle={{ color: 'var(--accent-primary)' }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card className="stat-card">
            <Statistic 
              title="Avg Order Value" 
              value={userStats.avgOrderValue}
              precision={2}
              prefix="$"
            />
          </Card>
        </Col>
      </Row>

      <Card className="users-card">
        <div className="users-toolbar">
          <Input 
            placeholder="Search users..." 
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 300 }}
          />
        </div>
        
        <Table 
          columns={columns} 
          dataSource={filteredUsers}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} users`,
          }}
        />
      </Card>

      <Modal
        title="User Details"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="close" onClick={() => setIsModalOpen(false)}>
            Close
          </Button>,
        ]}
        width={600}
      >
        {selectedUser && (
          <div className="user-detail">
            <div className="user-avatar-section">
              <Avatar 
                size={80}
                style={{ backgroundColor: 'var(--accent-primary)' }}
                icon={<UserOutlined />}
              />
              <div>
                <Title level={4} style={{ margin: 0 }}>{selectedUser.name}</Title>
                <Tag color={
                  selectedUser.status === 'active' ? 'green' : 
                  selectedUser.status === 'inactive' ? 'orange' : 'red'
                }>
                  {selectedUser.status.toUpperCase()}
                </Tag>
              </div>
            </div>
            
            <Descriptions bordered column={2} style={{ marginTop: 24 }}>
              <Descriptions.Item label={<><MailOutlined /> Email</>} span={2}>
                {selectedUser.email}
              </Descriptions.Item>
              <Descriptions.Item label={<><PhoneOutlined /> Phone</>} span={2}>
                {selectedUser.phone}
              </Descriptions.Item>
              <Descriptions.Item label="Total Orders">
                {selectedUser.totalOrders}
              </Descriptions.Item>
              <Descriptions.Item label="Total Spent">
                <Text strong style={{ color: 'var(--accent-primary)' }}>
                  ${selectedUser.totalSpent.toFixed(2)}
                </Text>
              </Descriptions.Item>
              <Descriptions.Item label="Join Date">
                {selectedUser.joinDate}
              </Descriptions.Item>
              <Descriptions.Item label="Last Order">
                {selectedUser.lastOrder}
              </Descriptions.Item>
            </Descriptions>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Users;
