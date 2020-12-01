import React, { useState } from 'react'
import VideoContainerModal from './VideoContainerModal'
import '../css/LessonPair.css'

export default function LessonPair(props) {

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
    }

    return (
        <div>
            <VideoContainerModal show={showVideoModal} hide={hideVideoModal} getNameOfVideo={getNameOfVideo} />
            <div className="videoSelector">
                <div>
                    <h2> {props.videoType} video selection:</h2>
                    <p> {name} </p>
                </div>
                <div className='addVideoButton'>
                <button onClick={showAVideoModal}>Add Video</button>
                </div>
                
                
            </div>
        </div>
    )
}
