import style from './note.module.css'
import { Button } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const Note = ({Name, Text, Author, Date}) => {
    return <div className={style.note}>
            <div className={style.vertGroup}>
                <big>{Name}</big>
                <small>{Author}</small>
            </div>
            <span>{Text}</span>
            <div className={style.horizGroup}>
                <small>{Date}</small>
                <div className={style.horizGroup}>
                    <Button ghost={'true'} icon={<EditOutlined/>} size='1.3em'></Button>
                    <Button ghost={'true'} icon={<DeleteOutlined/>} size='1.3em'></Button>
                </div>
            </div>
    </div>
};


export default Note;