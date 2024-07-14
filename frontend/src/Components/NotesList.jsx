import Note from "./Note.jsx"
import style from "./notesList.module.css"

const NotesList = () => {
    return <div className={style.notesList}>
        <Note Name="haha" Text="pupupupupuppupu" Author="Me, of course"/>
        <Note Name="haha" Text="pupupupupuppupu" Author="Me, of course"/>
        <Note Name="haha" Text="pupupupupuppupu" Author="Me, of course"/>
        <Note Name="haha" Text="pupupupupuppupu" Author="Me, of course"/>
        <Note Name="haha" Text="pupupupupuppupu" Author="Me, of course"/>
        <Note Name="haha" Text="pupupupupuppupu" Author="Me, of course"/>
    </div>   
};

export default NotesList;