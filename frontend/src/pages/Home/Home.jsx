import style from "./home.module.css"
import React, { useState } from 'react';

import type { MenuProps } from 'antd';
import {
    AppstoreOutlined,
    ContainerOutlined,
    DesktopOutlined,
    MailOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
  } from '@ant-design/icons';
import { Button, Flex, Layout, Menu } from 'antd';
import SizeContext from "antd/es/config-provider/SizeContext";
const { Header, Footer, Sider, Content } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    { key: '1',  label: 'Группы' },
    { key: '2',  label: 'Приглашения' },
  ];

const headerStyle = {
    textAlign: 'center',
    color: '#FFE7E7',
    height: "20vh",
    width: "100vw",
    paddingInline: 48,
    lineHeight: '64px',
    fontSize: "50px",
    backgroundColor: '#944E63',
};

  const layoutStyle = {
    borderRadius: 8,
    height: "100vh",
    overflow: 'hidden',
    width: "100vw",
    maxWidth: '100vw',
    backgroundColor: '#B47B84',
  };

const Home = () => {
    const [collapsed, setCollapsed] = useState(false);

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    
    return (
        <Flex>
            <Layout style={layoutStyle}>
                
                
                <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={(broken) => {
                console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                console.log(collapsed, type);
                }}
                >
                <div className="demo-logo-vertical" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items} />
                </Sider>
                <Layout>
                    <Header style={headerStyle}>
                        Мои группы
                    </Header>
                </Layout>
                
            </Layout>
        </Flex>
    )
};
export default Home;