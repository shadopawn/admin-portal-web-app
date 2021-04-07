import React, { useState, useEffect } from 'react'
import CallSelectionTool from './CallSelectionTool'
import firebase from 'firebase'

export default function CallPairSelection({ index, callType, handleSelection, lessonPair }) {

    const [call, setcall] = useState('Call: ')
    const [callBool, setcallBool] = useState()
    const [imageURL, setimageURL] = useState()

    const getFirebaseURL = () => {
        if(lessonPair.calls[callType] !== "Placeholder"){
            var listRef = firebase.storage().ref('basketball_signals/' + lessonPair.calls[callType]);
            listRef.getDownloadURL().then(function(url) {
                setimageURL(url)
            })
        }
    }

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
        }
        getFirebaseURL()
        // eslint-disable-next-line
    }, [handleSelection]);

    return (
        <dd className="selection" onClick={() => handleSelection(index, callType)}>
            <div className="nameDisplay">
                <h4 className="typeDisplay">{call}</h4><br></br>
                <img src={imageURL} width='200' height='200' alt=""></img>
                <p>{lessonPair.calls[callType].replace(/\.[^/.]+$/, "")}</p>
                <CallSelectionTool index={index} callType={callType} callBool={callBool} />
            </div>      
        </dd>
    )
}
