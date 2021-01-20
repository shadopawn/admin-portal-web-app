import React from 'react'

export default function CallCard(props) {
    return (
        <div>
            <img src={props.imageURL} width="150" height="150" />
            <button className="standardButton" onClick={() => props.handleClick(props.name)}>{props.name}</button>
        </div>
    )
}
