import React, { useState } from 'react'
import VideoContainerModal from './VideoContainerModal'

export default function LessonCreationTool() {

    
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
            <p>Lesson Creation</p>
            <button onClick={showAVideoModal}>Add Video</button>
            <VideoContainerModal show={showVideoModal} hide={hideVideoModal} getNameOfVideo={getNameOfVideo} />
            <h1>  {name} </h1>
        </div>
    )
}
