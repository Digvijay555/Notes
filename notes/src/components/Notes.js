import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/NoteContext";
import AddNotes from "./AddNotes";
import Noteitem from "./Noteitem";
import { useNavigate } from "react-router-dom";
import "./style.css"
const Notes = () => {

    let navigate = useNavigate();

    const contex = useContext(noteContext);

    const { notes, getAllNotes, editNote } = contex;

    useEffect(() => {
        if(localStorage.getItem('token'))
        {
            getAllNotes()
        }
        else{
            navigate('/login')
        }
        // getAllNotes();
    },[]);

    const ref = useRef(null)
    const refClose = useRef(null)

    const [note, setNote] = useState({ id:"", etitle: "", edescription: "", etag: "" })
    const updateNote = (currentNote) => {
        ref.current.click()
        setNote({ id:currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    }

    const onChange = (e) => {
        setNote({...note,[e.target.name]:e.target.value})
    }

    const updateEditNote = (e) =>{
        e.preventDefault();
        // console.log("ho gaya guys", note)
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click()
    }
    return (
        <>
            <AddNotes />

            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>


            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Notes</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="Title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" value={note.etitle} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="Description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="Tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="e   tag" value={note.etag} onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={updateEditNote}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h2>Your Notes</h2>
                <div className="container">
                    {
                        notes.length===0 && "No Notes To Display"
                    }
                </div>
                {
                    notes.map((note) => {
                        // return note.title;
                        return <Noteitem key={note._id} updateNote={updateNote} note={note} />
                    })
                }
            </div>
        </>
    )
}

export default Notes