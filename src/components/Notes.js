import React, { useContext } from 'react'
import noteContext from '../context/noteContext';
import NoteItem from './NoteItem';
const Notes = () => {
    const context = useContext(noteContext);
    const {notes} = context;
    return (
        <div className='row my-3'>
            <h2>Your notes</h2>
            {notes.map((note) => {
                return <NoteItem note={note}/>
            })}
        </div>
    )
}

export default Notes

