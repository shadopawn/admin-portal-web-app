import React, { useEffect, useState } from 'react'
import firebase from 'firebase'
import VideoCard from './VideoCard';
import '../css/VideoContainerModal.css'
import VideoUploaderModal from './VideoUploaderModal';

export default function VideoContainerModal(props) {

    const showHideClassName = props.show ? "videoModal display-block" : "videoModal display-none";
    const [videoNameList, setVideoNameList] = useState([])
    const [showUploaderModal, setshowUploaderModal] = useState(false)

    const showUploader = () => {
        setshowUploaderModal(true);
    }

    const getFirebaseVideos = () => {
        var listRef = firebase.storage().ref('training_videos/');
        listRef.listAll().then(function(res) {
        res.items.forEach(function(itemRef) {
            setVideoNameList(videoNameList => [...videoNameList, <VideoCard key={itemRef.name} name={itemRef.name} handleClick={props.getNameOfVideo} />])
        });
        }).catch(function(error) {
            console.log(error);
        });
    }

    useEffect(() => {
        if(props.show && showUploaderModal == false){
            getFirebaseVideos();
        }
        else {
            setVideoNameList([]);
        }
    }, [props.show, showUploaderModal]);

    return(
        <div className={showHideClassName}>
            <section className='videoModal-main'>
                <h2 className='heading'>What video would you like to add?</h2>
                <button className="standardPurpleButton" onClick={showUploader}>Upload Videos</button>
                {videoNameList}
                <button className="standardRedButton" onClick={() => props.hide(false)} data-testid="closeVModal">Close</button>

                <VideoUploaderModal show={showUploaderModal} hide={setshowUploaderModal} ></VideoUploaderModal>
            </section>
        </div>
    )
}
