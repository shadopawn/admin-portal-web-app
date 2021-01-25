import React from 'react'
import VideoSelectionTool from './VideoSelectionTool'
import CallSelectionTool from './CallSelectionTool'
import '../css/LessonTree.css';

export default function LessonPair({index, lessonPair, rerender, render, deletePair}) {

    const handleSelection = (lessonPairIndex, additionType) => {
        console.log("Lesson Pair " + lessonPairIndex);
        console.log("Addition Type " + additionType);
        rerender(!render)
    }
    
    return (
        <div>
            <dt className="lessonPairName"><h3>Lesson Pair {index + 1}</h3><button className="standardRedButton" onClick={() => deletePair(index)} data-testid="btnDeletePair">Delete</button></dt>
                <dd className="videoSelection" onClick={() => handleSelection(index, "call_video")} data-testid="btnCallSelection">
                    <div className="videoNameDisplay">
                        Call Video: {lessonPair.call_video}
                    </div>
                    <VideoSelectionTool index={index} videoType={"call_video"} />
                </dd>
                <dd className="videoSelection" onClick={() => handleSelection(index, "analysis_video")} data-testid="btnAnalysisSelection">
                    <div className="videoNameDisplay">
                        Analysis Video: {lessonPair.analysis_video}
                    </div>
                    <VideoSelectionTool index={index} videoType={"analysis_video"} />
                </dd>
                <dd className="videoSelection" onClick={() => handleSelection(index, "false_call0")}>
                    <div className="videoNameDisplay">
                        False Call 1: {lessonPair.calls.false_call0}
                    </div>
                    <CallSelectionTool index={index} callType={"false_call0"} callBool={"False"} />
                </dd>
                <dd className="videoSelection" onClick={() => handleSelection(index, "false_call1")}>
                    <div className="videoNameDisplay">
                        False Call 2: {lessonPair.calls.false_call1}
                    </div>
                    <CallSelectionTool index={index} callType={"false_call1"} callBool={"False"} />
                </dd>
                <dd className="videoSelection" onClick={() => handleSelection(index, "true_call")}>
                    <div className="videoNameDisplay">
                        True Call: {lessonPair.calls.true_call}
                    </div>
                    <CallSelectionTool index={index} callType={"true_call"} callBool={"True"} />
                </dd>
        </div>
    )
}