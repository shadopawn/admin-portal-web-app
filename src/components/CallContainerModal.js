import React, { useEffect, useState } from 'react'
import firebase from 'firebase'
import CallCard from './CallCard';

export default function CallContainerModal({show, hide, getNameOfCall}) {

    const showHideClassName = show ? "modal display-block" : "modal display-none";
    const [callList, setcallList] = useState([])
    const [searchTerm, setsearchTerm] = useState('')

    const getFirebaseCalls = () => {
        var listRef = firebase.storage().ref('basketball_signals/');
        listRef.listAll().then(function(res) {
        res.items.forEach(function(itemRef) {
            itemRef.getDownloadURL().then(function(url) {
                var imageURL = url;
                setcallList(callList => [...callList, <CallCard key={itemRef.name} name={itemRef.name} handleClick={getNameOfCall} imageURL={imageURL}/>])
            })
        });
        }).catch(function(error) {
            console.log(error);
        });
    }

    useEffect(() => {
        if(show){
            getFirebaseCalls();
        }
        else {
            setcallList([]);
        } // eslint-disable-next-line 
    }, [show]);

    return (
        <div className={showHideClassName}>
            <section className='modal-main'>
                <h2 className='heading'>What call would you like to add?</h2>
                <input type="text" className="inputText" placeholder="Search..." onChange={event => {setsearchTerm(event.target.value)}}></input>
                <div className='callContainer'>
                    {callList.filter((val)=> {
                        if (searchTerm === '') {
                            return val
                        } else if (val["key"].toLowerCase().includes(searchTerm.toLowerCase())) {
                            return val
                        }
                    })}
                </div>
                <button className="standardRedButton" onClick={() => hide(false)} data-testid="closeModal">Close</button>
            </section>
        </div>
    )
}
