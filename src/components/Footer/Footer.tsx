import { Link } from 'react-router-dom';
import { Layout, Row, Col, Space, Typography, Divider } from 'antd';
import { FacebookOutlined, SendOutlined, SafetyCertificateOutlined, ThunderboltOutlined, CustomerServiceOutlined } from '@ant-design/icons';
import logo from '../../assets/image.png';
import './Footer.css';

const { Footer: AntFooter } = Layout;
const { Title, Text, Paragraph } = Typography;

const AppFooter = () => {
  return (
    <AntFooter className="app-footer">
      <div className="footer-container">
        <Row gutter={[32, 32]}>
          {/* Brand Section */}
          <Col xs={24} sm={24} md={8}>
            <div className="footer-brand">
              <Link to="/" className="footer-logo">
                <img src={logo} alt="HMB" style={{ height: 40 }} />
                <span className="gaming-title" style={{ color: '#ff2d78', marginLeft: 8 }}>TOP-UP</span>
              </Link>
              <Paragraph style={{ color: '#a0a0b0', marginTop: 16 }}>
                Fast & Secure Game Top-Up in Cambodia. Trusted by thousands of gamers.
              </Paragraph>
              <Space size="middle" style={{ marginTop: 16 }}>
                <div className="trust-badge">
                  <SafetyCertificateOutlined /> Secure
                </div>
                <div className="trust-badge">
                  <ThunderboltOutlined /> Instant
                </div>
                <div className="trust-badge">
                  <CustomerServiceOutlined /> 24/7
                </div>
              </Space>
            </div>
          </Col>

          {/* Quick Links */}
          <Col xs={12} sm={8} md={5}>
            <Title level={5} style={{ color: '#fff', marginBottom: 16 }}>Quick Links</Title>
            <Space direction="vertical" size="small">
              <Link to="/" className="footer-link">Home</Link>
              <Link to="/topup" className="footer-link">Top Up</Link>
              <Link to="/order-status" className="footer-link">Check Order</Link>
              <Link to="/support" className="footer-link">Support</Link>
            </Space>
          </Col>

          {/* Games */}
          <Col xs={12} sm={8} md={5}>
            <Title level={5} style={{ color: '#fff', marginBottom: 16 }}>Games</Title>
            <Space direction="vertical" size="small">
              <Link to="/topup/mobile-legends" className="footer-link">Mobile Legends</Link>
              <Link to="/topup/free-fire" className="footer-link">Free Fire</Link>
            </Space>
          </Col>

          {/* Payment Methods */}
          <Col xs={24} sm={8} md={6}>
            <Title level={5} style={{ color: '#fff', marginBottom: 16 }}>Payment Methods</Title>
            <Space direction="vertical" size="small">
              <Text style={{ color: '#a0a0b0' }}>🏦 ABA Bank</Text>
              <Text style={{ color: '#a0a0b0' }}>💳 Wing</Text>
              <Text style={{ color: '#a0a0b0' }}>📱 KHQR</Text>
            </Space>
          </Col>
        </Row>

        <Divider style={{ borderColor: '#2a2a3e', margin: '32px 0 24px' }} />

        <Row justify="space-between" align="middle">
          <Col xs={24} md={12}>
            <Text style={{ color: '#6b6b75' }}>
              © 2026 HMB Top-Up. All rights reserved.
            </Text>
          </Col>
          <Col xs={24} md={12} style={{ textAlign: 'right' }}>
            <Space size="middle" className="social-links">
              <a href="#" className="social-link" aria-label="Facebook">
                <FacebookOutlined style={{ fontSize: 20 }} />
              </a>
              <a href="#" className="social-link" aria-label="Telegram">
                <SendOutlined style={{ fontSize: 20 }} />
              </a>
            </Space>
          </Col>
        </Row>
      </div>
    </AntFooter>
  );
};

export default AppFooter;
