import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) =>{
    const state1 = {
        "name": "Rodzz",
    }
    const [state,setState] = useState(state1);  
    return (
        <noteContext.Provider value={{state,setState}}>
            {props.children}
        </noteContext.Provider>
    )
}
export default NoteState;