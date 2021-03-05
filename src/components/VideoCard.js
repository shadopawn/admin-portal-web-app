import React from 'react'

export default function VideoCard({name, url, handleClick, timeCreated}) {
    return (
        <div>
            <button className="standardButton" onClick={() => handleClick(name, url)} data-testid="btnVideo">{name}</button>
        </div>
    )
}
