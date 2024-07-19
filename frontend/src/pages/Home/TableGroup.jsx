import {useNavigate} from "react-router-dom";
import React, { useState} from 'react';
import {Button, Space, Table, } from 'antd';



const TableGroup = ({groups, removedataSource}) => {

    const navigate = useNavigate();

    const columns = [
        {
            title: 'Название группы',
            dataIndex: 'groupName',
            key: 'groupName',
        },
        {
            title: 'Создатель группы',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Почта создателя группы',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Время создания',
            dataIndex: 'creationDate',
            key: 'creationDate',
        },
        
        {
            title: 'Действия',
            key: 'action',
            render: (record) => (
              <Space size="middle">
                <Button onClick={() => {navigate("/group")}}>Войти</Button>
                <Button onClick={() => {removedataSource(record)}}>Уйти</Button>
              </Space>
            ),
        },
    ];

   
    return (
        
        <Table dataSource={groups} columns={columns} />

    )
}

export default TableGroup;