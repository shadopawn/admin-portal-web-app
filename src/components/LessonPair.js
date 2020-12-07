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
                <dd className="videoSelection" onClick={() => handleSelection(index, "call_video")}>
                    <div className="videoNameDisplay">
                        Call Video: {lessonPair.call_video}
                    </div>
                    <VideoSelectionTool index={index} videoType={"call_video"} />
                </dd>
                <dd className="videoSelection" onClick={() => handleSelection(index, "analysis_video")}>
                    <div className="videoNameDisplay">
                        Analysis Video: {lessonPair.analysis_video}
                    </div>
                    <VideoSelectionTool index={index} videoType={"analysis_video"} />
                </dd>
                <dd>
                    <Call index={index} callType={"false_call0"} callBool={"False"} />
                </dd>
                <dd>
                    <Call index={index} callType={"false_call1"} callBool={"False"} />
                </dd>
                <dd>
                    <Call index={index} callType={"true_call"} callBool={"True"} />
                </dd>
        </div>
    )
}