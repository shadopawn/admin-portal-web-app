import React from 'react'
import CallCard from './CallCard';

export default function CallContainerModal(props) {
    const showHideClassName = props.show ? "videoModal display-block" : "videoModal display-none";

    return (
        <div className={showHideClassName}>
            <section className='videoModal-main'>
                <h2 className='heading'>What call would you like to add?</h2>
                <CallCard key={"key"} name={"key"}  handleClick={props.getNameOfCall}></CallCard>
                <CallCard key={"key2"} name={"key2"}  handleClick={props.getNameOfCall}></CallCard>
                <button className="standardRedButton" onClick={() => props.hide(false)}>Close</button>
            </section>
        </div>
    )
}
