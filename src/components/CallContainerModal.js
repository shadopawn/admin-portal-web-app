import React, { useEffect, useState } from 'react'
import firebase from 'firebase'
import CallCard from './CallCard';

export default function CallContainerModal(props) {
    const showHideClassName = props.show ? "videoModal display-block" : "videoModal display-none";
    const [callList, setcallList] = useState([])

    const getFirebaseCalls = () => {
        var listRef = firebase.storage().ref('basketball_signals/');
        listRef.listAll().then(function(res) {
        res.items.forEach(function(itemRef) {
            setcallList(callList => [...callList, <CallCard key={itemRef.name} name={itemRef.name} handleClick={props.getNameOfCall} />])
        });
        }).catch(function(error) {
            console.log(error);
        });
    }

    useEffect(() => {
        if(props.show){
            getFirebaseCalls();
        }
        else {
            setcallList([]);
        }
    }, [props.show]);

    return (
        <div className={showHideClassName}>
            <section className='videoModal-main'>
                <h2 className='heading'>What call would you like to add?</h2>
                {callList}
                <button className="standardRedButton" onClick={() => props.hide(false)}>Close</button>
            </section>
        </div>
    )
}
