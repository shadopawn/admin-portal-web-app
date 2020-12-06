import React from 'react'

export default function Call({callType}) {
    return (
        <div className="call">
            <p>{callType} call: </p>
            <input  data-testid="call" placeholder="Call" className="callTextbox"></input>
        </div>
    )
}
