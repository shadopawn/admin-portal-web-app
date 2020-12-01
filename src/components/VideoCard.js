import React from 'react'

export default function VideoCard(props) {
    return (
        <div>
            <button onClick={() => props.handleClick(props.name)}>{props.name}</button>
        </div>
    )
}
