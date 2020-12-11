import React from 'react'
import '../css/VideoContainerModal.css'


export default function NameChangeModal(props) {
    const showHideClassName = props.show ? "videoModal display-block" : "videoModal display-none";

    return (
        <div className={showHideClassName}>
            <section className='videoModal-main'>
                <h2 className='heading'>What would you like the name to be?</h2>
                <input id="nameChangeInput" data-testid="nameChangeInput"></input>
                <button className="standardButton" onClick={props.changeName}>Submit</button>
                <button className="standardRedButton" onClick={() => props.hide(false)}>Close</button>
            </section>
        </div>
    )
}
