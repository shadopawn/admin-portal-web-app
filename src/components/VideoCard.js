import React from 'react'

export default function VideoCard(props) {
    return (
        <div>
            <button className="standardButton" onClick={() => props.handleClick(props.name)}>{props.name}</button>
        </div>
    )
}
