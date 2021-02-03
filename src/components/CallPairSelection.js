import React, { useState, useEffect } from 'react'
import CallSelectionTool from './CallSelectionTool'

export default function CallPairSelection({ index, callType, handleSelection, lessonPair }) {

    const [call, setcall] = useState('Call: ')
    const [callBool, setcallBool] = useState()

    useEffect(() => {
        if(callType === "false_call0"){
            setcall("False Call 1: ")
            setcallBool("False")
        } else if (callType === "false_call1") {
            setcall("False Call 2: ")
            setcallBool("False")
        } else {
            setcall("True Call: ")
            setcallBool("True")
        }// eslint-disable-next-line
    }, []);

    return (
        <dd className="selection" onClick={() => handleSelection(index, callType)}>
            <div className="nameDisplay">
                <h4 className="typeDisplay">{call}</h4>
                {lessonPair.calls[callType].replace(/\.[^/.]+$/, "")}
            </div>
            <CallSelectionTool index={index} callType={callType} callBool={callBool} />
        </dd>
    )
}
