import { useState } from "react";
import style from "./entrance.module.css"

const formHandler = async () => {
    const name = document.getElementById("name").value; 
    const email = document.getElementById("email").value; 
    const password = document.getElementById("password").value;
    const data = await (await fetch('http://localhost:3006/auth/registration', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(
            {
                name,
                email,
                password
            }
        )
    })).json();
    document.getElementById("result").innerHTML = data.email;
}

const Entrance = () => {
    const [n, setName] = useState("");
    return (
        <div>
            <div className={style.form}>
            <p>Создать аккаунт</p>
                <form  className={style.reg}>
                    <input id = "name" type='text' autoComplete="on" placeholder="Имя" onChange={e => setName(e.target.value)}></input>
                    <input id = "email" type='email' autoComplete="on" placeholder="Почта" onChange={e => setName(e.target.value)}></input>
                    <input id = "password" type="password" autoComplete="on" placeholder="Пароль" onChange={e => setName(e.target.value)}></input>
                    <button className={style.subButton} onClick={formHandler} type="button">Регистрация</button>
                    <p id="result">Результат регистрации</p>
                </form>
            </div>
        </div> 
    )
};
export default Entrance;