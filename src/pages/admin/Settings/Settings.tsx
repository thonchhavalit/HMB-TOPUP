import { Card, Row, Col, Typography, Form, Input, Switch, Button, Divider, Select, Space, message, Tabs } from 'antd';
import {
  SaveOutlined,
  MailOutlined,
  BellOutlined,
  LockOutlined,
  GlobalOutlined,
  DollarOutlined,
} from '@ant-design/icons';
import './Settings.css';

const { Title, Text } = Typography;
const { TextArea } = Input;

const Settings = () => {
  const [generalForm] = Form.useForm();
  const [notificationForm] = Form.useForm();

  const handleSaveGeneral = (values: unknown) => {
    console.log(values);
    message.success('General settings saved successfully');
  };

  const handleSaveNotifications = (values: unknown) => {
    console.log(values);
    message.success('Notification settings saved successfully');
  };

  const tabItems = [
    {
      key: 'general',
      label: (
        <span>
          <GlobalOutlined />
          General
        </span>
      ),
      children: (
        <Form
          form={generalForm}
          layout="vertical"
          onFinish={handleSaveGeneral}
          initialValues={{
            siteName: 'HMB Top-Up',
            siteDescription: 'Fast & Secure Game Top-Up Service in Cambodia',
            contactEmail: 'support@hmb-topup.com',
            contactPhone: '+855 12 345 678',
            currency: 'USD',
            timezone: 'Asia/Phnom_Penh',
            maintenanceMode: false,
          }}
        >
          <Row gutter={24}>
            <Col xs={24} md={12}>
              <Form.Item name="siteName" label="Site Name">
                <Input placeholder="Site Name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="contactEmail" label="Contact Email">
                <Input prefix={<MailOutlined />} placeholder="Email" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="siteDescription" label="Site Description">
            <TextArea rows={3} placeholder="Description" />
          </Form.Item>

          <Row gutter={24}>
            <Col xs={24} md={12}>
              <Form.Item name="contactPhone" label="Contact Phone">
                <Input placeholder="Phone" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="timezone" label="Timezone">
                <Select
                  options={[
                    { value: 'Asia/Phnom_Penh', label: 'Asia/Phnom_Penh (UTC+7)' },
                    { value: 'Asia/Bangkok', label: 'Asia/Bangkok (UTC+7)' },
                    { value: 'Asia/Singapore', label: 'Asia/Singapore (UTC+8)' },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col xs={24} md={12}>
              <Form.Item name="currency" label="Default Currency">
                <Select
                  options={[
                    { value: 'USD', label: 'USD ($)' },
                    { value: 'KHR', label: 'KHR (៛)' },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="maintenanceMode" label="Maintenance Mode" valuePropName="checked">
                <Switch checkedChildren="On" unCheckedChildren="Off" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      ),
    },
    {
      key: 'notifications',
      label: (
        <span>
          <BellOutlined />
          Notifications
        </span>
      ),
      children: (
        <Form
          form={notificationForm}
          layout="vertical"
          onFinish={handleSaveNotifications}
          initialValues={{
            emailNotifications: true,
            orderAlerts: true,
            lowStockAlerts: true,
            dailyReport: true,
            weeklyReport: false,
          }}
        >
          <div className="setting-group">
            <Title level={5}>Email Notifications</Title>
            <Text type="secondary">Configure email notification preferences</Text>
            
            <div className="setting-items">
              <div className="setting-item">
                <div>
                  <Text strong>Email Notifications</Text>
                  <br />
                  <Text type="secondary">Receive notifications via email</Text>
                </div>
                <Form.Item name="emailNotifications" valuePropName="checked" noStyle>
                  <Switch />
                </Form.Item>
              </div>
              
              <div className="setting-item">
                <div>
                  <Text strong>Order Alerts</Text>
                  <br />
                  <Text type="secondary">Get notified for new orders</Text>
                </div>
                <Form.Item name="orderAlerts" valuePropName="checked" noStyle>
                  <Switch />
                </Form.Item>
              </div>
              
              <div className="setting-item">
                <div>
                  <Text strong>Low Stock Alerts</Text>
                  <br />
                  <Text type="secondary">Alert when product stock is low</Text>
                </div>
                <Form.Item name="lowStockAlerts" valuePropName="checked" noStyle>
                  <Switch />
                </Form.Item>
              </div>
            </div>
          </div>

          <Divider />

          <div className="setting-group">
            <Title level={5}>Reports</Title>
            <Text type="secondary">Configure automated report delivery</Text>
            
            <div className="setting-items">
              <div className="setting-item">
                <div>
                  <Text strong>Daily Report</Text>
                  <br />
                  <Text type="secondary">Receive daily sales summary</Text>
                </div>
                <Form.Item name="dailyReport" valuePropName="checked" noStyle>
                  <Switch />
                </Form.Item>
              </div>
              
              <div className="setting-item">
                <div>
                  <Text strong>Weekly Report</Text>
                  <br />
                  <Text type="secondary">Receive weekly analytics report</Text>
                </div>
                <Form.Item name="weeklyReport" valuePropName="checked" noStyle>
                  <Switch />
                </Form.Item>
              </div>
            </div>
          </div>

          <Form.Item style={{ marginTop: 24 }}>
            <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      ),
    },
    {
      key: 'payment',
      label: (
        <span>
          <DollarOutlined />
          Payment
        </span>
      ),
      children: (
        <div>
          <div className="setting-group">
            <Title level={5}>Payment Gateways</Title>
            <Text type="secondary">Configure payment methods</Text>
            
            <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
              <Col xs={24} md={8}>
                <Card className="payment-card">
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <div className="payment-header">
                      <Text strong>ABA Bank</Text>
                      <Switch defaultChecked />
                    </div>
                    <Text type="secondary">KHQR Payment</Text>
                  </Space>
                </Card>
              </Col>
              <Col xs={24} md={8}>
                <Card className="payment-card">
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <div className="payment-header">
                      <Text strong>Wing</Text>
                      <Switch defaultChecked />
                    </div>
                    <Text type="secondary">Mobile Payment</Text>
                  </Space>
                </Card>
              </Col>
              <Col xs={24} md={8}>
                <Card className="payment-card">
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <div className="payment-header">
                      <Text strong>ACLEDA</Text>
                      <Switch defaultChecked />
                    </div>
                    <Text type="secondary">Bank Transfer</Text>
                  </Space>
                </Card>
              </Col>
            </Row>
          </div>

          <Divider />

          <Form layout="vertical">
            <Title level={5}>Commission Settings</Title>
            <Row gutter={24}>
              <Col xs={24} md={12}>
                <Form.Item label="Platform Fee (%)">
                  <Input type="number" defaultValue="2.5" suffix="%" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item label="Minimum Order Amount">
                  <Input type="number" defaultValue="0.99" prefix="$" />
                </Form.Item>
              </Col>
            </Row>
            <Button type="primary" icon={<SaveOutlined />}>
              Save Changes
            </Button>
          </Form>
        </div>
      ),
    },
    {
      key: 'security',
      label: (
        <span>
          <LockOutlined />
          Security
        </span>
      ),
      children: (
        <div>
          <div className="setting-group">
            <Title level={5}>Change Password</Title>
            <Text type="secondary">Update your admin password</Text>
            
            <Form layout="vertical" style={{ marginTop: 16, maxWidth: 400 }}>
              <Form.Item name="currentPassword" label="Current Password">
                <Input.Password placeholder="Current password" />
              </Form.Item>
              <Form.Item name="newPassword" label="New Password">
                <Input.Password placeholder="New password" />
              </Form.Item>
              <Form.Item name="confirmPassword" label="Confirm Password">
                <Input.Password placeholder="Confirm new password" />
              </Form.Item>
              <Button type="primary" icon={<SaveOutlined />}>
                Update Password
              </Button>
            </Form>
          </div>

          <Divider />

          <div className="setting-group">
            <Title level={5}>Two-Factor Authentication</Title>
            <Text type="secondary">Add an extra layer of security</Text>
            
            <div className="setting-items" style={{ marginTop: 16 }}>
              <div className="setting-item">
                <div>
                  <Text strong>Enable 2FA</Text>
                  <br />
                  <Text type="secondary">Use authenticator app for login</Text>
                </div>
                <Switch />
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="settings-page">
      <div className="page-header">
        <Title level={2} className="gaming-title">Settings</Title>
        <Text type="secondary">Manage your application settings</Text>
      </div>

      <Card className="settings-card">
        <Tabs items={tabItems} tabPosition="left" className="settings-tabs" />
      </Card>
    </div>
  );
};

export default Settings;
