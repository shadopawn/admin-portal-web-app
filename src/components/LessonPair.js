import React, { useState, useEffect } from 'react'
import VideoSelectionTool from './VideoSelectionTool';

export default function LessonPair(props, tree) {
     
    const [callVideoName, setcallVideoName] = useState("");
    const [analysisVideoName, setanalysisVideoName] = useState("")
    const [lessonPairTree, setlessonPairTree] = useState([])

    useEffect(() => {
        setlessonPairTree([callVideoName, analysisVideoName])
    }, [callVideoName, analysisVideoName]);

    useEffect(() => {
        if (props.upload){
            props.changeLessontree(tree => [...tree, lessonPairTree])
            props.up(false)
        }
        
    }, [props.upload])
    
    return (
        <div>
            <p style={{textAlign:"left"}}>Lesson Pair</p>
            <VideoSelectionTool videoType="Call" changeLessonTree={setcallVideoName} />
            <VideoSelectionTool videoType="Analysis" changeLessonTree={setanalysisVideoName} />
        </div>
    )
}