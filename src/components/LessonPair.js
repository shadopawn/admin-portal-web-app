import React from 'react'
import VideoSelectionTool from './VideoSelectionTool'
import CallSelectionTool from './CallSelectionTool'
import '../css/LessonPair.css';

export default function LessonPair({index, lessonPair, rerender, render}) {

    const handleSelection = (lessonPairIndex, additionType) => {
        console.log("Lesson Pair " + lessonPairIndex);
        console.log("Addition Type " + additionType);
        rerender(!render)
    }
    
    return (
        <div>
            <dt className="lessonPairName"><h3>Lesson Pair {index + 1}</h3></dt>
                <dd className="selection" onClick={() => handleSelection(index, "call")} data-testid="btnCallSelection">
                    <div className="nameDisplay">
                        Call Video: {lessonPair.call_video.replace(/\.[^/.]+$/, "")}
                    </div>
                    <VideoSelectionTool index={index} videoType={"call"} />
                </dd>
                <dd className="selection" onClick={() => handleSelection(index, "analysis")} data-testid="btnAnalysisSelection">
                    <div className="nameDisplay">
                        Analysis Video: {lessonPair.analysis_video.replace(/\.[^/.]+$/, "")}
                    </div>
                    <VideoSelectionTool index={index} videoType={"analysis"} />
                </dd>
                <dd className="selection" onClick={() => handleSelection(index, "false_call0")}>
                    <div className="nameDisplay">
                        False Call 1: {lessonPair.calls.false_call0.replace(/\.[^/.]+$/, "")}
                    </div>
                    <CallSelectionTool index={index} callType={"false_call0"} callBool={"False"} />
                </dd>
                <dd className="selection" onClick={() => handleSelection(index, "false_call1")}>
                    <div className="nameDisplay">
                        False Call 2: {lessonPair.calls.false_call1.replace(/\.[^/.]+$/, "")}
                    </div>
                    <CallSelectionTool index={index} callType={"false_call1"} callBool={"False"} />
                </dd>
                <dd className="selection" onClick={() => handleSelection(index, "true_call")}>
                    <div className="nameDisplay">
                        True Call: {lessonPair.calls.true_call.replace(/\.[^/.]+$/, "")}
                    </div>
                    <CallSelectionTool index={index} callType={"true_call"} callBool={"True"} />
                </dd>
        </div>
    )
}