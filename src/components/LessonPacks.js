import React from 'react'

import '../css/LessonPacks.css';
import LessonPacksList from './LessonPacksList';


export default function LessonPacks() {

    return (
        <div>
            <h1 className="lessonPackHeading">Lesson Packs</h1>
            <LessonPacksList />
        </div>
    )
}
