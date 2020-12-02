import React from 'react'
import LessonContextProvider from '../contexts/LessonDataContext';

import '../css/LessonPacks.css';
import LessonPacksList from './LessonPacksList';


export default function LessonPacks() {

    return (
        <LessonContextProvider>
            <h1 className="lessonPackHeading">Lesson Packs</h1>
            <LessonPacksList />
        </LessonContextProvider>
    )
}
