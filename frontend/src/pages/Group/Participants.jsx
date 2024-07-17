import {Link, useNavigate} from "react-router-dom";
import React, { useState, useEffect } from 'react';
import MainPage from "../../MainPage/MainPage.jsx"
import TablePart from "./TablePart.jsx"
import Icon from '@ant-design/icons';
import "./participants.css"
import type { MenuProps } from 'antd';
import {
    TeamOutlined,
    MailOutlined,
    HomeOutlined,
    QuestionCircleOutlined,
    PlusOutlined
  } from '@ant-design/icons';
import {Breadcrumb, Modal, Form, Input, Button, Space, Flex, Table, Layout, Menu, theme,Typography } from 'antd';
import { useForm } from "antd/es/form/Form.js";
const { Header, Footer, Sider, Content } = Layout;


const Group = () => {
    const navigate = useNavigate();
    
    type MenuItem = Required<MenuProps>['items'][number];

    const items: MenuItem[] = [
        { key: '1',  icon:<TeamOutlined />, label: 'Группы', onClick:() => {navigate("/home")} },
        { key: '2',  icon:<MailOutlined />, label: 'Приглашения', onClick:() => {navigate("/invitation")}  },
        { key: '3',  icon:<QuestionCircleOutlined />, label: 'О приложении',  onClick:() => {navigate("/about")}},
        { key: '4',  icon:<HomeOutlined />, label: 'Выход',  onClick:() => {navigate("/entrance")}},
    ];
    const [collapsed, setCollapsed] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {inv, submitInv} = useForm();

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
    const initialStateEmail = { email: ""};
    const [email, setEmail] = useState()
    const [formStatus, setFormStatus] = useState(initialStateEmail)
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();    
    
    const optionsGroup = [{title: <a href="/group">Заметки</a>,},
                          {title: <a href="/participants">Участники</a>,},
                          {title: <a href="/wating">Приглашения</a>,}]
    
    const showModal = () => {
        setIsModalOpen(true);
    };
    
    const validateMessages = {
        required: '${label} is required!',
        types: {
          email: '${label} is not a valid email!',
        },
      };
    const onFinish = (values) => {
        setEmail(initialStateEmail);
        console.log(email);
    };
   
    const handleOk = () => {
        //email.email = "";
        console.log(email);
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setEmail(initialStateEmail);
        console.log(email);
        setIsModalOpen(false);
    };
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
                    Участники конкретной группы
                </Header>
                <Breadcrumb style={{
                    margin: '10px 30px',
                }} items={optionsGroup} />
                <Content style={{
                    margin: '0 16px',
                    height: "100%",
                    
                }}>
                
                <TablePart />  
                
                       
                </Content>

                <Footer style={{backgroundColor:"#FFF0F0", height:"15vh"}}>
                <div id="ButtonAdd">
                    <PlusOutlined  style={{fontSize:"70px"}} onClick={showModal}/>
                    
                    <Modal title="Добавить участника" open={isModalOpen} onOk={(e) => {handleOk()}} onCancel={handleCancel} type="primary" htmlType="submit">
                        <p>Вы можете добавить участника по его почте.</p>
                        <Form
                            
                            name="nest-messages"
                            onFinish={onFinish}
                            style={{
                            maxWidth: 600,
                            }}
                            validateMessages={validateMessages}
                        >
                            <Form.Item name={['email']} label="Email"
                                rules={[
                                    {
                                    required: true,
                                    type: 'email',
                                    },
                                ]}
                            >
                                <Input onChange={(e) => {setEmail({email:e.target.value});}}/>
                            </Form.Item>
                        </Form>
                    </Modal>
                </div>  
                </Footer>
                   
            </Layout>

        </Layout>
       
    )
};
export default Group;