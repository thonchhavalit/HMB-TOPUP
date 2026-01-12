import { useState } from 'react';
import { 
  Card, 
  Table, 
  Button, 
  Space, 
  Input, 
  Typography, 
  Modal, 
  Form, 
  InputNumber,
  Switch,
  Tag,
  Avatar,
  Row,
  Col,
  message,
  Popconfirm,
  Select,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import './Products.css';

const { Title, Text } = Typography;

interface Product {
  key: string;
  id: string;
  game: string;
  name: string;
  diamonds: number;
  bonus: number;
  price: number;
  originalPrice: number;
  active: boolean;
  sales: number;
}

const Products = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchText, setSearchText] = useState('');
  const [form] = Form.useForm();

  const products: Product[] = [
    { key: '1', id: 'ML-001', game: 'Mobile Legends', name: '86 Diamonds', diamonds: 86, bonus: 0, price: 1.99, originalPrice: 1.99, active: true, sales: 542 },
    { key: '2', id: 'ML-002', game: 'Mobile Legends', name: '172 Diamonds', diamonds: 172, bonus: 0, price: 3.99, originalPrice: 3.99, active: true, sales: 423 },
    { key: '3', id: 'ML-003', game: 'Mobile Legends', name: '257 Diamonds', diamonds: 257, bonus: 0, price: 5.99, originalPrice: 5.99, active: true, sales: 312 },
    { key: '4', id: 'ML-004', game: 'Mobile Legends', name: '344 Diamonds', diamonds: 344, bonus: 0, price: 7.99, originalPrice: 7.99, active: true, sales: 289 },
    { key: '5', id: 'ML-005', game: 'Mobile Legends', name: '514 Diamonds', diamonds: 514, bonus: 0, price: 11.99, originalPrice: 11.99, active: true, sales: 198 },
    { key: '6', id: 'ML-006', game: 'Mobile Legends', name: '706 Diamonds', diamonds: 706, bonus: 0, price: 15.99, originalPrice: 15.99, active: true, sales: 156 },
    { key: '7', id: 'FF-001', game: 'Free Fire', name: '100 Diamonds', diamonds: 100, bonus: 10, price: 0.99, originalPrice: 1.49, active: true, sales: 678 },
    { key: '8', id: 'FF-002', game: 'Free Fire', name: '310 Diamonds', diamonds: 310, bonus: 31, price: 2.99, originalPrice: 3.99, active: true, sales: 534 },
    { key: '9', id: 'FF-003', game: 'Free Fire', name: '520 Diamonds', diamonds: 520, bonus: 52, price: 4.99, originalPrice: 5.99, active: true, sales: 423 },
    { key: '10', id: 'FF-004', game: 'Free Fire', name: '1060 Diamonds', diamonds: 1060, bonus: 106, price: 9.99, originalPrice: 11.99, active: true, sales: 312 },
    { key: '11', id: 'PUBG-001', game: 'PUBG Mobile', name: '60 UC', diamonds: 60, bonus: 0, price: 0.99, originalPrice: 0.99, active: true, sales: 456 },
    { key: '12', id: 'PUBG-002', game: 'PUBG Mobile', name: '325 UC', diamonds: 325, bonus: 0, price: 4.99, originalPrice: 4.99, active: false, sales: 234 },
  ];

  const handleAdd = () => {
    setEditingProduct(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    form.setFieldsValue(product);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    message.success(`Product ${id} deleted successfully`);
  };

  const handleSubmit = (values: unknown) => {
    if (editingProduct) {
      message.success('Product updated successfully');
    } else {
      message.success('Product created successfully');
    }
    setIsModalOpen(false);
    console.log(values);
  };

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchText.toLowerCase()) ||
    product.game.toLowerCase().includes(searchText.toLowerCase()) ||
    product.id.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns: ColumnsType<Product> = [
    {
      title: 'Product',
      key: 'product',
      render: (_, record) => (
        <Space>
          <Avatar 
            style={{ backgroundColor: 'var(--accent-primary)' }}
          >
            {record.game[0]}
          </Avatar>
          <div>
            <Text strong>{record.name}</Text>
            <br />
            <Text type="secondary" style={{ fontSize: 12 }}>{record.id}</Text>
          </div>
        </Space>
      ),
    },
    {
      title: 'Game',
      dataIndex: 'game',
      key: 'game',
      filters: [
        { text: 'Mobile Legends', value: 'Mobile Legends' },
        { text: 'Free Fire', value: 'Free Fire' },
        { text: 'PUBG Mobile', value: 'PUBG Mobile' },
      ],
      onFilter: (value, record) => record.game === value,
    },
    {
      title: 'Amount',
      key: 'amount',
      render: (_, record) => (
        <div>
          <Text>{record.diamonds}</Text>
          {record.bonus > 0 && (
            <Tag color="green" style={{ marginLeft: 8 }}>+{record.bonus}</Tag>
          )}
        </div>
      ),
    },
    {
      title: 'Price',
      key: 'price',
      render: (_, record) => (
        <div>
          <Text strong style={{ color: 'var(--accent-primary)' }}>${record.price}</Text>
          {record.price < record.originalPrice && (
            <>
              <br />
              <Text delete type="secondary">${record.originalPrice}</Text>
            </>
          )}
        </div>
      ),
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Sales',
      dataIndex: 'sales',
      key: 'sales',
      sorter: (a, b) => a.sales - b.sales,
    },
    {
      title: 'Status',
      dataIndex: 'active',
      key: 'active',
      render: (active) => (
        <Tag color={active ? 'green' : 'red'}>
          {active ? 'ACTIVE' : 'INACTIVE'}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button 
            type="text" 
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          />
          <Popconfirm
            title="Delete this product?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button 
              type="text" 
              icon={<DeleteOutlined />}
              danger
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="products-page">
      <div className="page-header">
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={2} className="gaming-title">Products</Title>
            <Text type="secondary">Manage game packages and pricing</Text>
          </Col>
          <Col>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
              Add Product
            </Button>
          </Col>
        </Row>
      </div>

      <Card className="products-card">
        <div className="products-toolbar">
          <Input 
            placeholder="Search products..." 
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 300 }}
          />
        </div>
        
        <Table 
          columns={columns} 
          dataSource={filteredProducts}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} products`,
          }}
        />
      </Card>

      <Modal
        title={editingProduct ? 'Edit Product' : 'Add Product'}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="game"
                label="Game"
                rules={[{ required: true, message: 'Please select a game' }]}
              >
                <Select
                  placeholder="Select game"
                  options={[
                    { value: 'Mobile Legends', label: 'Mobile Legends' },
                    { value: 'Free Fire', label: 'Free Fire' },
                    { value: 'PUBG Mobile', label: 'PUBG Mobile' },
                    { value: 'Genshin Impact', label: 'Genshin Impact' },
                    { value: 'Call of Duty Mobile', label: 'Call of Duty Mobile' },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Package Name"
                rules={[{ required: true, message: 'Please enter package name' }]}
              >
                <Input placeholder="e.g., 86 Diamonds" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="diamonds"
                label="Amount"
                rules={[{ required: true, message: 'Please enter amount' }]}
              >
                <InputNumber 
                  style={{ width: '100%' }} 
                  min={1}
                  placeholder="100"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="bonus"
                label="Bonus"
              >
                <InputNumber 
                  style={{ width: '100%' }} 
                  min={0}
                  placeholder="0"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="price"
                label="Price ($)"
                rules={[{ required: true, message: 'Please enter price' }]}
              >
                <InputNumber 
                  style={{ width: '100%' }} 
                  min={0}
                  step={0.01}
                  placeholder="9.99"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="originalPrice"
                label="Original Price ($)"
              >
                <InputNumber 
                  style={{ width: '100%' }} 
                  min={0}
                  step={0.01}
                  placeholder="9.99"
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="active"
            label="Status"
            valuePropName="checked"
          >
            <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                {editingProduct ? 'Update' : 'Create'}
              </Button>
              <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Products;
