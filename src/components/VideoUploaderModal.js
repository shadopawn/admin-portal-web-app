import React from 'react'
import VideoUploader from './VideoUploader';

export default function VideoUploaderModal({ show, hide }) {
    const showHideClassName = show ? "videoModal display-block" : "videoModal display-none";

    return (
        <div className={showHideClassName}>
            <section className='videoModal-main'>
                <VideoUploader />
                <button className="standardRedButton" onClick={() => hide(false)}>Close</button>
            </section>
        </div>
    )
}
