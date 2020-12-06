import React, { useState, useContext } from 'react'
import VideoContainerModal from './VideoContainerModal'
import '../css/LessonPair.css'
import { LessonDataContext } from '../contexts/LessonDataContext'

export default function LessonPair({index, videoType}) {

    const { setVideoFileName } = useContext(LessonDataContext)

    const [showVideoModal, setshowVideoModal] = useState(false)
    const [name, setname] = useState("")

    const hideVideoModal = () => {
        setshowVideoModal(false);
    }

    const showAVideoModal = () => {
        setshowVideoModal(true);
    }

    const getNameOfVideo = (name) => {
        setname(name);
        hideVideoModal();
        setVideoFileName(index, videoType, name)
    }

    return (
        <div>
            <VideoContainerModal show={showVideoModal} hide={hideVideoModal} getNameOfVideo={getNameOfVideo} />
            <div className="videoSelector">
                <div className='addVideoButton'>
                <button className="standardButton" onClick={showAVideoModal}>Add Video</button>
                </div>                
            </div>
        </div>
    )
}
