import style from './note.module.css'
import { Button, Input } from 'antd';
import { useState } from 'react';

const CreateNewNote = ({createNoteHandler}) => {
    const [text, setText] = useState('');
    const [name, setName] = useState('');
    const changeText = (event) => {
        setText(event.target.value);
    }
    const changeName = (event) => {
        setName(event.target.value);
    }
    const clickSave = () => {
        createNoteHandler(text, name);
    }
    return (<div className={style.note}>
        <Input.TextArea maxLength={20} showCount={true} 
        autoSize={{minRows: 1, maxRows: 1}} ghost={'true'}
        placeholder={"Название"}
        onChange={changeName}></Input.TextArea>
        <Input.TextArea maxLength={200} showCount={true} 
        autoSize={{minRows: 5, maxRows: 5}} ghost={'true'}
        placeholder={"Новая заметка"}
        onChange={changeText}></Input.TextArea>
        <Button ghost={'true'} onClick={clickSave}>Создать</Button>
        </div>
    )
};

export default CreateNewNote;