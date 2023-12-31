import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) =>{
    const noteInitial =[];
    const [notes, setNotes] = useState(noteInitial);
    const host="http://localhost:5000";
    
    
    const getAllNotes = async()=>{
      const response = await fetch(`${host}/api/note/fetchallnotes`, {
        method: 'GET',
        headers: {
          'Content-Type':'application/json',
          'auth-token': localStorage.getItem('token'),
        },
      });
      const json=await response.json();
      setNotes(json)
    }

    const addNote = async (note) =>{

      const response = await fetch(`${host}/api/note/addnote`, {
        method: 'POST',
        headers: {
          'Content-Type':'application/json',
          'auth-token': localStorage.getItem('token'),
        },
        body: JSON.stringify(note)
      });
      const json=await response.json();
      console.log(json);
      setNotes(notes.concat(note));
    }

    const editNote = (id,title,description,tag) =>{
      for (let index = 0; index < notes.length; index++) {
        const element = notes[index];
        if(element._id===id){
          element.title=title;
          element.description=description;
          element.tag=tag;
          break;
        }
        // TODO: add api call
      }
    }

    const deleteNote = async (id) =>{
      const newNotes = notes.filter((note)=>{return note._id!==id});
      setNotes(newNotes);
      const response = await fetch(`${host}/api/note/deletenote/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type':'application/json',
          'auth-token': localStorage.getItem('token'),
        },
      });
      const json=await response.json();
      console.log(json);

    }
    return (
        <noteContext.Provider value={{notes,setNotes,addNote,editNote,deleteNote,getAllNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}
export default NoteState;