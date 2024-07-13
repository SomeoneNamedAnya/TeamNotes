import {MdDeleteForever} from 'react-icons/md';
import style from './note.module.css'

const Note = ({Name, Text, Author}) => {
    return <div className={style.note}>
            <div className={style.vertGroup}>
                <big>{Name}</big>
                <small>{Author}</small>
            </div>
            <span>{Text}</span>
            <div className={style.horizGroup}>
                <small>12.07.24</small>
                <MdDeleteForever className='delete-icon' size='1.3em'/>
            </div>
    </div>
};

export default Note;