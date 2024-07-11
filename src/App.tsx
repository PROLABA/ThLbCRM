import React, { useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  MenuUnfoldOutlined, MenuFoldOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Input, Layout, Menu, Radio, Space, theme, Switch, ConfigProvider, Button, Flex } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Option 1', '1', <PieChartOutlined />),
  getItem('Option 2', '2', <DesktopOutlined />),
  getItem('User', 'sub1', <UserOutlined />, [
    getItem('Tom', '3'),
    getItem('Bill', '4'),
    getItem('Alex', '5'),
  ]),
  getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  getItem('Files', '9', <FileOutlined />),
];

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const lightTheme = {
    token: {
      colorBgContainer: '#FFFFFF',
      colorText: '#000000',
    },
  };

  const darkTheme = {
    token: {
      colorBgContainer: '#002140',
      colorText: 'rgba(255, 255, 255, 0.65)',
    },
  };

  const selectedTheme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ConfigProvider theme={selectedTheme}>
      <Layout style={{ minHeight: '100vh', backgroundColor: selectedTheme.token.colorBgContainer }}>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          theme={isDarkMode ? 'dark' : 'light'}
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
        >
          <div>
            <div className="demo-logo-vertical" />
            <Menu
              theme={isDarkMode ? 'dark' : 'light'}
              defaultSelectedKeys={['1']}
              mode="inline"
              items={items}
            />
          </div>

        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: selectedTheme.token.colorBgContainer }}>
            <Flex align='center' gap={"10px"}>
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: '16px',
                  width: 64,
                  height: 64,
                }}

              />
              <Switch
                checked={isDarkMode}
                onChange={(checked) => setIsDarkMode(checked)}
                checkedChildren="🌙"
                unCheckedChildren="☀️"
                style={{ margin: '0px auto' }}
              />
            </Flex>
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div
              style={{
                padding: 24,
                minHeight: 560,
                background: selectedTheme.token.colorBgContainer,
                color: selectedTheme.token.colorText,
              }}
            >
              <Radio.Group>
                <Space direction="vertical">
                  <Radio value={1}>Option A</Radio>
                  <Radio value={2}>Option B</Radio>
                  <Radio value={3}>Option C</Radio>
                  <Radio value={4}>Option D</Radio>
                </Space>
              </Radio.Group>
              <Input />
            </div>
          </Content>
          <Footer
            style={{
              textAlign: 'center',
              background: selectedTheme.token.colorBgContainer,
              color: selectedTheme.token.colorText,
            }}
          >
            LABA SPACE
          </Footer>
        </Layout>
      </Layout>
    </ConfigProvider >
  );
};

export default App;