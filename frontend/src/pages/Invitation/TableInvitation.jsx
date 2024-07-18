import {useNavigate} from "react-router-dom";
import React, { useEffect, useState } from 'react';
import {Button, Space, Table} from 'antd';
import GetData from "./GetData.jsx";

const TableInvitation = () => {
    const navigate = useNavigate();
    GetData();
    const columns = [
        {
            title: 'Название группы',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Создатель группы',
            dataIndex: 'author',
            key: 'author',
            },
        
        {
            title: 'Действия',
            key: 'action',
            render: (record) => (
              <Space size="middle">
                 <Button onClick={() => {acceptdataSource(record.key)}}>Принять</Button>
                <Button onClick={() => {removedataSource(record.key)}}>Отклонить</Button>
              </Space>
            ),
        },
    ];


    let [dataSource, setdataSource] = useState(
    //     [
    //     {
    //       key: '1',
    //       name: 'Оригинальное название',
    //       author: 'myemail@com',
    //       invMaker: 'myemail@com',
    //     },
        
    //     {
    //         key: '2',
    //         name: 'Оригинальное название2.0',
    //         author: 'myemail@com',
    //         invMaker: '2myemail@com',
    //     },
    // ]
);

// useEffect = () => {
//     setdataSource(getData())
// }

/////////////////////////////funcPost//////////////////////////////////////////
    // Отклонение приглашения
    const removedataSource = (key) => {
        
        dataSource = dataSource.filter((e) => e.key !== key)
        console.log(dataSource);
        setdataSource(dataSource);
    }
    
    // Принятие приглашения
    const acceptdataSource = (key) => {
        
        dataSource = dataSource.filter((e) => e.key !== key)
        console.log(dataSource);
        setdataSource(dataSource);
    }
////////////////////////////////////////////////////////////////////// 

    return (
        
        <Table dataSource={dataSource} columns={columns} />
        
    )
}

export default TableInvitation;