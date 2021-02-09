import React from 'react'

export default function LessonPairSelector({ index, display, highlightedPair }) {
    const showHighlightedPair = highlightedPair == index ? "lessonPairButton highlightedPair" : "lessonPairButton";

    return (
        <div>
            <button className={showHighlightedPair} onClick={() => display(index)}>
                Lesson Pair {index + 1}              
            </button>
            
        </div>
    )
}
