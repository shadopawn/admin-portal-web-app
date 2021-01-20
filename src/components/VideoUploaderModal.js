import React from 'react'
import VideoUploader from './VideoUploader';

export default function VideoUploaderModal(props) {
    const showHideClassName = props.show ? "videoModal display-block" : "videoModal display-none";

    return (
        <div className={showHideClassName}>
            <section className='videoModal-main'>
                <h2 className='heading'>Upload Videos</h2>
                <VideoUploader />
                <button className="standardRedButton" onClick={() => props.hide(false)}>Close</button>
            </section>
        </div>
    )
}
