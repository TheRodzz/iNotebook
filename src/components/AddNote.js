import React, { useContext, useState } from 'react'
import noteContext from '../context/noteContext'


const AddNote = () => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note,setNote] = useState({title:"",description:"",tag:""});
    const handleChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value});

    }
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note);
    }
    return (
        <div className='my-3'>
            <h3>Add a note</h3>
            <form className='container my-3'>
                <div className="form-group my-3">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" placeholder="Enter title" onChange={handleChange} />
                </div>
                <div className="for09-om-group">
                    <label htmlFor="description">Description</label>
                    <input type="text" className="form-control" id="description" name='description' placeholder="Enter description" onChange={handleChange} />
                </div>
                <div className="for09-om-group">
                    <label htmlFor="tag">Tag</label>
                    <input type="text" className="form-control" id="tag" name='tag' placeholder="Enter tags" onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary my-3" onClick={handleClick}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote
