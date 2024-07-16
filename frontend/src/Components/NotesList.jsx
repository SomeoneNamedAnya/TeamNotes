import Note from "./Note.jsx"
import CreateNewNote from "./CreateNewNote.jsx";
import { Flex } from "antd";

const NotesList = ({notes, createNoteHandler, deleteNoteHandler, editNoteHandler}) => {
    console.log(notes[1].Name);
    return <Flex wrap={'wrap'}>
        <CreateNewNote createNoteHandler={createNoteHandler}></CreateNewNote>
        {notes.map((note)=><Note Name={note.Name}
         Author={note.Author} Text={note.Text}
         Date={note.Date} id={note.id} deleteNoteHandler={deleteNoteHandler}
         editNoteHandler={editNoteHandler}/>)}
    </Flex>   
};

export default NotesList;