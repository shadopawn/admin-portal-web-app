import React from 'react'
import firebase from 'firebase';

export default function LessonEditor() {

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
            <h1>Lesson Editor Page</h1>
            <progress value="0" max="100" id="uploader">0%</progress> <br />
            <input data-testid="upload" type="file" id="fileButton" onChange={fileChangeEvent}/>
        </div>
    )
}
