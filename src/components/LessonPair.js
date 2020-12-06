import React from 'react'
import VideoSelectionTool from './VideoSelectionTool'

export default function LessonPair({index, lessonPair, rerender, render, deletePair}) {

    const handleSelection = (lessonPairIndex, videoType) => {
        console.log("Lesson Pair " + lessonPairIndex);
        console.log("Video Type " + videoType);
        rerender(!render)
    }
    
    return (
        <div>
            <dt><h3>Lesson Pair {index}</h3><button className="standardRedButton" onClick={() => deletePair(index)} >Delete</button></dt>
                <dd onClick={() => handleSelection(index, "callVideo")}>Call Video: {lessonPair.callVideo}
                    <VideoSelectionTool index={index} videoType={"callVideo"} />
                </dd>
                <dd onClick={() => handleSelection(index, "analysisVideo")}>Analysis Video: {lessonPair.analysisVideo}
                    <VideoSelectionTool index={index} videoType={"analysisVideo"} />
                </dd>
        </div>
    )
}