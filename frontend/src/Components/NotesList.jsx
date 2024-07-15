import Note from "./Note.jsx"
import style from "./notesList.module.css"
import CreateNewNote from "./CreateNewNote.jsx";

const NotesList = ({notes, createNoteHandler}) => {
    return <div className={style.notesList}>
        <CreateNewNote createNoteHandler={createNoteHandler}></CreateNewNote>
        {notes.map((note)=><Note Name={note.Name}
         Author={note.Author} Text={note.Text}
         Date={note.Date}/>)}
    </div>   
};

export default NotesList;