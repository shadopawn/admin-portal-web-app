import React, { useContext,  useState } from 'react'
import { Redirect } from 'react-router-dom';
import { LessonDataContext } from '../contexts/LessonDataContext'
import LessonPair from './LessonPair'
import NameChangeModal from './NameChangeModal'
import '../css/LessonTree.css';

export default function LessonTree() {

    const { currentLessonPack, setNameText, uploadCurrentLesson } = useContext(LessonDataContext)
    const [rerender, setrerender] = useState(false)
    const [showNameModal, setshowNameModal] = useState(false)

    const publishPack = () => {
        uploadCurrentLesson(currentLessonPack)
    }

    const deleteLessonPair = (lessonPairIndex) => {
        currentLessonPack["lessonPairs"].splice(lessonPairIndex, 1)
        setrerender(!rerender)
    }

    const changeName = () => {
        const name = document.getElementById("nameChangeInput").value;
        setNameText(name)
        setshowNameModal(false)
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
    }else {
        return <Redirect to="/lesson-packs" />
    }

    return (
        <div style={{textAlign:"left"}}>
            <h3 data-testid="packName">{packName}</h3>
            <button className="standardButton" onClick={() => setshowNameModal(true)}>Edit Name</button>
			<button className="standardPurpleButton" onClick={addLessonPair} data-testid="btnAddPair">Add Lesson Pair</button>
            <button className="standardPurpleButton" onClick={publishPack}>Publish</button>
            <dl>
                {lessonPairComponentList}
            </dl>
            <NameChangeModal show={showNameModal} hide={setshowNameModal} changeName={changeName}></NameChangeModal>
        </div>
    )
}
