import { useState } from "react";
import {nanoid} from 'nanoid';
import NotesList from "../Components/NotesList.jsx";

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
    return <div className="mainPage">
            <NotesList notes={notes} createNoteHandler={createNoteHandler}/>
        </div>   
    };

export default MainPage;