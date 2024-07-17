import { useNavigate} from "react-router-dom";
import React, { useState, useEffect } from 'react';
import TableWaiting from "./TableWaiting.jsx"
import "./participants.css"
import {
    TeamOutlined,
    MailOutlined,
    HomeOutlined,
    QuestionCircleOutlined,
  } from '@ant-design/icons';
import {Breadcrumb, Flex, Layout, Menu, theme } from 'antd';
import { useForm } from "antd/es/form/Form.js";
const { Header, Sider, Content } = Layout;


const Wating = () => {

    const navigate = useNavigate();

    const optionsGroup = [{title: <a href="/group">Заметки</a>,},
                          {title: <a href="/participants">Участники</a>,},
                          {title: <a href="/wating">Приглашения</a>,}]
    
    const items = [
        { key: '1',  icon:<TeamOutlined />, label: 'Группы', onClick:() => {navigate("/home")} },
        { key: '2',  icon:<MailOutlined />, label: 'Приглашения', onClick:() => {navigate("/invitation")}  },
        { key: '3',  icon:<QuestionCircleOutlined />, label: 'О приложении',  onClick:() => {navigate("/about")}},
        { key: '4',  icon:<HomeOutlined />, label: 'Выход',  onClick:() => {navigate("/entrance")}},
    ];

    const [collapsed, setCollapsed] = useState(false);
    
    useEffect(() => {
        
        if (collapsed) {
            innerTextName = "";
            innerTextEmail = "";
        } else {
            innerTextEmail = "user@email.com";
            innerTextName = "User Name";
        }
        
        document.getElementById("userName").innerHTML = innerTextName;
        document.getElementById("userEmail").innerHTML = innerTextEmail;

      });
  
    let innerTextName;
    let innerTextEmail; 

    const {
        token: { colorBgContainer},
    } = theme.useToken();    

    return (
      
        <Layout style={{
            minHeight: '100vh',
          }}>

            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
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
            <Layout style={{backgroundColor: "#FFF0F0"}}>

                <Header style={{
                    display:Flex,
                    textAlign: "center",
                    justify_content: "center",
                    alignContent:"center",
                    padding: 0,
                    background: colorBgContainer,
                    fontSize: "50px",
                    backgroundColor: '#944E63',
                    fontSize: "35px",
                    color: "black"
                    
                }}>
                    История приглашений
                </Header>
                <Breadcrumb style={{
                    margin: '10px 30px',
                }} items={optionsGroup} />
                <Content style={{
                    margin: '0 16px',
                    height: "100%",
                    
                }}>
                
                    <TableWaiting />  
                
                       
                </Content>

            
            </Layout>

        </Layout>
       
    )
};
export default Wating;