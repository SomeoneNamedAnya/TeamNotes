import {useNavigate} from "react-router-dom";
import React, { useState} from 'react';
import {Button, Space, Table, } from 'antd';

const TableGroup = ({groups, removedataSource}) => {

    const navigate = useNavigate();

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
            title: 'Время создания',
            dataIndex: 'time',
            key: 'time',
        },
        
        {
            title: 'Действия',
            key: 'action',
            render: (record) => (
              <Space size="middle">
                <Button onClick={() => {navigate("/group")}}>Войти</Button>
                <Button onClick={() => {removedataSource(record.key)}}>Уйти</Button>
              </Space>
            ),
        },
    ];

   
    return (
        
        <Table dataSource={groups} columns={columns} />

    )
}

export default TableGroup;