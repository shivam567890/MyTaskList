import React, { useContext, useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import alertContext from '../context/alerts/AlertContext';
import noteContext from '../context/notes/NoteContext';
import AddNote from './AddNote';
import Noteitem from './Noteitem';
const Notes = () => {
  const Navigate= useNavigate();
  const [note, setNote] = useState({ id: "", title: "", description: "", tag: "" });
  const context = useContext(noteContext);
  const { showAlert } = useContext(alertContext);
  const { notes, getNotes,editNote } = context;
  useEffect(() => {
    if(localStorage.getItem('token')){
    getNotes();}
    else{
   Navigate("/login");
    }
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({...currentNote, id:currentNote._id});
    console.log(currentNote);
  };

  const handleClick = (e) => {
    e.preventDefault();
    editNote(note.id,note.title,note.description,note.tag);
    refClose.current.click();
    showAlert({ type: "success", msg: "Notes added successfully" })
  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  return (
    <>
      <AddNote />
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className='my-3'>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                  <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" value={note.title} onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                  <input type="text" className="form-control" id="description" name='description' value={note.description} onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChange} minLength={5} required/>
                </div>

              </form>
            </div>
            <div className="modal-footer">
              <button type="button"  ref={refClose } className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" disabled={note.title.length<5 || note.description.length<5} className="btn btn-primary" onClick={handleClick}>Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3 ">
        <h1>Your Notes</h1>
        <div className="container mx-1">
          {notes.length===0 && 'No notes to display'}
        </div>
        {notes.map((note, i) => {
          return <Noteitem key={i} updateNote={updateNote} note={note} />;
        })}
      </div>
    </>
  )
}
export default Notes
