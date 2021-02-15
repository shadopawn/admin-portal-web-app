import React, { useEffect, useState } from 'react'
import firebase from 'firebase'
import VideoCard from './VideoCard';
import '../css/VideoContainerModal.css'
import VideoUploaderModal from './VideoUploaderModal';

export default function VideoContainerModal({show, hide, setVideoData}) {

    const showHideClassName = show ? "videoModal display-block" : "videoModal display-none";
    const [showUploaderModal, setshowUploaderModal] = useState(false)
    const [videoNameList, setVideoNameList] = useState([])
    const [searchTerm, setsearchTerm] = useState('')

    const getFirebaseVideos = () => {
        var listRef = firebase.storage().ref('training_videos/');
        listRef.listAll().then(function(res) {
        res.items.forEach(function(itemRef) {
            itemRef.getDownloadURL().then(function(url) {
                setVideoNameList(videoNameList => [...videoNameList, <VideoCard key={itemRef.name} name={itemRef.name} url={url} handleClick={setVideoData} />])
            })
        });
        }).catch(function(error) {
            console.log(error);
        });
    }

    useEffect(() => {
        if(show && showUploaderModal === false){
            getFirebaseVideos();
        }
        else {
            setVideoNameList([]);
        } // eslint-disable-next-line 
    }, [show, showUploaderModal]) 

    return(
        <div className={showHideClassName}>
            <section className='videoModal-main'>
                <h2 className='heading'>What video would you like to add?</h2>
                <button className="standardPurpleButton" onClick={() => setshowUploaderModal(true)}>Upload Videos</button>
                <input type="text" className="inputText" placeholder="Search..." onChange={event => {setsearchTerm(event.target.value)}}></input>
                {// eslint-disable-next-line
                videoNameList.filter((val)=> {
                    if (searchTerm === '') {
                        return val
                    } else if (val["key"].toLowerCase().includes(searchTerm.toLowerCase())) {
                        return val
                    }
                })}
                <button className="standardRedButton" onClick={() => hide(false)} data-testid="closeVModal">Close</button>

                <VideoUploaderModal show={showUploaderModal} hide={setshowUploaderModal} ></VideoUploaderModal>
            </section>
        </div>
    )
}
