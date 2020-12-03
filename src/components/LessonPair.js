import React from 'react'

export default function LessonPair({index, lessonPair}) {
    
    return (
        <div>
            <dt>Lesson Pair {index} <button>Delete</button></dt>
                <dd>Call Video: {lessonPair.callVideo}</dd>
                <dd>Analysis Video: {lessonPair.analysisVideo}</dd>
        </div>
    )
}