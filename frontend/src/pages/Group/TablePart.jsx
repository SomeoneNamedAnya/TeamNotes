import React, { useState } from 'react';
import "./TablePart.css"
import {Tag, Button, Space, Table} from 'antd';

const TablePart = () => {

    const columns = [
        {
            title: 'Имя',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Почта',
            dataIndex: 'email',
            key: 'email',
            },
        {
            title: 'Роль',
            dataIndex: 'role',
            key: 'role',
            render: (tag) => (
                <>
                    <Tag color={tag == "Creator" ? 'green' : 'geekblue'} key={tag}>
                        {tag}
                    </Tag>
                </>
              ),
        },
        
        {
            title: 'Действия',
            key: 'action',
            render: (record) => (
              <Space size="middle">
                <Button onClick={() => {removedataSource(record.key)}}>Исключить</Button>
              </Space>
            ),
        },
    ];


    let [dataSource, setdataSource] = useState([
        {
          key: '1',
          name: 'Оригинальный человек',
          email: 'original@email.com', 
          role: "Creator"   
        },
        
        {
            key: '2',
            name: 'Еще один Оригинальный человек',
            email: 'original2@email.com',    
            role: "noCreator"   
        },
    ]);

//////////////////////////////////////////////////////////////
    const removedataSource = (key) => {
        
        dataSource = dataSource.filter((e) => e.key !== key)
        console.log(dataSource);
        setdataSource(dataSource);
    }
/////////////////////////////////////////////////////////////
    
    return (
        
        <Table
        dataSource={dataSource} columns={columns} />
        
    )
}

export default TablePart;