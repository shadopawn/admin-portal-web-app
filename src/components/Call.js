import React, {useContext} from 'react'
import { LessonDataContext } from '../contexts/LessonDataContext'

export default function Call({ index, callType}) {

    const { setCallText } = useContext(LessonDataContext)
    const UID = callType + index

    const updateCall = () => {
        const callText = document.getElementById(UID).value;
        console.log(callText)
        setCallText(callType, callText)
    }

    return (
        <div className="call">
            <p>{callType} </p>
            <input id={UID} placeholder="Call" className="callTextbox" onChange={updateCall} ></input>
        </div>
    )
}
