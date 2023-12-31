import React, { useContext, useEffect} from 'react'
import noteContext from '../context/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useHistory } from 'react-router-dom';
import '../customCSS/Notes.css'

const Notes = () => {
    const context = useContext(noteContext);
    const { notes, getAllNotes } = context;
    let history = useHistory();
    useEffect(() => {
        if(localStorage.getItem('token')){
            getAllNotes();
        }
        else {
            history.push("/login");
        }
        // eslint-disable-next-line
    }, [])

    // const ref = useRef(null);
    const updateNote = (note) => {
        // ref.current.click();
    }
    return (
        <>
            <AddNote />
            {/* TODO: Add modal for editing notes */}
            {/* <button ref={ref}  type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            ...
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div> */}
            <div className='row my-3'>
                <h2>Your notes</h2>
                {notes.map((note) => {
                    return <NoteItem note={note} updateNote={updateNote} />
                })}
            </div>
        </>
    )
}

export default Notes


