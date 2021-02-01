import React, { useContext,  useState } from 'react'
import { Redirect } from 'react-router-dom';
import { LessonDataContext } from '../contexts/LessonDataContext'
import NameChangeModal from './NameChangeModal'
import LessonPreview from './LessonPreview'
import LessonPairSelector from './LessonPairSelector'

export default function LessonTree() {

    const { currentLessonPack, setNameText, addNewLessonPair, uploadCurrentLesson } = useContext(LessonDataContext)
    const [rerender, setrerender] = useState(false)
    const [showNameModal, setshowNameModal] = useState(false)
    const [lessonPreview, setlessonPreview] = useState([])

    const publishPack = () => {
        uploadCurrentLesson(currentLessonPack)
    }

    const deleteLessonPairIndex = (lessonPairIndex) => {
        currentLessonPack["lessonPairs"].splice(lessonPairIndex, 1)
        setlessonPreview([])
        setrerender(!rerender)
    }

    const changeName = () => {
        const name = document.getElementById("nameChangeInput").value;
        setNameText(name)
        setshowNameModal(false)
        setrerender(!rerender)
    }

    const displayLessonPair = (index) => {
        const currentLessonPair = currentLessonPack["lessonPairs"][index]
        setlessonPreview(<LessonPreview index={index} lessonPair={currentLessonPair}></LessonPreview>)
    }

    const addLessonPair = () => {
        addNewLessonPair();
        lessonPairComponentList = currentLessonPack.lessonPairs.map((lessonPair, index) =>
            <LessonPairSelector key={index} index={index} lessonPair={lessonPair} deletePair={deleteLessonPairIndex} display={displayLessonPair} />
        );
        setrerender(!rerender)
    }
    
    let lessonPairComponentList = [];
    let packName = "No Lesson Pack Selected"
    if (currentLessonPack){
        lessonPairComponentList = currentLessonPack.lessonPairs.map((lessonPair, index) =>
            <LessonPairSelector key={index} index={index} lessonPair={lessonPair} deletePair={deleteLessonPairIndex} display={displayLessonPair} />
        );
        packName = currentLessonPack.name
    }else {
        return <Redirect to="/lesson-packs" />
    }

    return (
        <div className='lessonCreation'>
            <h3 data-testid="packName" className='packName'>{packName}</h3>
            <div className='packButtons'>
                <button className="standardButton" onClick={() => setshowNameModal(true)}>Edit Name</button>
                <button className="standardPurpleButton" onClick={addLessonPair} data-testid="btnAddPair">Add Lesson Pair</button>
                <button className="standardPurpleButton" onClick={publishPack}>Publish</button>
            </div>
            
            <div className='lessonPackView'>
                <dl>
                    {lessonPairComponentList}
                </dl>

                <div className='lessonView'>
                    {lessonPreview}
                </div>
            </div>

            <NameChangeModal show={showNameModal} hide={setshowNameModal} changeName={changeName}></NameChangeModal>
        </div>
    )
}
