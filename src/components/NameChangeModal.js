import React, { useEffect, useState } from 'react'
import VideoCard from './VideoCard';
import '../css/VideoContainerModal.css'


export default function NameChangeModal(props) {
    const showHideClassName = props.show ? "videoModal display-block" : "videoModal display-none";

    return (
        <div className={showHideClassName}>
            <section className='videoModal-main'>
                <h2 className='heading'>What would you like the name to be?</h2>
                <input id="nameChangeInput"></input>
                <button className="standardButton" onClick={props.changeName}>Submit</button>
                <button className="standardRedButton" onClick={() => props.hide(false)}>Close</button>
            </section>
        </div>
    )
}
