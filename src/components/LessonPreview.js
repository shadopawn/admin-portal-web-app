import React, {useState} from 'react'
import LessonPair from './LessonPair'

export default function LessonPreview({index, lessonPair}) {
    const [rerender, setrerender] = useState(false)

    return (
        <div>
            <LessonPair index={index} lessonPair={lessonPair} render={rerender} rerender={setrerender}></LessonPair>
        </div>
    )
}
