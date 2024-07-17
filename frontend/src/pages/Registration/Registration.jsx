import { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import style from "./registration.module.css"
import { Layout } from "antd";

const Registration = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    let cons = "0";
    const navigate = useNavigate()
    const formHandler = async (elem) => {
    //     const data = await (await fetch('http://localhost:3006/login', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json;charset=utf-8'
    //         },
    //         body: JSON.stringify({
    //             name,
    //             email,
    //             password
    //         }
    //     )
    // })).json();
   // document.getElementById("result").innerHTML = data.email;
    navigate("/home");
}
return (
    
    <div>
        <div className={style.form}>
        <p>Создать аккаунт</p>
            <form  className={style.reg}>
                <input type='text' autoComplete="on" placeholder="Имя" onChange={e => setName(e.target.value)}></input>
                <input type='email' autoComplete="on" placeholder="Почта" onChange={e => setEmail(e.target.value)}></input>
                <input type="password" autoComplete="on" placeholder="Пароль" onChange={e => setPassword(e.target.value)}></input>
                <button className={style.subButton} onClick={formHandler} type="button">Регистрация</button>
                <p id="result">Результат регистрации</p>
            </form>
        </div>
    </div> 
)
}


export default Registration;