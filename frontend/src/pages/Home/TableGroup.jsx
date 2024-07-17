import {useNavigate} from "react-router-dom";
import React, { useState} from 'react';
import "./tablegroup.css"
import {Button, Space, Table, } from 'antd';

const TableGroup = () => {

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

    let [dataSource, setdataSource] = useState([
        {
          key: '1',
          name: 'Оригинальное название',
          author: 'Кто-то оригинальный',
          time: "16.07.2024",
          add: "?",
    
        },
        
        {
            key: '2',
            name: 'Оригинальное название2',
            author: 'Кто-то оригинальный',
            time: "16.07.2024",
            add: "?",
            
        },
    ]);

///////////////////////////////funcPost///////////////////////////////////
    // Удаление группы
    const removedataSource = (key) => {
        
        dataSource = dataSource.filter((e) => e.key !== key)
        console.log(dataSource);
        setdataSource(dataSource);
    }
//////////////////////////////////////////////////////////////////
   
    return (
        
        <Table dataSource={dataSource} columns={columns} />
        
    )
}

export default TableGroup;