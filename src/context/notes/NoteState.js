import NoteContext from "./NoteContext";
import { useState } from "react";
const NoteState = (props) => {
  const host = "https://mytasklist-backend.onrender.com"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)
  const [progress, setProgress] = useState(0)

  // eslint-disable-next-line 
  //Get All Notes
  const getNotes = async () => {
    //API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });
    
    const json = await response.json();
    console.log(json);
    setNotes(json);
  }
  // Add a Note
  const addNote = async (title, description, tag, _id) => {
    // TODO: API Call
    //API Call
    setProgress(10);
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const note = await response.json();
    console.log(note)
    setProgress(100);
    setNotes(notes.concat(note));
  }
  //Delete a note 
  
  const deleteNote = async (id) => {
    // TODO: API Call
    setProgress(10);
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });
    setProgress(70);

    const json = response.json();
    console.log(json);
    console.log("Deleting the note with id" + id);
    const newNotes = notes.filter((note) => { return note._id !== id });
    setNotes(newNotes);
    setProgress(100);
  }


  // Edit a Note


  const editNote = async (id, title, description, tag) => {
    //API Call
    setProgress(10);

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();
    console.log(json)
    //Logic to edit in client
    let newNote = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNote.length; index++) {
      const element = newNote[index];
      if (element._id === id) {
        newNote[index].title = title;
        newNote[index].description = description;
        newNote[index].tag = tag;
        break;
      }
    }
    console.log(newNote);
    setNotes(newNote);
    setProgress(100);

  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes ,setProgress,progress}}>
      {props.children}
    </NoteContext.Provider>
  )
}


export default NoteState;
