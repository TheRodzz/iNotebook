import React, { useContext } from 'react'
import { AlertContext } from '../context/AlertContext';
export default function Alert() {
    // const capitalizeFirstLetter = (word) => {
    //     const lower = word.toLowerCase();
    //     return word.charAt(0).toUpperCase() + lower.slice(1);
    // }
    const alert = useContext(AlertContext);
    if(!alert) return null;
    return (
        <div className={`alert alert-${alert.type}`} role="alert">
            <strong>{alert.type}</strong> {alert.message}
        </div>
    )
}