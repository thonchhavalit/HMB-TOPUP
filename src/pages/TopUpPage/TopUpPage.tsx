import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Steps, Card, Button, Input, Row, Col, Typography, Space, 
  Radio, Divider, Alert, Spin, Badge 
} from 'antd';
import { 
  UserOutlined, IdcardOutlined, ShoppingOutlined, 
  CreditCardOutlined, CheckCircleOutlined, ArrowLeftOutlined,
  BankOutlined, WalletOutlined, QrcodeOutlined
} from '@ant-design/icons';
import './TopUpPage.css';

const { Title, Text, Paragraph } = Typography;

interface Package {
  id: string;
  amount: number;
  bonus?: number;
  price: number;
  currency: string;
  popular?: boolean;
}

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
}

const TopUpPage = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [playerId, setPlayerId] = useState('');
  const [serverId, setServerId] = useState('');
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const games: Record<string, { name: string; currency: string; icon: string }> = {
    'mobile-legends': { name: 'Mobile Legends', currency: 'Diamonds', icon: '💎' },
    'free-fire': { name: 'Free Fire', currency: 'Diamonds', icon: '🔥' },
  };

  const currentGame = gameId && games[gameId] ? games[gameId] : games['mobile-legends'];

  const packages: Package[] = [
    { id: '1', amount: 56, price: 0.99, currency: 'USD' },
    { id: '2', amount: 112, price: 1.99, currency: 'USD' },
    { id: '3', amount: 284, bonus: 28, price: 4.99, currency: 'USD', popular: true },
    { id: '4', amount: 568, bonus: 56, price: 9.99, currency: 'USD' },
    { id: '5', amount: 1155, bonus: 115, price: 19.99, currency: 'USD' },
    { id: '6', amount: 2330, bonus: 233, price: 39.99, currency: 'USD' },
  ];

  const paymentMethods: PaymentMethod[] = [
    { id: 'aba', name: 'ABA Bank', icon: <BankOutlined />, description: 'Pay with ABA Mobile' },
    { id: 'wing', name: 'Wing', icon: <WalletOutlined />, description: 'Pay with Wing App' },
    { id: 'khqr', name: 'KHQR', icon: <QrcodeOutlined />, description: 'Scan QR to pay' },
  ];

  const stepItems = [
    { title: 'Player Info', icon: <UserOutlined /> },
    { title: 'Package', icon: <ShoppingOutlined /> },
    { title: 'Payment', icon: <CreditCardOutlined /> },
    { title: 'Confirm', icon: <CheckCircleOutlined /> },
  ];

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleConfirm = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      navigate('/order-status?success=true');
    }, 2000);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return playerId.length >= 5 && serverId.length >= 1;
      case 1:
        return selectedPackage !== null;
      case 2:
        return selectedPayment !== null;
      default:
        return true;
    }
  };

  const getSelectedPackageDetails = () => packages.find((p) => p.id === selectedPackage);
  const getSelectedPaymentDetails = () => paymentMethods.find((p) => p.id === selectedPayment);

  if (isProcessing) {
    return (
      <div className="topup-page">
        <div className="processing-overlay">
          <Spin size="large" />
          <Title level={3} style={{ color: '#fff', marginTop: 24 }}>
            Processing your order...
          </Title>
          <Text type="secondary">Please wait while we process your payment</Text>
        </div>
      </div>
    );
  }

  return (
    <div className="topup-page">
      <div className="topup-container">
        {/* Page Header */}
        <div className="topup-header">
          <Space align="center" size="middle">
            <span className="topup-game-icon">{currentGame.icon}</span>
            <div>
              <Title level={2} style={{ margin: 0, color: '#fff' }} className="gaming-title">
                {currentGame.name}
              </Title>
              <Text type="secondary">Top Up {currentGame.currency}</Text>
            </div>
          </Space>
        </div>

        {/* Progress Steps */}
        <Steps
          current={currentStep}
          items={stepItems}
          className="topup-steps"
          responsive={false}
        />

        {/* Step Content */}
        <Card className="step-content-card">
          {/* Step 1: Player Info */}
          {currentStep === 0 && (
            <div className="step-panel">
              <Title level={3} style={{ color: '#fff' }}>Enter Player Information</Title>
              <Paragraph type="secondary">
                Enter your in-game Player ID and Server ID to proceed
              </Paragraph>
              <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                  <label className="input-label">Player ID</label>
                  <Input
                    size="large"
                    prefix={<IdcardOutlined />}
                    placeholder="Enter your Player ID"
                    value={playerId}
                    onChange={(e) => setPlayerId(e.target.value)}
                  />
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    Find this in your game profile
                  </Text>
                </Col>
                <Col xs={24} md={12}>
                  <label className="input-label">Server ID</label>
                  <Input
                    size="large"
                    prefix={<UserOutlined />}
                    placeholder="Enter Server ID"
                    value={serverId}
                    onChange={(e) => setServerId(e.target.value)}
                  />
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    Usually found next to Player ID
                  </Text>
                </Col>
              </Row>
              <Alert
                message="Important"
                description="Make sure to enter the correct IDs. Incorrect information may result in failed delivery."
                type="warning"
                showIcon
                style={{ marginTop: 24, background: 'rgba(255, 170, 0, 0.1)', border: '1px solid rgba(255, 170, 0, 0.3)' }}
              />
            </div>
          )}

          {/* Step 2: Select Package */}
          {currentStep === 1 && (
            <div className="step-panel">
              <Title level={3} style={{ color: '#fff' }}>Select Package</Title>
              <Paragraph type="secondary">
                Choose your {currentGame.currency} package
              </Paragraph>
              <Radio.Group 
                value={selectedPackage} 
                onChange={(e) => setSelectedPackage(e.target.value)}
                style={{ width: '100%' }}
              >
                <Row gutter={[16, 16]}>
                  {packages.map((pkg) => (
                    <Col xs={12} sm={8} md={8} key={pkg.id}>
                      <Badge.Ribbon text="Popular" color="#ff2d78" style={{ display: pkg.popular ? 'block' : 'none' }}>
                        <Card
                          className={`package-card ${selectedPackage === pkg.id ? 'package-card--selected' : ''}`}
                          onClick={() => setSelectedPackage(pkg.id)}
                          hoverable
                        >
                          <div className="package-amount">
                            <span className="package-icon">{currentGame.icon}</span>
                            <span className="package-number">{pkg.amount}</span>
                            {pkg.bonus && (
                              <span className="package-bonus">+{pkg.bonus}</span>
                            )}
                          </div>
                          <div className="package-price">
                            ${pkg.price.toFixed(2)}
                          </div>
                        </Card>
                      </Badge.Ribbon>
                    </Col>
                  ))}
                </Row>
              </Radio.Group>
            </div>
          )}

          {/* Step 3: Select Payment */}
          {currentStep === 2 && (
            <div className="step-panel">
              <Title level={3} style={{ color: '#fff' }}>Select Payment Method</Title>
              <Paragraph type="secondary">
                Choose how you want to pay
              </Paragraph>
              <Radio.Group 
                value={selectedPayment} 
                onChange={(e) => setSelectedPayment(e.target.value)}
                style={{ width: '100%' }}
              >
                <Row gutter={[16, 16]}>
                  {paymentMethods.map((method) => (
                    <Col xs={24} sm={8} key={method.id}>
                      <Card
                        className={`payment-card ${selectedPayment === method.id ? 'payment-card--selected' : ''}`}
                        onClick={() => setSelectedPayment(method.id)}
                        hoverable
                      >
                        <Space direction="vertical" align="center" style={{ width: '100%' }}>
                          <div className="payment-icon">{method.icon}</div>
                          <Title level={5} style={{ margin: 0, color: '#fff' }}>{method.name}</Title>
                          <Text type="secondary">{method.description}</Text>
                        </Space>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Radio.Group>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {currentStep === 3 && (
            <div className="step-panel">
              <Title level={3} style={{ color: '#fff' }}>Order Confirmation</Title>
              <Paragraph type="secondary">
                Review your order before proceeding
              </Paragraph>
              <Card className="confirmation-card">
                <div className="confirmation-row">
                  <Text type="secondary">Game</Text>
                  <Space>
                    <span>{currentGame.icon}</span>
                    <Text strong style={{ color: '#fff' }}>{currentGame.name}</Text>
                  </Space>
                </div>
                <Divider style={{ borderColor: '#2a2a3e', margin: '16px 0' }} />
                <div className="confirmation-row">
                  <Text type="secondary">Player Info</Text>
                  <Text style={{ color: '#fff' }}>ID: {playerId} | Server: {serverId}</Text>
                </div>
                <Divider style={{ borderColor: '#2a2a3e', margin: '16px 0' }} />
                <div className="confirmation-row">
                  <Text type="secondary">Package</Text>
                  <Text style={{ color: '#fff' }}>
                    {getSelectedPackageDetails()?.amount} {currentGame.currency}
                    {getSelectedPackageDetails()?.bonus && (
                      <Text type="success"> (+{getSelectedPackageDetails()?.bonus} Bonus)</Text>
                    )}
                  </Text>
                </div>
                <Divider style={{ borderColor: '#2a2a3e', margin: '16px 0' }} />
                <div className="confirmation-row">
                  <Text type="secondary">Payment Method</Text>
                  <Space>
                    {getSelectedPaymentDetails()?.icon}
                    <Text style={{ color: '#fff' }}>{getSelectedPaymentDetails()?.name}</Text>
                  </Space>
                </div>
                <Divider style={{ borderColor: '#2a2a3e', margin: '16px 0' }} />
                <div className="confirmation-row confirmation-total">
                  <Title level={4} style={{ margin: 0, color: '#fff' }}>Total</Title>
                  <Title level={3} style={{ margin: 0, color: '#ff2d78' }}>
                    ${getSelectedPackageDetails()?.price.toFixed(2)}
                  </Title>
                </div>
              </Card>
            </div>
          )}
        </Card>

        {/* Navigation Buttons */}
        <div className="step-navigation">
          {currentStep > 0 && (
            <Button 
              size="large" 
              icon={<ArrowLeftOutlined />}
              onClick={handlePrevStep}
            >
              Back
            </Button>
          )}
          <div style={{ flex: 1 }} />
          {currentStep < 3 ? (
            <Button
              type="primary"
              size="large"
              onClick={handleNextStep}
              disabled={!canProceed()}
              className={canProceed() ? 'pulse-animation' : ''}
            >
              Continue
            </Button>
          ) : (
            <Button
              type="primary"
              size="large"
              onClick={handleConfirm}
              className="pulse-animation"
            >
              Confirm & Pay
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopUpPage;
