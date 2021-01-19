import React from 'react'
import firebase from 'firebase';

export default function VideoUploader() {

    const fileChangeEvent = (e) => {
        var file = e.target.files[0];
        var storageRef = firebase.storage().ref('training_videos/' + file.name);
        var task = storageRef.put(file);
        task.on('state_change', 
            function progress(snapshot){
                var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                document.getElementById('uploader').value = percentage;
            },
            function error(err){

            },
            function complete() {

            }
        );
        
    }

    return (
        <div>
            <input data-testid="btnUpload" type="file" id="fileButton" onChange={fileChangeEvent} />
            <progress value="0" max="100" id="uploader">0%</progress> <br />
        </div>
    )
}
