import React, { useState, useContext } from 'react'
import VideoContainerModal from './VideoContainerModal'
import '../css/LessonPair.css'
import { LessonDataContext } from '../contexts/LessonDataContext'

export default function VideoSelectionTool({index, videoType}) {

    const { setVideoLessonData } = useContext(LessonDataContext)
    const [showVideoModal, setshowVideoModal] = useState(false)

    const setVideoData = (name, url) => {
        setshowVideoModal(false);
        setVideoLessonData(index, videoType, name, url)
    }

    return (
        <div>
            <VideoContainerModal show={showVideoModal} hide={setshowVideoModal} setVideoData={setVideoData} />
            <div className="videoSelector">
                <button className="videoButton" onClick={() => setshowVideoModal(true)} data-testid="btnAddVideo">Add Video</button>               
            </div>
        </div>
    )
}
