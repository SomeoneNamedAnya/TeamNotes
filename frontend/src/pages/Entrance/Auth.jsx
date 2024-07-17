import { useState } from "react";
import style from "./entrance.module.css"

const Login = async (email, password) => {

    const token = await (await fetch('http://localhost:3006/login', {
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
    })).json();
    localStorage.setItem("accessToken", token);
    // if (token.status === )
    // console.log()
}


export default Login;