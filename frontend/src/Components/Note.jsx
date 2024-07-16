import style from './note.module.css'
import { Button, Modal, Input } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useState } from 'react';

const Note = ({id, Name, Text, Author, Date, deleteNoteHandler, editNoteHandler}) => {
    const [text, setText] = useState(Text);
    const [name, setName] = useState(Name);
    const changeText = (event) => {
        setText(event.target.value);
    }
    const changeName = (event) => {
        setName(event.target.value);
    }
    const [editVisibility, setEditVisibility] = useState(false);
    const showEditWindow = () => setEditVisibility(true);
    const onOk = () => {
        editNoteHandler(id, text, name);
        setEditVisibility(false);
    }
    const onCancel = () => setEditVisibility(false);
    return <div className={style.note}>
            <div className={style.vertGroup}>
                <big>{Name}</big>
                <small>{Author}</small>
            </div>
            <span>{Text}</span>
            <Modal visible={editVisibility}
             onOk={onOk} onCancel={onCancel}>
                <div className={style.note}>
                    <Input.TextArea maxLength={20} showCount={true} 
                    autoSize={{minRows: 1, maxRows: 1}} ghost={'true'}
                    defaultValue={Name}
                    onChange={changeName}></Input.TextArea>
                    <Input.TextArea maxLength={200} showCount={true} 
                    autoSize={{minRows: 5, maxRows: 5}} ghost={'true'}
                    defaultValue={Text}
                    onChange={changeText}></Input.TextArea>
                    <Button ghost={'true'}></Button>
                </div>
             </Modal>
            <div className={style.horizGroup}>
                <small>{Date}</small>
                <div className={style.horizGroup}>
                    <Button ghost={'true'} icon={<EditOutlined/>} size='1.3em'
                    onClick={showEditWindow}></Button>
                    <Button ghost={'true'} icon={<DeleteOutlined/>} size='1.3em'
                    onClick={() => deleteNoteHandler(id)}></Button>
                </div>
            </div>
    </div>
};


export default Note;