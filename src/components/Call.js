import React, {useContext} from 'react'
import { LessonDataContext } from '../contexts/LessonDataContext'

export default function Call({ index, callType, callBool}) {

    const { setCallText, currentLessonPack } = useContext(LessonDataContext)
    const UID = callType + index
    const placeholder = currentLessonPack.calls[callType]

    const updateCall = () => {
        const callText = document.getElementById(UID).value;
        setCallText(callType, callText)
    }

    return (
        <div className="call">
            <p>{callBool} call: </p>
            <input id={UID} placeholder={placeholder} className="callTextbox" onChange={updateCall} ></input>
        </div>
    )
}
