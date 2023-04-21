import React, { useContext, useState } from 'react'
import alertContext from '../context/alerts/AlertContext';
import noteContext from '../context/notes/NoteContext';
const AddNote = () => {
  const context = useContext(noteContext);
  const { showAlert } = useContext(alertContext);
  const { addNote } = context;
  const [note, setnote] = useState({ title: "", description: "", tag: "" })
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag, note._id);
    showAlert({ type: "success", msg: "Notes added successfully" });
    setnote({title:"",description:"",tag:""});
  }
  const onChange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value })
  }
  return (
    <div>
      <div className="container my-3">
        <h1>Add a Note</h1>
        <form className='my-3'>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={onChange} value={note.title} minLength={5} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" name='description' onChange={onChange} value={note.description} minLength={5} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Tag</label>
            <input type="text" className="form-control" id="tag" name='tag' onChange={onChange} value={note.tag} minLength={5}/>
          </div>

          <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>AddNote</button>
        </form>
      </div>
    </div>
  )
}

export default AddNote