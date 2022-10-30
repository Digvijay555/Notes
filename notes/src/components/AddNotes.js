import React, { useContext, useState } from "react";
import noteContext from "../context/notes/NoteContext";
import "./style.css"
const AddNotes = () => {

    const contex = useContext(noteContext);
    const {addNote } = contex;

    const[note, setNote] = useState({title:"",description:"",tag:""})

    const saveNotes = (e) =>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag)
        setNote({title:"",description:"",tag:""})
    }

    const onChange = (e) =>{
        setNote({...note,[e.target.name]:e.target.value})
    }

    return (
        <div className="container my-3 shadow1" >
            <h1>Add Your Notes</h1>

            <form >
                <div className="mb-3">
                    <label htmlFor="Title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" value={note.title} aria-describedby="emailHelp" onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="Description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" value={note.description} name="description" onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="Tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} />
                </div>

                <button type="submit" className="btn btn-primary mb-2" onClick={saveNotes}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNotes