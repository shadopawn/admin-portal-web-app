import React, { useContext, useEffect } from 'react'
import { LessonDataContext } from '../contexts/LessonDataContext'

export default function LessonTree() {

    const { lessonData } = useContext(LessonDataContext)
    
    useEffect(() => {
        console.log("Hello Was up")
        console.log(lessonData)
    }, [])

    return (
        <div>
            <h2>{lessonData[0].name}</h2>
			<button>Add lesson Pair</button>
            <dl>
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
