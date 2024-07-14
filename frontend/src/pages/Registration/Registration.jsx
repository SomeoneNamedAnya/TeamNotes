import { useState } from "react";
import style from "./registration.module.css"

const Registration = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const formHandler = async (elem) => {
        const data = await (await fetch('http://localhost:3005/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                name,
                email,
                password
            }
        )
    })).json();
    document.getElementById("result").innerHTML = data.email;
}
};

const Entrance = () => {
    const [n, setName] = useState("");
    return (
        <div>
            <div className={style.form}>
            <p>Создать аккаунт</p>
                <form  className={style.reg}>
                    <input type='text' autocomplete="on" placeholder="Имя" onChange={e => setName(e.target.value)}></input>
                    <input type='email' autocomplete="on" placeholder="Почта" onChange={e => setEmail(e.target.value)}></input>
                    <input type="password" autocomplete="on" placeholder="Пароль" onChange={e => setPassword(e.target.value)}></input>
                    <button className={style.subButton} onClick={formHandler} type="button">Регистрация</button>
                    <p id="result">Результат регистрации</p>
                </form>
            </div>
        </div> 
    )
};
export default Registration;