import React, {useState} from 'react'
import LessonPair from './LessonPair'

export default function LessonPreview({index, lessonPair, deletePair}) {
    const [rerender, setrerender] = useState(false)

    return (
        <div>
            <LessonPair index={index} lessonPair={lessonPair} render={rerender} rerender={setrerender} deletePair={deletePair}></LessonPair>
        </div>
    )
}
