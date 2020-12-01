import React, { useState } from 'react'
import VideoSelectionTool from './VideoSelectionTool';

export default function LessonPair(props) {
     
    const [callVideoName, setcallVideoName] = useState("");
    const [analysisVideoName, setanalysisVideoName] = useState("")

    const createLessonJSON = () => {
        props.changeLessontree([callVideoName, analysisVideoName])
        
    }
    
    return (
        <div>
            <VideoSelectionTool videoType="Call" changeLessonTree={setcallVideoName} />
            <VideoSelectionTool videoType="Analysis" changeLessonTree={setanalysisVideoName} />
            <button onClick={createLessonJSON} >Upload</button>

        </div>
    )
}