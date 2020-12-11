import React, {createContext, useState, useEffect} from 'react'
import firebase from 'firebase'

export const LessonDataContext = createContext();

function LessonContextProvider(props) {

    const [lessonData, setLessonData] = useState([]);
    const [currentLessonPack, setCurrentLessonPack] = useState()

    const createLessonList = () => {
        let lessonList = []
        firebase.database().ref('/lesson_packs/').once('value').then((snapshot) => {
            snapshot.forEach(lesson => {
                let lessonPairList = []
                lesson.child("lesson_pairs").forEach(lessonPair => {
                    console.log(lessonPair.child("calls").val())
                    lessonPairList.push(lessonPair.val())
                })
                let tempLesson = {name:lesson.child("name").val(), lessonPairs:lessonPairList, index:lesson.child("index").val()}
                lessonList.push(tempLesson)
            })
            setLessonData(lessonList)  
        });
    }

    const setVideoFileName = (lessonPairIndex, videoType, videoName) => {
        lessonData.forEach(lessonPack => {
            if(lessonPack === currentLessonPack){
                lessonPack.lessonPairs[lessonPairIndex][videoType] = videoName
            }
        })
        setLessonData(lessonData)
        
        currentLessonPack.lessonPairs[lessonPairIndex][videoType] = videoName
        setCurrentLessonPack(currentLessonPack)
    }

    const setCallText = (lessonPairIndex, callType, callText) => {
        lessonData.forEach(lessonPack => {
            if(lessonPack === currentLessonPack)
                lessonPack.lessonPairs[lessonPairIndex].calls[callType] = callText
        })
        setLessonData(lessonData)

        currentLessonPack.lessonPairs[lessonPairIndex].calls[callType] = callText
        setCurrentLessonPack(currentLessonPack)
    }

    const setNameText = (nameText) => {
        lessonData.forEach(lessonPack => {
            if(lessonPack === currentLessonPack)
                lessonPack.name = nameText
        })
        setLessonData(lessonData)

        currentLessonPack.name = nameText
        setCurrentLessonPack(currentLessonPack)
    }

    const addNewLessonPair = () => {
        currentLessonPack["lessonPairs"].push({
            call_video: "Paceholder",
            analysis_video: "Placeholder",
            calls: {
                "false_call0":"Placeholder",
                "false_call1":"Placeholder",
                "true_call":"Placeholder"
            }
        })
    }

    const uploadCurrentLesson = (lessonPack) => {
        for(let i = 0; i < lessonPack.lessonPairs.length; i++){
            firebase.database().ref('lesson_packs/lesson_pack' + lessonPack.index + '/lesson_pairs/lesson_pair' + i.toString()).update({
                call_video:lessonPack.lessonPairs[i]["call_video"],
                analysis_video:lessonPack.lessonPairs[i]["analysis_video"],
                
            })
            firebase.database().ref('lesson_packs/lesson_pack' + lessonPack.index + '/lesson_pairs/lesson_pair' + i.toString() + "/calls").update({
                false_call0:lessonPack.lessonPairs[i].calls["false_call0"],
                false_call1:lessonPack.lessonPairs[i].calls["false_call1"],
                true_call:lessonPack.lessonPairs[i].calls["true_call"],
                
            })
        }

        firebase.database().ref('lesson_packs/lesson_pack' + lessonPack.index).update({
            name:lessonPack.name
        })
        firebase.database().ref('lesson_packs/lesson_pack' + lessonPack.index).update({
            index:lessonPack.index
        })
    }

    useEffect(() => {
        createLessonList();
    }, []);

    return (
        <LessonDataContext.Provider value={{ lessonData, setLessonData, currentLessonPack, setCurrentLessonPack, setVideoFileName, uploadCurrentLesson, setCallText, setNameText, addNewLessonPair}}>
            {props.children}
        </LessonDataContext.Provider>
    )
}

export default LessonContextProvider;