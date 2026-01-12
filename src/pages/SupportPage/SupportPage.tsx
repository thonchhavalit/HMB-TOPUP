import { useState } from 'react';
import { 
  Card, Button, Input, Typography, Space, Row, Col, 
  Collapse, Form, message 
} from 'antd';
import { 
  SendOutlined, MessageOutlined, MailOutlined, 
  ClockCircleOutlined, GlobalOutlined, CustomerServiceOutlined 
} from '@ant-design/icons';
import './SupportPage.css';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Panel } = Collapse;

const SupportPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const faqs = [
    {
      question: 'How long does it take to receive my top-up?',
      answer: 'Most orders are delivered instantly within 1-5 minutes. In rare cases, it may take up to 30 minutes during peak hours.',
    },
    {
      question: 'What should I do if I entered the wrong Player ID?',
      answer: 'Please contact our support immediately. If the order has not been processed, we can help correct it. Once delivered, we cannot reverse the transaction.',
    },
    {
      question: 'Which payment methods are supported?',
      answer: 'We support ABA Bank, Wing, and KHQR. All payments are processed securely through our payment partners.',
    },
    {
      question: 'Is my payment information safe?',
      answer: 'Yes! We use industry-standard encryption and never store your payment details. All transactions are processed through secure payment gateways.',
    },
    {
      question: 'Can I get a refund?',
      answer: 'Refunds are available for orders that were not delivered due to system errors. Please contact support with your order ID for assistance.',
    },
    {
      question: 'How do I find my Player ID?',
      answer: 'Open your game, go to your profile, and look for your Player ID. It\'s usually displayed at the top of your profile page.',
    },
  ];

  const handleSubmit = async (_values: unknown) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      message.success('Thank you for your message! We will get back to you soon.');
      form.resetFields();
    }, 1500);
  };

  const contactCards = [
    {
      icon: <SendOutlined style={{ fontSize: 32, color: '#ff2d78' }} />,
      title: 'Telegram',
      desc: 'Chat with us instantly',
      action: '@HMBSupport',
    },
    {
      icon: <MessageOutlined style={{ fontSize: 32, color: '#ff2d78' }} />,
      title: 'Messenger',
      desc: 'Facebook support',
      action: 'Send Message',
    },
    {
      icon: <MailOutlined style={{ fontSize: 32, color: '#ff2d78' }} />,
      title: 'Email',
      desc: 'Get detailed support',
      action: 'support@hmb.com',
    },
  ];

  const supportHours = [
    { icon: <ClockCircleOutlined />, title: 'Response Time', value: 'Within 15 minutes' },
    { icon: <GlobalOutlined />, title: 'Availability', value: '24/7 Support' },
    { icon: <CustomerServiceOutlined />, title: 'Languages', value: 'Khmer & English' },
  ];

  return (
    <div className="support-page">
      <div className="support-container">
        {/* Hero Section */}
        <div className="support-hero">
          <Title level={1} className="gaming-title" style={{ color: '#fff' }}>
            How Can We Help?
          </Title>
          <Paragraph style={{ color: '#a0a0b0', fontSize: 18 }}>
            We're here to assist you 24/7. Choose your preferred contact method or check our FAQs.
          </Paragraph>
        </div>

        {/* Contact Cards */}
        <Row gutter={[24, 24]} className="contact-section">
          {contactCards.map((card, index) => (
            <Col xs={24} sm={8} key={index}>
              <Card hoverable className="contact-card">
                <Space direction="vertical" align="center" style={{ width: '100%' }}>
                  {card.icon}
                  <Title level={4} style={{ color: '#fff', margin: '12px 0 4px' }}>{card.title}</Title>
                  <Text type="secondary">{card.desc}</Text>
                  <Button type="link" style={{ color: '#ff2d78', padding: 0 }}>
                    {card.action} →
                  </Button>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>

        {/* FAQ Section */}
        <section className="faq-section">
          <Title level={2} className="gaming-title" style={{ color: '#fff', textAlign: 'center', marginBottom: 32 }}>
            Frequently Asked Questions
          </Title>
          <Collapse 
            accordion 
            ghost
            className="faq-collapse"
            expandIconPosition="end"
          >
            {faqs.map((faq, index) => (
              <Panel 
                header={<Text strong style={{ color: '#fff', fontSize: 16 }}>{faq.question}</Text>} 
                key={index}
                className="faq-panel"
              >
                <Paragraph style={{ color: '#a0a0b0', margin: 0 }}>
                  {faq.answer}
                </Paragraph>
              </Panel>
            ))}
          </Collapse>
        </section>

        {/* Contact Form */}
        <section className="form-section">
          <Card className="form-card">
            <Title level={2} className="gaming-title" style={{ color: '#fff', textAlign: 'center' }}>
              Send Us a Message
            </Title>
            <Paragraph type="secondary" style={{ textAlign: 'center', marginBottom: 32 }}>
              Fill out the form below and we'll get back to you as soon as possible.
            </Paragraph>
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              requiredMark={false}
            >
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="name"
                    label={<span style={{ color: '#fff' }}>Your Name</span>}
                    rules={[{ required: true, message: 'Please enter your name' }]}
                  >
                    <Input size="large" placeholder="Enter your name" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="email"
                    label={<span style={{ color: '#fff' }}>Email Address</span>}
                    rules={[
                      { required: true, message: 'Please enter your email' },
                      { type: 'email', message: 'Please enter a valid email' },
                    ]}
                  >
                    <Input size="large" placeholder="Enter your email" />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item
                name="orderId"
                label={<span style={{ color: '#fff' }}>Order ID (Optional)</span>}
              >
                <Input size="large" placeholder="Enter your order ID if applicable" />
              </Form.Item>
              <Form.Item
                name="message"
                label={<span style={{ color: '#fff' }}>Message</span>}
                rules={[{ required: true, message: 'Please enter your message' }]}
              >
                <TextArea 
                  rows={5} 
                  placeholder="Describe your issue or question..." 
                  style={{ resize: 'none' }}
                />
              </Form.Item>
              <Form.Item>
                <Button 
                  type="primary" 
                  size="large" 
                  htmlType="submit" 
                  loading={loading}
                  block
                  className="pulse-animation"
                >
                  Send Message
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </section>

        {/* Support Hours */}
        <Card className="hours-card">
          <Title level={3} style={{ color: '#fff', textAlign: 'center', marginBottom: 24 }}>
            Support Hours
          </Title>
          <Row gutter={[24, 24]} justify="center">
            {supportHours.map((item, index) => (
              <Col xs={24} sm={8} key={index}>
                <Space direction="vertical" align="center" style={{ width: '100%' }}>
                  <div className="hours-icon">{item.icon}</div>
                  <Title level={5} style={{ color: '#fff', margin: 0 }}>{item.title}</Title>
                  <Text type="secondary">{item.value}</Text>
                </Space>
              </Col>
            ))}
          </Row>
        </Card>
      </div>
    </div>
  );
};

export default SupportPage;
