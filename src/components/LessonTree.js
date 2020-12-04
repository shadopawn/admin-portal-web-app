import React, { useContext, useEffect,  useState } from 'react'
import { LessonDataContext } from '../contexts/LessonDataContext'
import LessonPair from './LessonPair'

export default function LessonTree() {

    const { currentLessonPack } = useContext(LessonDataContext)
    const [rerender, setrerender] = useState(false)
    
    let lessonPairComponentList = [];
    let packName = "No Lesson Pack Selected"
    if (currentLessonPack){
        lessonPairComponentList = currentLessonPack.lessonPairs.map((lessonPair, index) =>
            <LessonPair key={index} index={index} lessonPair={lessonPair} rerender={setrerender} render={rerender} />
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
