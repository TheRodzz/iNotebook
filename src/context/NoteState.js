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
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ5ZDE4YmEzZTA5OGU0NWU4Yzk3MjJkIn0sImlhdCI6MTY4ODU0MjA1NX0.8cfPeWJWYVQCQFBZ7JRONndYhf83LZFYP68mWUWzF0I',
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
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ5ZDE4YmEzZTA5OGU0NWU4Yzk3MjJkIn0sImlhdCI6MTY4ODU0MjA1NX0.8cfPeWJWYVQCQFBZ7JRONndYhf83LZFYP68mWUWzF0I',
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
        
      }
    }

    const deleteNote = async (id) =>{
      const newNotes = notes.filter((note)=>{return note._id!==id});
      setNotes(newNotes);
      const response = await fetch(`${host}/api/note/deletenote/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type':'application/json',
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ5ZDE4YmEzZTA5OGU0NWU4Yzk3MjJkIn0sImlhdCI6MTY4ODU0MjA1NX0.8cfPeWJWYVQCQFBZ7JRONndYhf83LZFYP68mWUWzF0I',
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