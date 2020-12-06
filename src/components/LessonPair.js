import React from 'react'
import VideoSelectionTool from './VideoSelectionTool'
import Call from './Call'
import '../css/LessonTree.css';

export default function LessonPair({index, lessonPair, rerender, render, deletePair}) {

    const handleSelection = (lessonPairIndex, videoType) => {
        console.log("Lesson Pair " + lessonPairIndex);
        console.log("Video Type " + videoType);
        rerender(!render)
    }
    
    return (
        <div>
            <dt className="lessonPairName"><h3>Lesson Pair {index}</h3><button className="standardRedButton" onClick={() => deletePair(index)} >Delete</button></dt>
                <dd onClick={() => handleSelection(index, "call_video")}>Call Video: {lessonPair.call_video}
                    <VideoSelectionTool index={index} videoType={"call_video"} />
                </dd>
                <dd onClick={() => handleSelection(index, "analysis_video")}>Analysis Video: {lessonPair.analysis_video}
                    <VideoSelectionTool index={index} videoType={"analysis_video"} />
                </dd>
                <dd>
                    <Call callType={"True"} />
                </dd>
                <dd>
                    <Call callType={"False"} />
                </dd>
                <dd>
                    <Call callType={"False"} />
                </dd>
        </div>
    )
}