import { useState, useEffect } from "react";
import Note from "./Component/Note";
import noteService from './services/notes'

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewnote] = useState("a new note...");
  const [showAll, setShowAll] = useState(true);

  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewnote(event.target.value);
  };

  useEffect(() => {
    noteService.getAll().then(initialNotes => {
      setNotes(initialNotes)
    })
  }, []);

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: String(notes.length + 1),
    };

    noteService.create(noteObject).then(initialNotes => {
      setNotes(notes.concat(initialNotes))
      setNewnote("");

    })
  };

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = {
      ...note,
      important: !note.important
    }

    noteService.update(id, changedNote).then(initialNotes => {
      setNotes(notes.map(note=>note.id === id ? initialNotes : note))
    }).catch(error => {
      alert(
        `The note '${note.content}' was already deleted from the server` 
      )
      setNotes(notes.filter(n => n.id !== id))
    })
  } 

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);
  console.log(notesToShow);

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)}/>
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default App;
