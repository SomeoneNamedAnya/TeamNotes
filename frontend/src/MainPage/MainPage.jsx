import { useState } from "react";
import {nanoid} from 'nanoid';
import NotesList from "../Components/NotesList.jsx";

const AuthCheck = () => {
    const [status, setStatus] = useState(0);
    async function sendRequest() {
        const response = await fetch('http://localhost:3006/auth/notes', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
            }
        });
        setStatus(response.status);
    }
    sendRequest();
    return status;
}

const MainPage = () => {
    const [notes, formNotesList] = useState([
        {
            id: nanoid(),
            Name: "Новая заметка",
            Date: "15/04/2021",
            Author: "Me, of course",
            Text: "pupupupupupup"
        },
        {
            id: nanoid(),
            Name: "test note 1",
            Date: "15/04/2021",
            Author: "Me, of course",
            Text: "pupupupupupup"
        },
        {
            id: nanoid(),
            Name: "test note 2",
            Date: "15/04/2021",
            Author: "Me, of course",
            Text: "pupupupupupup"
        },
        {
            id: nanoid(),
            Name: "test note 3",
            Date: "15/04/2021",
            Author: "Me, of course",
            Text: "pupupupupupup"
        },
    ]);
    const createNoteHandler = (text, name) => {
        if (name != '' || text != '') {
            const note = {
                id: nanoid(),
                Text: text,
                Author: "noname",
                Name: name,
                Date: new Date().toLocaleDateString(),
            };
            formNotesList([...notes, note]);
        }
    }
    const deleteNoteHandler = (id) => {
        formNotesList(notes.filter((note) => note.id != id));
    }
    const editNoteHandler = (id, text, name) => {
        notes.find(note => note.id == id).Text = text;
        notes.find(note => note.id == id).Name = name;
        formNotesList([...notes]);
    }
    const status = AuthCheck();
    if (status == 201) {
        return <div className="mainPage">
            <NotesList notes={notes} 
            createNoteHandler={createNoteHandler}
            deleteNoteHandler={deleteNoteHandler}
            editNoteHandler={editNoteHandler}/>
        </div>   
    };
    return <div><p>Вы не авторизованы</p></div>
}

export default MainPage;