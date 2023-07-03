import React, { useContext } from 'react'
import noteContext from '../context/noteContext';
const About = () => {
    const s = useContext(noteContext);
    return (
        <div>
            This is about {s.state.name}
        </div>
    )
}

export default About
