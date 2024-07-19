import {useNavigate} from "react-router-dom";
import React, { useEffect, useState } from 'react';
import {Button, Space, Table} from 'antd';
import locale from "antd/es/date-picker/locale/en_US.js";


const GetData = async () => {
    const {result} = await (await fetch('http://localhost:3006/auth/getInvitation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
        }
    })).json();
    return result

}

const DeclineInv = async(email, group) =>{
    console.log("declinefront")
    const {result} = await (await fetch('http://localhost:3006/auth/declineInvitation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
        }, 
        body:  JSON.stringify({
            email,
            group
        })
    })).json();

}

const AcceptInv = async(email, group) =>{
    console.log("acceptfront")
    const {result} = await (await fetch('http://localhost:3006/auth/acceptInvitation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
        }, 
        body: JSON.stringify({
            email,
            group
        })
    })).json();

}

const TableInvitation = () => {
    let [dataSource, setdataSource] = useState()
    
    GetData().then((value) => {setdataSource(value)})

    
    const columns = [
        {
            title: 'Название группы',
            dataIndex: 'groupName',
            key: 'groupName',
        },
        {
            title: 'Имя создателя группы',
            dataIndex: 'name',
            key: 'name',
        
        },
        {
            title: 'Почта создателя группы',
            dataIndex: 'email',
            key: 'email',
        
        },
        {
            title: 'Действия',
            key: 'action',
            render: (record) => (
              <Space size="middle">
                 <Button onClick={() => {acceptdataSource(record)}}>Принять</Button>
                <Button onClick={() => {removedataSource(record)}}>Отклонить</Button>
              </Space>
            ),
        },
    ];


    
    


/////////////////////////////funcPost//////////////////////////////////////////
    // Отклонение приглашения
    const removedataSource = (key) => {
        console.log(key)
        DeclineInv(key.email, key.groupName)
        console.log("end decline")
        GetData().then((value) => {setdataSource(value)})
        console.log("end get data")
    }
    
    // Принятие приглашения
    const acceptdataSource = (key) => {
        
        AcceptInv(key.email, key.groupName)
        console.log("end decline")
        GetData().then((value) => {setdataSource(value)})
        console.log("end get data")
    }
////////////////////////////////////////////////////////////////////// 
   
    return (
        
        <Table dataSource={dataSource} columns={columns} />
        
    )
}

export default TableInvitation;