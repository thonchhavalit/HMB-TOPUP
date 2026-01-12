import { Link } from 'react-router-dom';
import { Row, Col, Card, Button, Typography, Space } from 'antd';
import { ThunderboltOutlined, SafetyCertificateOutlined, RocketOutlined, CustomerServiceOutlined, SearchOutlined } from '@ant-design/icons';
import LiveActivity from '../../components/LiveActivity/LiveActivity';
import QuickTopUp from '../../components/QuickTopUp/QuickTopUp';
import FloatingReward from '../../components/FloatingReward/FloatingReward';
import { MLIcon, FFIcon, DiamondIcon } from '../../components/GameIcons/GameIcons';
import './HomePage.css';

const { Title, Text, Paragraph } = Typography;

const HomePage = () => {
  const games = [
    {
      id: 'mobile-legends',
      name: 'Mobile Legends',
      subtitle: 'Bang Bang',
      icon: <MLIcon size={64} />,
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    {
      id: 'free-fire',
      name: 'Free Fire',
      subtitle: 'Garena',
      icon: <FFIcon size={64} />,
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    },
  ];

  const trustBadges = [
    {
      icon: <SafetyCertificateOutlined style={{ fontSize: 32, color: '#ff2d78' }} />,
      title: 'Secure Payment',
      description: 'Protected transactions',
    },
    {
      icon: <RocketOutlined style={{ fontSize: 32, color: '#ff2d78' }} />,
      title: 'Instant Delivery',
      description: 'Receive in seconds',
    },
    {
      icon: <CustomerServiceOutlined style={{ fontSize: 32, color: '#ff2d78' }} />,
      title: 'Khmer Support',
      description: '24/7 local support',
    },
  ];

  const steps = [
    { number: 1, title: 'Select Game', desc: 'Choose your game from our list' },
    { number: 2, title: 'Enter ID', desc: 'Enter your Player ID & Server' },
    { number: 3, title: 'Choose Package', desc: 'Select your top-up amount' },
    { number: 4, title: 'Pay & Receive', desc: 'Pay securely and receive instantly' },
  ];

  return (
    <div className="home-page">
      {/* Floating Reward for engagement */}
      <FloatingReward onClaim={() => console.log('Reward claimed!')} />

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg-glow" />
        <div className="hero-container">
          <Row align="middle" gutter={[48, 48]}>
            <Col xs={24} md={14}>
              <div className="hero-content">
                <Title level={1} className="hero-title gaming-title">
                  <span className="hero-title-line">LEVEL UP</span>
                  <span className="hero-title-accent neon-glow">YOUR GAME</span>
                </Title>
                <Paragraph className="hero-subtitle">
                  Fast & secure game top-up service in Cambodia. 
                  Get your diamonds, UC, and in-game currency instantly!
                </Paragraph>
                <Space size="middle" wrap>
                  <Link to="/topup">
                    <Button 
                      type="primary" 
                      size="large" 
                      icon={<ThunderboltOutlined />}
                      className="hero-btn pulse-animation"
                    >
                      Top Up Now
                    </Button>
                  </Link>
                  <Link to="/order-status">
                    <Button 
                      size="large" 
                      icon={<SearchOutlined />}
                      className="hero-btn-outline"
                    >
                      Check Order
                    </Button>
                  </Link>
                </Space>
              </div>
            </Col>
            <Col xs={24} md={10}>
              <div className="hero-visual">
                <LiveActivity />
              </div>
            </Col>
          </Row>
        </div>
      </section>

      {/* Quick Top-Up Section */}
      <section className="quick-section">
        <div className="section-container">
          <Row gutter={[24, 24]} justify="center">
            <Col xs={24} md={16} lg={14}>
              <QuickTopUp />
            </Col>
          </Row>
        </div>
      </section>

      {/* Games Section */}
      <section className="games-section">
        <div className="section-container">
          <div className="section-header">
            <Title level={2} className="section-title gaming-title">Select Your Game</Title>
            <Text className="section-subtitle">
              Choose from our supported games and start topping up
            </Text>
          </div>
          <Row gutter={[24, 24]} justify="center">
            {games.map((game) => (
              <Col xs={24} sm={12} md={10} lg={8} key={game.id}>
                <Link to={`/topup/${game.id}`}>
                  <Card 
                    hoverable 
                    className="game-card"
                    cover={
                      <div 
                        className="game-card-banner"
                        style={{ background: game.gradient }}
                      >
                        <span className="game-card-icon">{game.icon}</span>
                      </div>
                    }
                  >
                    <Card.Meta
                      title={<span className="game-card-title">{game.name}</span>}
                      description={
                        <>
                          <Text type="secondary">{game.subtitle}</Text>
                          <div className="game-card-action">
                            Top Up Now <ThunderboltOutlined />
                          </div>
                        </>
                      }
                    />
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="trust-section">
        <div className="section-container">
          <Row gutter={[24, 24]} justify="center">
            {trustBadges.map((badge, index) => (
              <Col xs={24} sm={8} key={index}>
                <div className="trust-badge-card">
                  <div className="trust-badge-icon">{badge.icon}</div>
                  <Title level={4} style={{ color: '#fff', margin: '12px 0 4px' }}>
                    {badge.title}
                  </Title>
                  <Text type="secondary">{badge.description}</Text>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="section-container">
          <div className="section-header">
            <Title level={2} className="section-title gaming-title">How It Works</Title>
            <Text className="section-subtitle">
              Top up your game in 4 simple steps
            </Text>
          </div>
          <Row gutter={[24, 24]}>
            {steps.map((step) => (
              <Col xs={12} sm={12} md={6} key={step.number}>
                <div className="step-card">
                  <div className="step-number">{step.number}</div>
                  <Title level={4} style={{ color: '#fff', marginBottom: 8 }}>
                    {step.title}
                  </Title>
                  <Text type="secondary">{step.desc}</Text>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="section-container">
          <Card className="cta-card">
            <div className="cta-content">
              <Title level={2} className="gaming-title" style={{ color: '#fff' }}>
                Ready to Top Up?
              </Title>
              <Paragraph style={{ color: '#a0a0b0', fontSize: 16 }}>
                Join thousands of gamers who trust HMB for their game top-ups
              </Paragraph>
              <Link to="/topup">
                <Button 
                  type="primary" 
                  size="large" 
                  icon={<ThunderboltOutlined />}
                  className="pulse-animation"
                >
                  Start Now
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
