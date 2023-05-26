import React, { useContext } from 'react'
import alertContext from '../context/alerts/AlertContext';
import noteContext from '../context/notes/NoteContext';

const Noteitem = (props) => {
  const { showAlert } = useContext(alertContext);
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;
  return (
    <div className='col-md-3 text-dark'>
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title">{note.title}</h5>
            <i className="fa-solid fa-trash mx-2" onClick={() => {
              deleteNote(note._id)
              showAlert({ type: "success", msg: "Notes deleted successfully" })
            }}></i>
            <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}
            ></i>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  )
}
export default Noteitem
