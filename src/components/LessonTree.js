import React, { useContext, useEffect } from 'react'
import { LessonDataContext } from '../contexts/LessonDataContext'

export default function LessonTree() {

    const { lessonData, currentLessonPack } = useContext(LessonDataContext)
    
    useEffect(() => {
        console.log("Hello")
        console.log(lessonData)
    }, [])

    return (
        <div style={{textAlign:"left"}}>
            <h3>{currentLessonPack}</h3>
			<button>Add lesson Pair</button>
            <dl >
                <dt>Lesson Pair 0 <button>Delete</button></dt>
					<dd>callVideo</dd>
					<dd>analysisVideo</dd>
                <dt>Lesson Pair 1 <button>Delete</button></dt>
					<dd>callVideo</dd>
					<dd>analysisVideo</dd>
            </dl>
        </div>
    )
}
