import {useEffect, useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import style from "./entrance.module.css"
import {useDispatch, useSelector} from "react-redux";
import {setAuthAction} from "../../store/userReducers.js";
import  Home from "../Home/Home.jsx";
//import {userLogin} from "../../../api/userApi.js";

const Entrance = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    let cons = "0";
    const navigate = useNavigate()
    const isAuth = useSelector(state => state.user.isAuth)
    const dispatch = useDispatch()
    useEffect(() => {
        console.log("qqqqqqqq");
        if (cons === "1") {
            console.log("aaaaaaaaaaaaa");
            navigate(<Home />);
        }
      });

    const formHandler = async (elem) => {

        // userLogin({email, password}).then((data) => {
        //     console.log(data)
        //     dispatch(setAuthAction(data))
        //   })
        

        // const data = await (await fetch('http://localhost:3005/login', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json;charset=utf-8'
        //     },
        //     body: JSON.stringify({
        //         email,
        //         password

        //     })
            
        // })).json();
        
        //console.log(data);
        cons = "1";
        navigate('/home');
        
    }

    return (
        <div>
            <div className={style.form}>
            <p>Создать аккаунт</p>
                <form  className={style.reg}>
                    <input type='email' autocomplete="on" placeholder="Почта" onChange={e => setEmail(e.target.value)}></input>
                    <input type="password" autocomplete="on" placeholder="Пароль" onChange={e => setPassword(e.target.value)}></input>
                    <button className={style.subButton} onClick={formHandler} type="button">Вход</button>
                </form>
            </div>
        </div> 
    )
};
export default Entrance;