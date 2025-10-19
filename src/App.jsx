import {useEffect, useState} from "react";
import notes from "./services/notes.js";
import Note from "./Component/Note.jsx";
import Footer from "./Component/Footer.jsx"
import './index.css'

const DisplayNote = ({notes, toggleImportance}) => {

    return (
        <>
            <ul>
                {notes.map(note => {
                    return <Note key={note.id} note={note} toggleImportance={toggleImportance}/>
                })}
            </ul>
        </>
    )
}

const CreateNote = ({addNewNote, handleNewNote, newNote}) => {
    return (
        <>
            <form onSubmit={addNewNote}>
                <input value={newNote} onChange={handleNewNote}/>
                <button>save</button>
            </form>
        </>
    )
}


export default function App() {
    const [getNotes, setNotes] = useState([])
    const [newNote, setNewNote] = useState('')

    const toggleImportance = () => {

    }

    const addNewNote = (e) => {
        e.preventDefault()
        const addNote = {
            id: (getNotes.length + 1).toString(),
            content: newNote,
            important: Math.random() < .5
        }
        notes.create(addNote).then(response => {
            setNotes(getNotes.concat(response))
        })
    }

    const handleNewNote = (e) => {
        setNewNote(e.target.value)
        console.log(newNote)
    }

    useEffect(() => {
        notes.getAll().then(response => {
            setNotes(response)
        })
    }, [])

    return (
        <>
            <h1>Notes</h1>
            <DisplayNote
                notes={getNotes}
                toggleImportance={toggleImportance}
            />
            <CreateNote
                handleNewNote={handleNewNote}
                addNewNote={addNewNote}
                newNote={newNote}
            />
            <Footer/>
        </>
    )
}