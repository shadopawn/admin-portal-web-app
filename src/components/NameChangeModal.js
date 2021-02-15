import React from 'react'


export default function NameChangeModal({show, hide, changeName, index}) {
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return (
        <div className={showHideClassName}>
            <section className='modal-main'>
                <h2 className='heading'>What would you like the name to be?</h2>
                <input id={"nameChangeInput" + index} data-testid="nameChangeInput"></input>
                <button className="standardButton" onClick={changeName}>Submit</button>
                <button className="standardRedButton" onClick={() => hide(false)}>Close</button>
            </section>
        </div>
    )
}
