import React from 'react'

export default function LessonPair({index, lessonPair}) {

    const handleSelection = (lessonPairIndex, videoType) => {
        console.log("Lesson Pair " + lessonPairIndex);
        console.log("Video Type " + videoType);
    }
    
    return (
        <div>
            <dt>Lesson Pair {index} <button>Delete</button></dt>
                <dd onClick={() => handleSelection(index, "callVideo")}>Call Video: {lessonPair.callVideo}</dd>
                <dd onClick={() => handleSelection(index, "analysisVideo")}>Analysis Video: {lessonPair.analysisVideo}</dd>
        </div>
    )
}