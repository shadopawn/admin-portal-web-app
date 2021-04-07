import React, {useEffect} from 'react'
import VideoSelectionTool from './VideoSelectionTool'

export default function VideoPairSelection({ index, videoType, handleSelection, lessonPair }) {

    useEffect(() => {
        var video = document.getElementById(videoType + "vid");
        if(lessonPair[videoType+"_url"] != null){
            video.src = lessonPair[videoType+"_url"];
        }
    }, [lessonPair])

    return (
        <dd className="selection" onClick={() => handleSelection(index, videoType)} data-testid="btnCallSelection">
            <div className="nameDisplay">
                <h3 className="typeDisplay">{videoType} Video </h3><br></br>
                <video id={videoType + "vid"} width="320" height="240" controls>
                    <source src={lessonPair[videoType+"_url"]}></source>
                </video>
                <p>{lessonPair[videoType+"_video"].replace(/\.[^/.]+$/, "")}</p>
                <VideoSelectionTool index={index} videoType={videoType} />
            </div>
        </dd>
    )
}
