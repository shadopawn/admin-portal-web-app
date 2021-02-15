import React from 'react'
import VideoPairSelection from './VideoPairSelection'
import CallPairSelection from './CallPairSelection'
import '../css/LessonPair.css';

export default function LessonPair({index, lessonPair, rerender, render}) {

    const handleSelection = (lessonPairIndex, additionType) => {
        console.log("Lesson Pair " + lessonPairIndex);
        console.log("Addition Type " + additionType);
        rerender(!render)
    }
    
    return (
        <div>
            <dt className="lessonPairName">
                <h2>{lessonPair.name}</h2>
                <button className="standardButton" onClick={() => setshowNameModal(true)}>Edit Name</button>
                <button className="standardRedButton" onClick={() => deletePair(index)} data-testid="btnDeletePair">Delete</button>                
            </dt>
            <div className="lessonPairSections">
                <VideoPairSelection index={index} videoType="call" handleSelection={handleSelection} lessonPair={lessonPair}></VideoPairSelection>
                <VideoPairSelection index={index} videoType="analysis" handleSelection={handleSelection} lessonPair={lessonPair}></VideoPairSelection>
            </div>
            
            <CallPairSelection index={index} callType="false_call0" handleSelection={handleSelection} lessonPair={lessonPair}></CallPairSelection>
            <CallPairSelection index={index} callType="false_call1" handleSelection={handleSelection} lessonPair={lessonPair}></CallPairSelection>
            <CallPairSelection index={index} callType="true_call" handleSelection={handleSelection} lessonPair={lessonPair}></CallPairSelection>

            <NameChangeModal show={showNameModal} hide={setshowNameModal} changeName={changeName} index={index}></NameChangeModal>
        </div>
    )
}