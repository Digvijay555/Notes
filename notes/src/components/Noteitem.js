import React,{useContext} from "react"
import noteContext from "../context/notes/NoteContext";
import "./style.css"
const Noteitem = (props) => {
    const{note,updateNote}=props
    const contex = useContext(noteContext);
    const{deleteNote} = contex;
    const deleteNotes = (id)=>{
        deleteNote(id);
    }
    return (
        <div className="col-md-3">
      
            <div className="card my-3 shadow">
                
                    <div className="card-body">
                        <h5 className="card-title">{note.title}</h5>
                        <p className="card-text">{note.description} </p>
                        <div className="d-flex justify-content-start">
                        <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNotes(note._id)}}/>
                        <i className="fa-regular fa-pen-to-square" onClick={() =>{updateNote(note)}}></i>
                       
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default Noteitem