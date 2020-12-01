import React, { useState } from 'react'
import LessonPair from './LessonPair';

export default function LessonCreationTool() {

    const [lessonTree, setlessonTree] = useState([])
    
    return (
        <div>
            <p>Lesson Creation</p>
            <LessonPair changeLessontree={setlessonTree} />
            {lessonTree}
        </div>
    )
}
