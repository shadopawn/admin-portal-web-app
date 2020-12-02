import React, { useState, useEffect } from 'react'
import LessonPair from './LessonPair';
import firebase from 'firebase';

export default function LessonCreationTool() {

    const [lessonTree, setlessonTree] = useState([])
    const [uploadStatus, setuploadStatus] = useState(false)

    const getLessonTree = () => {
        setlessonTree([])
        setuploadStatus(true)
    }

    const upload = () => {
        const lessonName = document.getElementById("lessonName").value;
        for(let i = 0; i < lessonTree.length; i++){
            firebase.database().ref('lesson_packs/' + lessonName + '/lesson_pair' + i.toString()).update({
                call_video:lessonTree[i][0],
                analysis_video:lessonTree[i][1]
            })
        }
    }
    
    useEffect(() => {
        if(lessonTree.length !== 0){
            upload();
        }
    }, [lessonTree]);

    return (
        <div>
            <p>Lesson Creation</p>
            <input type="text" id='lessonName' placeholder="Lesson name"></input>
            <LessonPair changeLessontree={setlessonTree} upload={uploadStatus} tree={lessonTree} up={setuploadStatus} />
            <LessonPair changeLessontree={setlessonTree} upload={uploadStatus} tree={lessonTree} up={setuploadStatus} />
            <button onClick={getLessonTree}>Upload</button>
            <h1>{lessonTree}</h1>
        </div>
    )
}
