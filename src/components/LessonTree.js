import { render } from '@testing-library/react'
import React, { useContext,  useState } from 'react'
import { LessonDataContext } from '../contexts/LessonDataContext'
import LessonPair from './LessonPair'

export default function LessonTree() {

    const { currentLessonPack, setCurrentLessonPack } = useContext(LessonDataContext)
    const [rerender, setrerender] = useState(false)

    const deleteLessonPair = (lessonPairIndex) => {
        //setcurrentLessonPack(currentLessonPack)
        const a = currentLessonPack["lessonPairs"].splice(lessonPairIndex, 1)
        console.log(currentLessonPack)
        setrerender(!rerender)
    }

    const addLessonPair = () => {
        currentLessonPack["lessonPairs"].push({
            callVideo: "Paceholder",
            analysisVideo: "Placeholder"
        })
        lessonPairComponentList = currentLessonPack.lessonPairs.map((lessonPair, index) =>
            <LessonPair key={index} index={index} lessonPair={lessonPair} rerender={setrerender} render={rerender} deletePair={deleteLessonPair} />
        );
        setrerender(!rerender)
    }
    
    let lessonPairComponentList = [];
    let packName = "No Lesson Pack Selected"
    if (currentLessonPack){
        lessonPairComponentList = currentLessonPack.lessonPairs.map((lessonPair, index) =>
            <LessonPair key={index} index={index} lessonPair={lessonPair} rerender={setrerender} render={rerender} deletePair={deleteLessonPair} />
        );
        packName = currentLessonPack.name
    }

    return (
        <div style={{textAlign:"left"}}>
            <h3>{packName}</h3>
			<button className="standardButton" onClick={addLessonPair}>Add lesson Pair</button>
            <dl>
                {lessonPairComponentList}
            </dl>
        </div>
    )
}
