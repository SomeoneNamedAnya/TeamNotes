import { useState } from "react";
import { Button, Input } from 'antd';

const CreateGroup = () => {
    const [status, setStatus] = useState(0);
    const name = "some name";
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
        setStatus(response.status);
    }
    sendRequest();
    console.log(status);
    console.log("pupu");
    return <div>haa</div>
}

export default CreateGroup;