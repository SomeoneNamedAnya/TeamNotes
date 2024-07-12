import { useState } from "react";
import style from "./entrance.module.css"

const Entrance = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const formHandler = async (elem) => {
        console.log("asdad");
        const data = await (await fetch('http://localhost:3005/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                name,
                email,
                password

            })
        })).json();

        console.log(data);

    }

    return (
        <div>
            <div className={style.form}>
            <p>Создать аккаунт</p>
                <form  className={style.reg}>
                    <input type='text' autocomplete="on" placeholder="Имя" onChange={e => setName(e.target.value)}></input>
                    <input type='email' autocomplete="on" placeholder="Почта" onChange={e => setName(e.target.value)}></input>
                    <input type="password" autocomplete="on" placeholder="Пароль" onChange={e => setName(e.target.value)}></input>
                    <button className={style.subButton} onClick={formHandler} type="button">Регистрация</button>
                </form>
            </div>
        </div> 
    )
};
export default Entrance;