import React from 'react'

export default function VideoCard({name, handleClick}) {
    return (
        <div>
            <button className="standardButton" onClick={() => handleClick(name)} data-testid="btnVideo">{name}</button>
        </div>
    )
}
