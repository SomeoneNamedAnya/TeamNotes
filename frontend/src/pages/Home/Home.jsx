import style from "./home.module.css"
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Entrance from "../Entrance/Entrance.jsx"
import type { MenuProps } from 'antd';
import {
    TeamOutlined,
    MailOutlined,
    HomeOutlined
  } from '@ant-design/icons';
import {Breadcrumb, Button, Flex, Table, Layout, Menu, theme,Typography } from 'antd';
import SizeContext from "antd/es/config-provider/SizeContext";

const dataSource = [
    {
      key: '1',
      name: 'Оригинальное название',
      author: 'Кто-то оригинальный',
      description: 'Что то на оригинальном',
      time: "16.07.2024",
      add: "?",
    },
    
    {
        key: '2',
        name: 'Оригинальное название2',
        author: 'Кто-то оригинальный',
        description: 'Что то на оригинальном',
        time: "16.07.2024",
        add: "?",
    },
  ];
  
  const columns = [
    {
      title: 'Название группы',
      dataIndex: 'name',
      key: 'name',
    },
    {
        title: 'Создатель группы',
        dataIndex: 'author',
        key: 'author',
      },
    {
        title: 'Описание',
        dataIndex: 'description',
        key: 'description',
    },
    {
      title: 'Время создания',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Дополнительно',
      dataIndex: 'add',
      key: 'add',
    },
  ];

const { Header, Footer, Sider, Content } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    { key: '1',  icon:<TeamOutlined />, label: 'Группы' },
    { key: '2',  icon:<MailOutlined />, label: 'Приглашения' },
    { key: '3',  icon:<HomeOutlined />, label: 'Выход' },
  ];

//const headerStyle = 

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
    let innerTextName = "ДРУГОЕ";
    let innerTextEmail = "user@email.com";
    //console.log("aaaaaa");
    useEffect(() => {
        console.log("12345");
        // Обновляем заголовок документа, используя API браузера
        if (collapsed) {
            innerTextName = "";
            innerTextEmail = ""//"ДРУГОЕ";
        } else {
            innerTextEmail = "user@email.com";
            innerTextName = "User Name";
        }
        
        document.getElementById("userName").innerHTML = innerTextName;
        document.getElementById("userEmail").innerHTML = innerTextEmail;
      });
    
    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();
    
    return (
      
        <Layout style={{
            minHeight: '100vh',
          }}>
            
            <Sider /*style={siderStyle}*/ collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical" />
                <div style={{margin:"10px 0 10px 10px"}}>
                <div id="userName" style={{color:"white", fontSize: "25px", display:Flex}}>
                {innerTextName}
                </div>
                <div id="userEmail" style={{color:"gray", fontSize: "15px", display:Flex}}>
               
                {innerTextEmail}
                </div>
                </div>
                    
            
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
                
            </Sider>
            <Layout>
                <Header style={
                {
                    display:Flex,
                    textAlign: "center",
                    justify_content: "center",
                    alignContent:"center",
                    margin: '0 16px',
                    padding: 0,
                    background: colorBgContainer,
                    fontSize: "50px",
                    backgroundColor: '#944E63',
                }}>
                    Мои группы
                </Header>
                <Content style={{
                        margin: '0 16px',
                        height: "100%"
                }}>
                    <Table dataSource={dataSource} columns={columns} />;
                   
                </Content>
                
            </Layout>
        </Layout>
       
    )
};
export default Home;