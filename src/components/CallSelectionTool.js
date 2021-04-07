import React, { useState, useContext } from 'react'
import { LessonDataContext } from '../contexts/LessonDataContext'
import CallContainerModal from './CallContainerModal'

export default function CallSelectionTool({ index, callType }) {

    const { setCallText } = useContext(LessonDataContext)
    const [showCallModal, setshowCallModal] = useState(false)

    const getNameOfCall = (callName) => {
        setshowCallModal(false);
        setCallText(index, callType, callName)
    }

    return (
        <div>
            <CallContainerModal show={showCallModal} hide={setshowCallModal} getNameOfCall={getNameOfCall} />
            <div className="videoSelector">
                <button className="videoButton" onClick={() => setshowCallModal(true)} data-testid="btnAddCall">Add Call</button>             
            </div>
        </div>
    )
}
