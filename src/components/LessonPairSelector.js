import React from 'react'

export default function LessonPairSelector({ index, display }) {
    return (
        <div>
            <button className='lessonPairButton' onClick={() => display(index)}>
                Lesson Pair {index + 1}              
            </button>
            
        </div>
    )
}
