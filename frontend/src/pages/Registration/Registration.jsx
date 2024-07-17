import { useState } from "react";
import {useNavigate} from "react-router-dom";
import style from "./registration.module.css"
import {Form, Button, Flex, Input, Layout, theme, Breadcrumb} from 'antd';

const { Header, Content } = Layout;


const Registration = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const navigate = useNavigate()

    const options = [{title: <a href="/entrance">Вход</a>},
        {title: <a href="/registration">Регистрация</a>}]

///////////////////////funcPost/////////////////////////////////
    const login = () => {
        console.log(email, password)
        navigate('/home')
    }
///////////////////////////////////////////////////////////////
    
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
                    <p style={{margin: "0 0 5px"}}>Регистрация</p>
                    <Breadcrumb style={{margin: "0 0 10px"}} items={options} />
                    <Form name="registration"
                        style={{
                        maxWidth: 600,
                        }}
                    >   
                        <Form.Item style={{width:"300px"}} name={['name']} rules={[{required: true}]}>
                            <Input onChange={(e) => {setName(e.target.value)}} placeholder="name"/>
                        </Form.Item>

                        <Form.Item style={{width:"300px"}} name={['email']} rules={[{required: true}]}>
                            <Input onChange={(e) => {setEmail(e.target.value)}} placeholder="email"/>
                        </Form.Item>

                        <Form.Item style={{width:"300px"}} name={['password']} rules={[{required: true}]}>
                            <Input.Password onChange={(e) => {setPassword(e.target.value)}} placeholder="password"/>
                        </Form.Item>
                        

                        <Form.Item wrapperCol={{offset: 6}}>
                            <Button style={{backgroundColor:"#B47B84"}}type="primary" htmlType="submit" onClick={login}>
                                Зарегестрироваться
                            </Button>
                        </Form.Item>
                        
                    </Form>
                    </div> 
                </Content>
            </Layout>
        </Layout>
    )
};
export default Registration;