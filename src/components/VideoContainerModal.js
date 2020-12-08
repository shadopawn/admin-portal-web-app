import React, { useEffect, useState } from 'react'
import firebase from 'firebase'
import VideoCard from './VideoCard';
import '../css/VideoContainerModal.css'

export default function VideoContainerModal(props) {

    const showHideClassName = props.show ? "videoModal display-block" : "videoModal display-none";
    const [videoNameList, setVideoNameList] = useState([])

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
        if(props.show){
            getFirebaseVideos();
        }
        else {
            setVideoNameList([]);
        }
        
    }, [props.show]);

    return(
        <div className={showHideClassName}>
            <section className='videoModal-main'>
                <h2 className='heading'>What video would you like to add?</h2>
                {videoNameList}
                <button className="standardRedButton" onClick={props.hide}>Close</button>
            </section>
        </div>
    )
}
