import React, { useContext,  useState } from 'react'
import { LessonDataContext } from '../contexts/LessonDataContext'
import LessonPair from './LessonPair'
import '../css/LessonTree.css';

export default function LessonTree() {

    const { currentLessonPack, setNameText } = useContext(LessonDataContext)
    const [rerender, setrerender] = useState(false)

    const deleteLessonPair = (lessonPairIndex) => {
        currentLessonPack["lessonPairs"].splice(lessonPairIndex, 1)
        setrerender(!rerender)
    }

    const changeName = () => {
        const name = document.getElementById("nameChange").value;
        setNameText(name)
        setrerender(!rerender)
    }

    const addLessonPair = () => {
        currentLessonPack["lessonPairs"].push({
            call_video: "Paceholder",
            analysis_video: "Placeholder"
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
            <button className="standardButton" onClick={changeName}>Edit Name</button>
			<button className="standardButton" onClick={addLessonPair}>Add lesson Pair</button>
            <dl>
                {lessonPairComponentList}
            </dl>
            <input id="nameChange"></input>
        </div>
    )
}
