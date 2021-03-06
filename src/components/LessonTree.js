import React, { useContext,  useState } from 'react'
import { Redirect } from 'react-router-dom';
import { LessonDataContext } from '../contexts/LessonDataContext'
import NameChangeModal from './NameChangeModal'
import LessonPreview from './LessonPreview'
import LessonPairSelector from './LessonPairSelector'

export default function LessonTree() {

    const { currentLessonPack, setNameText, addNewLessonPair, uploadCurrentLesson, setEditedForPack } = useContext(LessonDataContext)
    const [rerender, setrerender] = useState(false)
    const [showNameModal, setshowNameModal] = useState(false)
    const [lessonPreview, setlessonPreview] = useState([])
    const [highlightedPair, sethighlightedPair] = useState(null)

    const publishPack = () => {
        uploadCurrentLesson(currentLessonPack)
    }

    const deleteLessonPairIndex = (lessonPairIndex) => {
        const displayIndex = lessonPairIndex + 1
        let choice = window.confirm("Are you sure you want to delete Lesson Pair " + displayIndex)
        if(choice){
            currentLessonPack["lessonPairs"].splice(lessonPairIndex, 1)
            setEditedForPack(currentLessonPack, true)
            setlessonPreview([])
            setrerender(!rerender)
        }
    }

    const changeName = () => {
        const name = document.getElementById("nameChangeInput-1").value;
        setNameText(name)
        setshowNameModal(false)
        setrerender(!rerender)
    }

    const displayLessonPair = (index) => {
        const currentLessonPair = currentLessonPack["lessonPairs"][index]
        sethighlightedPair(index)
        setlessonPreview(<LessonPreview index={index} lessonPair={currentLessonPair} deletePair={deleteLessonPairIndex}></LessonPreview>)
    }

    const addLessonPair = () => {
        addNewLessonPair();
        lessonPairComponentList = currentLessonPack.lessonPairs.map((lessonPair, index) =>
            <LessonPairSelector key={index} index={index} lessonPair={lessonPair} display={displayLessonPair} highlightedPair={highlightedPair} />
        );
        setrerender(!rerender)
    }
    
    let lessonPairComponentList = [];
    if (currentLessonPack){
        lessonPairComponentList = currentLessonPack.lessonPairs.map((lessonPair, index) =>
            <LessonPairSelector key={index} index={index} lessonPair={lessonPair} display={displayLessonPair} highlightedPair={highlightedPair} />
        );
    }else {
        return <Redirect to="/lesson-packs" />
    }

    return (
        <div className='lessonCreation'>
            <h3 data-testid="packName" className='packName'>{currentLessonPack.edited ? currentLessonPack.name + "*" : currentLessonPack.name}</h3>
            <div className='packButtons'>
                <button className="standardButton" onClick={() => setshowNameModal(true)}>Edit Name</button>
                <button className="standardPurpleButton" onClick={addLessonPair} data-testid="btnAddPair">Add Lesson Pair</button>
                <button className="standardPurpleButton" onClick={publishPack}>Publish</button>
            </div>
            
            <div className='lessonPackView'>
                <dl className='lessonPackListView'>
                    {lessonPairComponentList}
                </dl>

                <div className='lessonView'>
                    {lessonPreview}
                </div>
            </div>

            <NameChangeModal show={showNameModal} hide={setshowNameModal} changeName={changeName} index={-1} maxLength={20}></NameChangeModal>
        </div>
    )
}
