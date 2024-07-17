import { useState } from "react";
import {useNavigate} from "react-router-dom";
import style from "./entrance.module.css"

import {Form, Button, Flex, Input, Layout, theme, Breadcrumb } from 'antd';

const { Header, Content } = Layout;

const SendFormToServer = (email, password) => {
    async function sendRequest() {
        const response = await fetch('http://localhost:3006/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(
                {
                    email,
                    password
                }
            )
        });
        localStorage.setItem("accessToken", response.json());
        localStorage.setItem("authResult", response.status);
    }
    sendRequest();
}

const Entrance = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const navigate = useNavigate()

    const options = [{title: <a href="/entrance">Вход</a>},
                    {title: <a href="/registration">Регистрация</a>}]

///////////////////////funcPost/////////////////////////////////
    const signIn = () => {
        try {
            SendFormToServer(email, password);
            const status = localStorage.getItem("authResult");
            if (status == 400) {
                console.log("Вы не зарегестрированы или произошла ошибка при авторизации");
            }
            else {
                console.log("Авторизация прошла успешно");
                navigate('/home');
            }
        }
        catch (err) {
            console.log(err);
            console.log("Вы не зарегестрированы или произошла ошибка при авторизации");
        }
    }
//////////////////////////////////////////////////////// 
    
    const {
        token: { colorBgContainer},
    } = theme.useToken();

    return (
      
        <Layout style={{
            minHeight: '100vh',
          }}>    
            <Layout style={{backgroundColor: "#FFF0F0"}}>

                <Header style={{
                    display:Flex,
                    textAlign: "center",
                    justify_content: "center",
                    alignContent:"center",
                    padding: 0,
                    height: "10vh",
                    background: colorBgContainer,
                    backgroundColor: '#944E63',
                    fontSize: "35px",
                    color: "black"
                    
                }}>
                    TeamNotes
                </Header>
    
                <Content style={{
                    margin: '0 16px',
                    height: "100%",  
                }}>
                    <div className={style.login}>
                    
                    <p style={{margin: "0 0 5px"}}>Вход</p>
                    <Breadcrumb style={{margin: "0 0 10px"}} items={options} />
                    <Form name="login"
                        style={{
                        maxWidth: 400,
                        }}
                    >   
            
                        <Form.Item name={['email']} rules={[{required: true}]}>
                            <Input style={{width:"300px"}} onChange={(e) => {setEmail(e.target.value)}} placeholder="email"/>
                        </Form.Item>

                        <Form.Item name={['password']} rules={[{required: true}]}>
                            <Input.Password style={{width:"300px"}} onChange={(e) => {setPassword(e.target.value)}} placeholder="password"/>
                        </Form.Item>
                        
                        <Form.Item wrapperCol={{offset: 10}}>
                            <Button style={{backgroundColor:"#B47B84"}}type="primary" htmlType="submit" onClick={signIn}>
                                Вход
                            </Button>
                        </Form.Item>
                        
                    </Form>
                    </div> 
                </Content>
            </Layout>
        </Layout>
    )
};
export default Entrance;