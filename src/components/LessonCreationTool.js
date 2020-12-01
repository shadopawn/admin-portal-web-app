import React, { useState } from 'react'
import firebase from 'firebase';
import VideoContainerModal from './VideoContainerModal'

export default function LessonCreationTool() {

    
    const [showVideoModal, setshowVideoModal] = useState(false)

    const hideVideoModal = () => {
        setshowVideoModal(false);
    }

    const shoVideoModal = () => {
        setshowVideoModal(true);
    }
    
    return (
        <div>
            <p>Lesson Creation</p>
            <button onClick={shoVideoModal}>Add Video</button>
            <VideoContainerModal show={showVideoModal} hide={hideVideoModal} />
        </div>
    )
}
