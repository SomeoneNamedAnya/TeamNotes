import {useNavigate} from "react-router-dom";
import React, { useState, useEffect } from 'react';
import TablePart from "./TablePart.jsx"
import "./participants.css"

import {
    TeamOutlined,
    MailOutlined,
    HomeOutlined,
    QuestionCircleOutlined,
    PlusOutlined
  } from '@ant-design/icons';
import {Breadcrumb, Modal, Form, Input, Flex, Layout, Menu, theme} from 'antd';
const { Header, Footer, Sider, Content } = Layout;


const Participants = () => {
    const navigate = useNavigate();
    
    const items = [
        { key: '1',  icon:<TeamOutlined />, label: 'Группы', onClick:() => {navigate("/home")} },
        { key: '2',  icon:<MailOutlined />, label: 'Приглашения', onClick:() => {navigate("/invitation")}  },
        { key: '3',  icon:<QuestionCircleOutlined />, label: 'О приложении',  onClick:() => {navigate("/about")}},
        { key: '4',  icon:<HomeOutlined />, label: 'Выход',  onClick:() => {navigate("/entrance")}},
    ];

    const [collapsed, setCollapsed] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    const [email, setEmail] = useState()
    const {
        token: { colorBgContainer},
    } = theme.useToken();    
    
    const optionsGroup = [{title: <a href="/group">Заметки</a>,},
                          {title: <a href="/participants">Участники</a>,},
                          {title: <a href="/wating">Приглашения</a>,}]
    
    const showModal = () => {

        setIsModalOpen(true);
    };
   
    const handleCancel = () => {

        setIsModalOpen(false);
    };

/////////////////////funcPost////////////////////////////////////
    // Создание запроса на приглашения в группу участника
    const handleOk = () => {
        
        setIsModalOpen(false);
    };
/////////////////////////////////////////////////////////

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
                            <p style={{fontSize:"15px"}}>Вы можете добавить участника по его почте.</p>
                            <Form name="searchEmail"
                                style={{
                                maxWidth: 600,
                                }}
                            >
                                <Form.Item name={['email']} label="Email" rules={[{required: true}]}>
                                    <Input onChange={(e) => {setEmail({email:e.target.value})}}/>
                                </Form.Item>
                            </Form>
                        </Modal>
                    </div>  
                </Footer>
            </Layout>
        </Layout>
    )
};
export default Participants;