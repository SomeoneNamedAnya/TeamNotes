import React, { useState } from 'react';
import "./TablePart.css"
import {Tag, Button, Space, Flex, Table} from 'antd';


const TableWaiting = () => {
    
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
            title: 'Статус заявки',
            dataIndex: 'status',
            key: 'status',
            render: (tag) => (
                <>
                    <Tag color={tag == "Accept" ? 'green' : tag == "Decline" ? 'red' : 'orange'} key={tag}>
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
                <Button onClick={() => {removedataSource(record.key)}}>Удалить</Button>
              </Space>
            ),
        },
    ];


    let [dataSource, setdataSource] = useState([
        {
          key: '1',
          name: 'Оригинальный человек',
          email: 'original@email.com', 
          status: "Accept"   
        },
        
        {
            key: '2',
            name: 'Еще один Оригинальный человек',
            email: 'original2@email.com',    
            status: "Wating"   
        },
    ]);

//////////////////////////////////////////////////////////////
    const removedataSource = (key) => {
        
        dataSource = dataSource.filter((e) => e.key !== key)
        console.log(dataSource);
        setdataSource(dataSource);
    }
//////////////////////////////////////////////////////////////
    
    return (
        
        <Table
        dataSource={dataSource} columns={columns} />
        
    )
}

export default TableWaiting;