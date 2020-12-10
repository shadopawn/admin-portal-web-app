import React from 'react'

export default function VideoCard(props) {
    return (
        <div>
            <button className="standardButton" onClick={() => props.handleClick(props.name)} data-testid="btnVideo">{props.name}</button>
        </div>
    )
}
