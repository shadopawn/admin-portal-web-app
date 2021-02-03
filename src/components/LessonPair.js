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
            <dt className="lessonPairName"><h3>Lesson Pair {index + 1}</h3></dt>
                <VideoPairSelection index={index} videoType="call" handleSelection={handleSelection} lessonPair={lessonPair}></VideoPairSelection>
                <VideoPairSelection index={index} videoType="analysis" handleSelection={handleSelection} lessonPair={lessonPair}></VideoPairSelection>
                
                <CallPairSelection index={index} callType="false_call0" handleSelection={handleSelection} lessonPair={lessonPair}></CallPairSelection>
                <CallPairSelection index={index} callType="false_call1" handleSelection={handleSelection} lessonPair={lessonPair}></CallPairSelection>
                <CallPairSelection index={index} callType="true_call" handleSelection={handleSelection} lessonPair={lessonPair}></CallPairSelection>
        </div>
    )
}