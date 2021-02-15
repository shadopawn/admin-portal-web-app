import React from 'react'

export default function LessonPairSelector({ index, display, highlightedPair, lessonPair }) {
    const showHighlightedPair = highlightedPair == index ? "lessonPairButton highlightedPair" : "lessonPairButton";

    return (
        <div>
            <button className={showHighlightedPair} onClick={() => display(index)}>
                {lessonPair.name}              
            </button>
            
        </div>
    )
}
