import React from 'react'

export default function LessonPairSelector({ index, display, deletePair }) {
    return (
        <div>
            <button className='standardButton' onClick={() => display(index)}>
                Lesson Pair {index + 1}
            </button>
            <button className="standardRedButton" onClick={() => deletePair(index)} data-testid="btnDeletePair">Delete</button>
        </div>
    )
}
