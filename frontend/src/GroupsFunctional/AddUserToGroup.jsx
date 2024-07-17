import { useState } from "react";
import { Button, Input } from 'antd';

const AddUserToGroup = ({email, groupId}) => {
    const [status, setStatus] = useState(0);
    async function sendRequest() {
        const response = await fetch('http://localhost:3006/auth/addUserToGroup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
            },
            body: JSON.stringify(
                {
                    email,
                    groupId,
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

export default AddUserToGroup;