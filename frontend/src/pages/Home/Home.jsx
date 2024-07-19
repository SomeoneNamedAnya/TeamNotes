import {useNavigate} from "react-router-dom";
import "./home.css"
import React, { useState, useEffect } from 'react';
import {Input, Form, Modal, Flex, Layout, Menu, theme} from 'antd';
import TableGroup from "./TableGroup";
import {nanoid} from 'nanoid';
import {
    TeamOutlined,
    MailOutlined,
    HomeOutlined,
    QuestionCircleOutlined,
    PlusOutlined
  } from '@ant-design/icons';

const { Header, Footer, Sider, Content } = Layout;

const CreateGroup = (name) => {
    console.log(localStorage.getItem("accessToken"));
    async function sendRequest() {
       const response = await fetch('http://localhost:3006/auth/createGroup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
            },
            body: JSON.stringify(
                {
                    name,
                }
            )
        });
    }
    sendRequest();
}

const GetGroups = async () => {
    const groups = await(await fetch('http://localhost:3006/auth/getUserGroups', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
        }
    })).json();
    //console.log("qwertyu", groups)
    return groups;
}


const RemoveGroup = async(email, group) =>{
    console.log("RemoveGroup")
    const result = await (await fetch('http://localhost:3006/auth/removeGroup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
        }, 
        body:  JSON.stringify({
            email,
            group
        })
    })).json();
    console.log("RemoveGroup2")
}

const GetName = async(email, group) =>{
    
    const result = await (await fetch('http://localhost:3006/auth/getName', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
        }, 
    })).json();
    
   // console.log(result)
    return result
}


const GetEmail = async(email, group) =>{
    
    const result = await (await fetch('http://localhost:3006/auth/getEmail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
        }, 
    })).json();
    //console.log(result)
    return result
}


const Home = () => {

    const navigate = useNavigate();
    
    const items = [
        { key: '1',  icon:<TeamOutlined />, label: 'Группы', onClick:() => {navigate("/home")} },
        { key: '2',  icon:<MailOutlined />, label: 'Приглашения', onClick:() => {navigate("/invitation")}  },
        { key: '3',  icon:<QuestionCircleOutlined />, label: 'О приложении',  onClick:() => {navigate("/about")}},
        { key: '4',  icon:<HomeOutlined />, label: 'Выход',  onClick:() => {navigate("/registration")}},
    ];

    const [collapsed, setCollapsed] = useState(false);
    let innerTextName;
    let innerTextEmail;

    let [userinnerTextName, setUserinnerTextName] = useState()
    let [userinnerTextEmail, setinnerTextEmail] = useState()
    
    GetName().then((value) => {setUserinnerTextName(value.result[0].name)})
    GetEmail().then((value) => {setinnerTextEmail(value.result[0].email)})

    useEffect(() => {
        
        if (collapsed) {
            innerTextName = "";
            innerTextEmail = "";
        } else {
            innerTextEmail = userinnerTextEmail;
            innerTextName = userinnerTextName;
        }
        
        document.getElementById("userName").innerHTML = innerTextName;
        document.getElementById("userEmail").innerHTML = innerTextEmail;

      });
    
    const {
        token: { colorBgContainer},
    } = theme.useToken();


    const [title, setTitle] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);


    const showModal = () => {

        setIsModalOpen(true);
    };

    const handleCancel = () => {

        setIsModalOpen(false);
    };

    let [groups, setdataSource] = useState();
    GetGroups().then((value) => {setdataSource(value.result)})
   
    let group = {
        key: nanoid(),
        name: title,
        author: 'Кто-то оригинальный',
        time: "16.07.2024",
        add: "?",
        
    }

    // Создание группы, имя группы в переменной title
    const handleOk = () => {
        setIsModalOpen(false);
        CreateGroup(title);
        setdataSource([...groups, group]);
    };

    // Удаление группы
    const removedataSource = (key) => {
        //console.log(key)
        RemoveGroup(key.email, key.groupName)
        setdataSource(groups);
    }
    
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
                    backgroundColor: '#944E63',
                    fontSize: "35px",
                }}>
                    Мои группы
                </Header>

                <Content style={{
                    margin: '0 16px',
                    height: "100%",
                }}>
                    <div style={{margin:"10px 0 0 0"}}>
                        <TableGroup groups={groups} removedataSource={removedataSource}/>
                    </div>
                    
                </Content>
                <Footer style={{backgroundColor:"#FFF0F0", height:"15vh"}}>
                    <div id="ButtonAdd">
                        <PlusOutlined  style={{fontSize:"70px"}} onClick={showModal}/>
                    
                        <Modal title="Создать группу" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} type="primary" htmlType="submit">
                            <p style={{fontSize:'15px'}}>Придумайте название для группы</p>
                            <Form name="Title" style={{maxWidth: 600}}>
                                <Form.Item name={['title']} label="Title" rules={[{required: true}]}>
                                    <Input onChange={(e) => {setTitle(e.target.value)}}/>
                                </Form.Item>
                            </Form>
                        </Modal>
                    </div>
                </Footer>
                
            </Layout>

        </Layout>
       
    )
};
export default Home;