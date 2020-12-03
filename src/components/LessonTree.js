import React, { useContext, useEffect } from 'react'
import { LessonDataContext } from '../contexts/LessonDataContext'
import LessonPair from './LessonPair'

export default function LessonTree() {

    const { lessonData, currentLessonPack } = useContext(LessonDataContext)
    
    let lessonPairComponentList = [];
    let packName = "No Lesson Pack Selected"
    if (currentLessonPack){
        lessonPairComponentList = currentLessonPack.lessonPairs.map((lessonPair, index) =>
            <LessonPair key={index} index={index} lessonPair={lessonPair} />
        );
        packName = currentLessonPack.name
    }

    return (
        <div style={{textAlign:"left"}}>
            <h3>{packName}</h3>
			<button>Add lesson Pair</button>
            <dl>
                {lessonPairComponentList}
            </dl>
        </div>
    )
}
