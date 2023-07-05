import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) =>{
    const noteInitial =[
        {
          "_id": "649efacef97c3bbe7de4e758",
          "user": "649d1abbdb7ccf50c80c9829",
          "title": "title 1",
          "tag": "test",
          "description": "this is the desc",
          "date": "2023-06-30T15:54:54.965Z",
          "__v": 0
        },
        {
          "_id": "649efb05f97c3bbe7de4e75d",
          "user": "649d1abbdb7ccf50c80c9829",
          "title": "title 1",
          "tag": "test",
          "description": "this is the desc",
          "date": "2023-06-30T15:55:49.554Z",
          "__v": 0
        },
        {
            "_id": "649efacef97c3bbe7de4e758",
            "user": "649d1abbdb7ccf50c80c9829",
            "title": "title 1",
            "tag": "test",
            "description": "this is the desc",
            "date": "2023-06-30T15:54:54.965Z",
            "__v": 0
          },
          {
            "_id": "649efb05f97c3bbe7de4e75d",
            "user": "649d1abbdb7ccf50c80c9829",
            "title": "title 1",
            "tag": "test",
            "description": "this is the desc",
            "date": "2023-06-30T15:55:49.554Z",
            "__v": 0
          },
          {
            "_id": "649efacef97c3bbe7de4e758",
            "user": "649d1abbdb7ccf50c80c9829",
            "title": "title 1",
            "tag": "test",
            "description": "this is the desc",
            "date": "2023-06-30T15:54:54.965Z",
            "__v": 0
          },
          {
            "_id": "649efb05f97c3bbe7de4e75d",
            "user": "649d1abbdb7ccf50c80c9829",
            "title": "title 1",
            "tag": "test",
            "description": "this is the desc",
            "date": "2023-06-30T15:55:49.554Z",
            "__v": 0
          },
          {
            "_id": "649efacef97c3bbe7de4e758",
            "user": "649d1abbdb7ccf50c80c9829",
            "title": "title 1",
            "tag": "test",
            "description": "this is the desc",
            "date": "2023-06-30T15:54:54.965Z",
            "__v": 0
          },
          {
            "_id": "649efb05f97c3bbe7de4e75d",
            "user": "649d1abbdb7ccf50c80c9829",
            "title": "title 1",
            "tag": "test",
            "description": "this is the desc",
            "date": "2023-06-30T15:55:49.554Z",
            "__v": 0
          }
      ]


    const [notes, setNotes] = useState(noteInitial);
    const addNote = (note) =>{

      setNotes(notes.concat(note));
    }

    const editNote = () =>{
      
    }

    const deleteNote = () =>{
      
    }
    return (
        <noteContext.Provider value={{notes,setNotes,addNote,editNote,deleteNote}}>
            {props.children}
        </noteContext.Provider>
    )
}
export default NoteState;