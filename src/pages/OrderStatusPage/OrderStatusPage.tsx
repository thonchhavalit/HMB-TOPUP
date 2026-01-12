import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Card, Button, Input, Typography, Space, Result, Steps, 
  Spin, Row, Col, Descriptions 
} from 'antd';
import { 
  SearchOutlined, CheckCircleOutlined, ClockCircleOutlined, 
  CloseCircleOutlined, SendOutlined, MessageOutlined 
} from '@ant-design/icons';
import './OrderStatusPage.css';

const { Title, Text, Paragraph } = Typography;

type OrderStatus = 'success' | 'pending' | 'failed' | null;

interface OrderDetails {
  orderId: string;
  status: OrderStatus;
  game: string;
  package: string;
  playerId: string;
  date: string;
  paymentMethod: string;
  amount: string;
}

const OrderStatusPage = () => {
  const [searchParams] = useSearchParams();
  const [orderId, setOrderId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [error, setError] = useState('');

  const isSuccessRedirect = searchParams.get('success') === 'true';

  const handleSearch = () => {
    if (orderId.length < 6) {
      setError('Please enter a valid Order ID');
      return;
    }

    setIsLoading(true);
    setError('');

    setTimeout(() => {
      const mockOrder: OrderDetails = {
        orderId: orderId,
        status: Math.random() > 0.3 ? 'success' : 'pending',
        game: 'Mobile Legends',
        package: '284 Diamonds (+28 Bonus)',
        playerId: '123456789',
        date: new Date().toLocaleString(),
        paymentMethod: 'ABA Bank',
        amount: '$4.99',
      };

      setOrderDetails(mockOrder);
      setIsLoading(false);
    }, 1500);
  };

  const getStatusConfig = (status: OrderStatus) => {
    switch (status) {
      case 'success':
        return {
          icon: <CheckCircleOutlined style={{ color: '#00ff88' }} />,
          status: 'success' as const,
          title: 'Order Completed!',
          message: 'Your order has been delivered successfully!',
          currentStep: 2,
        };
      case 'pending':
        return {
          icon: <ClockCircleOutlined style={{ color: '#ffaa00' }} />,
          status: 'warning' as const,
          title: 'Processing Order',
          message: 'Your order is being processed. Please wait...',
          currentStep: 1,
        };
      case 'failed':
        return {
          icon: <CloseCircleOutlined style={{ color: '#ff4d6a' }} />,
          status: 'error' as const,
          title: 'Order Failed',
          message: 'Order failed. Please contact support.',
          currentStep: 0,
        };
      default:
        return null;
    }
  };

  const statusConfig = orderDetails ? getStatusConfig(orderDetails.status) : null;

  return (
    <div className="order-status-page">
      <div className="order-status-container">
        {/* Success Banner */}
        {isSuccessRedirect && !orderDetails && (
          <Result
            status="success"
            title="Order Submitted Successfully!"
            subTitle="Your order has been submitted. Check your order status below."
            className="success-result"
          />
        )}

        {/* Search Section */}
        <Card className="search-card">
          <Title level={2} className="gaming-title" style={{ color: '#fff', textAlign: 'center' }}>
            Check Order Status
          </Title>
          <Paragraph type="secondary" style={{ textAlign: 'center', marginBottom: 24 }}>
            Enter your Order ID to track your order
          </Paragraph>
          <Space.Compact style={{ width: '100%', maxWidth: 500, margin: '0 auto', display: 'flex' }}>
            <Input
              size="large"
              placeholder="Enter Order ID (e.g., HMB123456)"
              value={orderId}
              onChange={(e) => {
                setOrderId(e.target.value);
                setError('');
              }}
              status={error ? 'error' : ''}
              prefix={<SearchOutlined />}
            />
            <Button
              type="primary"
              size="large"
              onClick={handleSearch}
              loading={isLoading}
              icon={<SearchOutlined />}
            >
              Check
            </Button>
          </Space.Compact>
          {error && <Text type="danger" style={{ display: 'block', textAlign: 'center', marginTop: 8 }}>{error}</Text>}
        </Card>

        {/* Loading State */}
        {isLoading && (
          <div className="loading-section">
            <Spin size="large" />
            <Text type="secondary" style={{ marginTop: 16 }}>Searching for your order...</Text>
          </div>
        )}

        {/* Order Details */}
        {orderDetails && !isLoading && statusConfig && (
          <div className="order-results">
            {/* Status Card */}
            <Result
              icon={statusConfig.icon}
              status={statusConfig.status}
              title={<span style={{ color: '#fff' }}>{statusConfig.title}</span>}
              subTitle={statusConfig.message}
              className="status-result"
            />

            {/* Progress Steps */}
            <Card className="progress-card">
              <Steps
                current={statusConfig.currentStep}
                status={orderDetails.status === 'failed' ? 'error' : undefined}
                items={[
                  { title: 'Order Placed', icon: <CheckCircleOutlined /> },
                  { title: 'Processing', icon: <ClockCircleOutlined /> },
                  { title: 'Delivered', icon: <CheckCircleOutlined /> },
                ]}
              />
            </Card>

            {/* Order Info */}
            <Card className="order-info-card" title="Order Details">
              <Descriptions column={{ xs: 1, sm: 2 }} labelStyle={{ color: '#a0a0b0' }} contentStyle={{ color: '#fff' }}>
                <Descriptions.Item label="Order ID">{orderDetails.orderId}</Descriptions.Item>
                <Descriptions.Item label="Date">{orderDetails.date}</Descriptions.Item>
                <Descriptions.Item label="Game">{orderDetails.game}</Descriptions.Item>
                <Descriptions.Item label="Package">{orderDetails.package}</Descriptions.Item>
                <Descriptions.Item label="Player ID">{orderDetails.playerId}</Descriptions.Item>
                <Descriptions.Item label="Payment">{orderDetails.paymentMethod}</Descriptions.Item>
                <Descriptions.Item label="Amount">
                  <Text strong style={{ color: '#ff2d78', fontSize: 18 }}>{orderDetails.amount}</Text>
                </Descriptions.Item>
              </Descriptions>
            </Card>

            {/* Actions */}
            <Space size="middle" style={{ marginTop: 24 }}>
              <Button size="large" onClick={() => { setOrderDetails(null); setOrderId(''); }}>
                Check Another Order
              </Button>
              <Link to="/support">
                <Button type="primary" size="large">
                  Contact Support
                </Button>
              </Link>
            </Space>
          </div>
        )}

        {/* Help Section */}
        <Card className="help-card">
          <Title level={4} style={{ color: '#fff' }}>Need Help?</Title>
          <Paragraph type="secondary">
            If you have any issues with your order, please contact our support team.
            We're available 24/7 to assist you.
          </Paragraph>
          <Row gutter={[16, 16]}>
            <Col xs={12}>
              <Button block icon={<SendOutlined />} size="large">
                Telegram
              </Button>
            </Col>
            <Col xs={12}>
              <Button block icon={<MessageOutlined />} size="large">
                Messenger
              </Button>
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  );
};

export default OrderStatusPage;
