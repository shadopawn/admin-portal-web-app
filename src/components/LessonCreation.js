import React from 'react'
import LessonContextProvider from '../contexts/LessonDataContext'
import LessonTree from './LessonTree'

export default function LessonCreation() {
    return (
        <LessonContextProvider>
            <LessonTree />
        </LessonContextProvider>
    )
}
