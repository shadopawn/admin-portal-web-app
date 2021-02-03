import React from 'react'
import VideoSelectionTool from './VideoSelectionTool'

export default function VideoPairSelection({ index, videoType, handleSelection, lessonPair }) {
    return (
        <dd className="selection" onClick={() => handleSelection(index, videoType)} data-testid="btnCallSelection">
            <div className="nameDisplay">
                {videoType} Video: {lessonPair[videoType+"_video"].replace(/\.[^/.]+$/, "")}
            </div>
            <VideoSelectionTool index={index} videoType={videoType} />
        </dd>
    )
}
