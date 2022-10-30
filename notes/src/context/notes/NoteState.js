import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000"
    const initialNotes = []


    const [notes, noteState] = useState(initialNotes);

    //Get all notes
    const getAllNotes = async () => {
        //Api
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },

        });
        const json = await response.json(); // parses JSON response into native JavaScript objects
        noteState(json)

    }

    // Add a note
    const addNote = async (title, description, tag) => {
        //Api
        const response = await fetch(`${host}/api/notes/savenotes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag }) // body data type must match "Content-Type" header
        });
        const note = await response.json(); // parses JSON response into native JavaScript objects
        //Logic
        // const note = {
        //     "_id": "63458d63f14069f42a9d1014",
        //     "user": "6332ad85e578c5f1edd077c8",
        //     "title": title,
        //     "description": description,
        //     "tag": tag,
        //     "timeStamp": "2022-10-11T15:36:03.865Z",
        //     "__v": 0
        // }
        noteState(notes.concat(note))
    }

    // delete a note
    const deleteNote = async(id) => {

        //API

        const response = await fetch(`${host}/api/notes/deletenote/${id}`,{
            method:"Delete",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        const json = response.json()
        const filterNote = notes.filter((notee) => {
            return notee._id !== id
        })

        noteState(filterNote);
    }

    //edit a note
    const editNote = async (id, title, description, tag) => {
        // Api call

        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title,description,tag}) // body data type must match "Content-Type" header
        });
        const json = await response.json(); // parses JSON response into native JavaScript objects

        let newNote = JSON.parse(JSON.stringify(notes))
        //logic
        for (let indx = 0; indx < newNote.length; indx++) {
            const element = newNote[indx];
            if (element._id === id) {
                newNote[indx].title = title;
                newNote[indx].description = description;
                newNote[indx].tag = tag;
                break;
            }
        }

        noteState(newNote)
    }

    return (


        <NoteContext.Provider value={{ notes, noteState, addNote, deleteNote, editNote, getAllNotes }}>
            {props.children}

        </NoteContext.Provider>
    )
}

export default NoteState