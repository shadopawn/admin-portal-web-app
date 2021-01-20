import React, { useState, useContext } from 'react'
import VideoContainerModal from './VideoContainerModal'
import '../css/LessonPair.css'
import { LessonDataContext } from '../contexts/LessonDataContext'

export default function VideoSelectionTool({index, videoType}) {

    const { setVideoFileName } = useContext(LessonDataContext)
    const [showVideoModal, setshowVideoModal] = useState(false)
    const [name, setname] = useState("")

    const getNameOfVideo = (name) => {
        setname(name);
        setshowVideoModal(false);
        setVideoFileName(index, videoType, name)
    }

    return (
        <div>
            <VideoContainerModal show={showVideoModal} hide={setshowVideoModal} getNameOfVideo={getNameOfVideo} />
            <div className="videoSelector">
                <div className='addVideoButton'>
                <button className="standardButton" onClick={() => setshowVideoModal(true)} data-testid="btnAddVideo">Add Video</button>
                </div>                
            </div>
        </div>
    )
}
