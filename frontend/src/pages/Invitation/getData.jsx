import {useNavigate} from "react-router-dom";
import React, { useState, useEffect } from 'react';

const GetData = () => {
    const [status, setStatus] = useState();
    const [data, setData] = useState();
    async function sendRequest() {
        const response = await fetch('http://localhost:3006/auth/getInvitation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
            }
        });

        setStatus(response.status);
        setData(response.dataInv)
    }
    sendRequest();
    console.log(status);
    console.log(data);
   // return <div>haha</div>
}

export default GetData