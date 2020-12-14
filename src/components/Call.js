import React, {useContext} from 'react'
import { LessonDataContext } from '../contexts/LessonDataContext'

export default function Call({ index, callType, callBool}) {

    const { setCallText, currentLessonPack } = useContext(LessonDataContext)
    const UID = callType + index
    const placeholder = currentLessonPack.lessonPairs[index].calls[callType]

    const updateCall = () => {
        const callText = document.getElementById(UID).value;
        setCallText(index, callType, callText)
    }

    return (
        <div className="call">
            <p>{callBool} call: </p>
            <input id={UID} placeholder={placeholder} className="callTextbox" onChange={updateCall} data-testid="callInput"></input>
        </div>
    )
}
