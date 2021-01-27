import React from 'react'

export default function CallCard({name, imageURL, handleClick}) {
    return (
        <div className='callCard'>
            <img src={imageURL} className='call' width='200' height='200' alt='call' />
            <button className="standardButton call" onClick={() => handleClick(name)} data-testid='btnCall'>{name}</button>
        </div>
    )
}
