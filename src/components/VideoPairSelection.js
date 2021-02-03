import React from 'react'
import VideoSelectionTool from './VideoSelectionTool'

export default function VideoPairSelection({ index, videoType, handleSelection, lessonPair }) {
    return (
        <dd className="selection" onClick={() => handleSelection(index, videoType)} data-testid="btnCallSelection">
            <div className="nameDisplay">
                <h4 className="typeDisplay">{videoType} Video: </h4>
                {lessonPair[videoType+"_video"].replace(/\.[^/.]+$/, "")}
            </div>
            <VideoSelectionTool index={index} videoType={videoType} />
        </dd>
    )
}
