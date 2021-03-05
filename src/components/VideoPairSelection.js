import React from 'react'
import VideoSelectionTool from './VideoSelectionTool'

export default function VideoPairSelection({ index, videoType, handleSelection, lessonPair }) {
    return (
        <dd className="selection" onClick={() => handleSelection(index, videoType)} data-testid="btnCallSelection">
            <div className="nameDisplay">
                <h3 className="typeDisplay">{videoType} Video </h3><br></br>
                <p>{lessonPair[videoType+"_video"].replace(/\.[^/.]+$/, "")}</p>
                <VideoSelectionTool index={index} videoType={videoType} />
            </div>
            
        </dd>
    )
}
