import React from 'react'
import { Link, useHistory } from 'react-router-dom';
import '../css/LessonPacks.css';
import LessonPacksList from './LessonPacksList';


export default function LessonPacks() {
    const history = useHistory();

    const redirectToUploadPage = () => {
        history.push("video-uploader")
    }

    return (
        <div>
            <h1 className="lessonPackHeading">Lesson Packs</h1>
            <LessonPacksList />
            <br></br>
            <button className="standardButton" onClick={redirectToUploadPage}>Upload videos</button>
        </div>
    )
}
