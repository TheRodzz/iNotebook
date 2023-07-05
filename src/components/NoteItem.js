import React from 'react'

const NoteItem = (props) => {
    const { note } = props;
    return (
        <div className='col-md-3 my-3'>
            <div className="card">
                <div className="card-header">
                    {note.title}
                </div>
                <div className="card-body">
                    <blockquote className="blockquote mb-0">
                        <p>{note.description}</p>
                    </blockquote>
                    <i className="fa-solid fa-pen-to-square mx-2"></i>
                    <i className="fa-solid fa-trash mx-2"></i>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
