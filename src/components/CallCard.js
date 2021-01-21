import React from 'react'

export default function CallCard(props) {
    return (
        <div className='callCard'>
            <img src={props.imageURL} className='call' width='200' height='200' />
            <button className="standardButton call" onClick={() => props.handleClick(props.name)}>{props.name}</button>
        </div>
    )
}
