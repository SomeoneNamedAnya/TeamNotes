import {Link, useNavigate} from "react-router-dom";
import React, { useState, useEffect } from 'react';
import "./tablegroup.css"
import {Breadcrumb, Button, Space, Flex, Table, Layout, Menu, theme,Typography } from 'antd';
const { Header, Footer, Sider, Content } = Layout;


const TableGroup = () => {
    const navigate = useNavigate();
    let [dataSource, setdataSource] = useState([
        {
          key: '1',
          name: 'Оригинальное название',
          author: 'Кто-то оригинальный',
          description: 'Что то на оригинальном',
          time: "16.07.2024",
          add: "?",
    
        },
        
        {
            key: '2',
            name: 'Оригинальное название2',
            author: 'Кто-то оригинальный',
            description: 'Что то на оригинальном',
            time: "16.07.2024",
            add: "?",
            
        },
    ]);
    const removedataSource = (key) => {
        
        dataSource = dataSource.filter((e) => e.key !== key)
        console.log(dataSource);
        setdataSource(dataSource);
    }

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
            title: 'Описание',
            dataIndex: 'description',
            key: 'description',
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
        
        <Table dataSource={dataSource} columns={columns} />
        
    )
}

export default TableGroup;