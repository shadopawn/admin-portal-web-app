import React, {createContext, useState, useEffect} from 'react'
import firebase from 'firebase'

export const LessonDataContext = createContext();

function LessonContextProvider(props) {

    const [lessonData, setLessonData] = useState([]);
    const [currentLessonPack, setCurrentLessonPack] = useState();

    const createLessonList = () => {
        let lessonList = []
        firebase.database().ref('/lesson_packs/').once('value').then((snapshot) => {
            snapshot.forEach(lesson => {
                let lessonPairList = []
                lesson.child("lesson_pairs").forEach(lessonPair => {
                    lessonPairList.push(lessonPair.val())
                })
                let tempLesson = {name:lesson.child("name").val(), lessonPairs:lessonPairList, index:lesson.child("index").val(), edited:false}
                lessonList.push(tempLesson)
            })
            console.log(lessonList)
            setLessonData(lessonList)  
        });
    }

    const setVideoLessonData = (lessonPairIndex, videoType, videoName, videoUrl) => {
        lessonData.forEach(lessonPack => {
            if(lessonPack === currentLessonPack){
                lessonPack.lessonPairs[lessonPairIndex][videoType + "_video"] = videoName
                lessonPack.lessonPairs[lessonPairIndex][videoType + "_url"] = videoUrl
            }
        })
        setLessonData(lessonData)
        currentLessonPack.lessonPairs[lessonPairIndex][videoType + "_video"] = videoName
        currentLessonPack.lessonPairs[lessonPairIndex][videoType + "_url"] = videoUrl
        setCurrentLessonPack(currentLessonPack)
        setEditedForPack(currentLessonPack)
    }

    const setCallText = (lessonPairIndex, callType, callText) => {
        lessonData.forEach(lessonPack => {
            if(lessonPack === currentLessonPack)
                lessonPack.lessonPairs[lessonPairIndex].calls[callType] = callText
        })
        setLessonData(lessonData)
        currentLessonPack.lessonPairs[lessonPairIndex].calls[callType] = callText
        setCurrentLessonPack(currentLessonPack)
        setEditedForPack(currentLessonPack)
    }

    const setNameText = (nameText) => {
        lessonData.forEach(lessonPack => {
            if(lessonPack === currentLessonPack)
                lessonPack.name = nameText
        })
        setLessonData(lessonData)
        currentLessonPack.name = nameText
        setCurrentLessonPack(currentLessonPack)
        setEditedForPack(currentLessonPack)
    }

    const addNewLessonPair = () => {
        currentLessonPack["lessonPairs"].push({
            call_video: "Paceholder",
            call_url: "Placeholder",
            analysis_video: "Placeholder",
            analysis_url: "Placeholder",
            calls: {
                "false_call0":"Placeholder",
                "false_call1":"Placeholder",
                "true_call":"Placeholder"
            }
        })
        setEditedForPack(currentLessonPack)
    }

    const uploadCurrentLesson = (lessonPack) => {
        firebase.database().ref('lesson_packs/lesson_pack' + lessonPack.index + '/lesson_pairs/').once('value').then((snapshot) => {
            var firebaseLength = 0
            snapshot.forEach(lesson => { firebaseLength = firebaseLength + 1 })
            updateLessonPairs(lessonPack, firebaseLength)

            firebase.database().ref('lesson_packs/lesson_pack' + lessonPack.index).update({
                name:lessonPack.name
            })
            firebase.database().ref('lesson_packs/lesson_pack' + lessonPack.index).update({
                index:lessonPack.index
            })
        })        
    }

    const updateLessonPairs = (lessonPack, firebaseLength) => {
        for(let i = 0; i < lessonPack.lessonPairs.length; i++){
            firebase.database().ref('lesson_packs/lesson_pack' + lessonPack.index + '/lesson_pairs/lesson_pair' + i.toString()).update({
                call_video:lessonPack.lessonPairs[i]["call_video"],
                analysis_video:lessonPack.lessonPairs[i]["analysis_video"],
                call_url:lessonPack.lessonPairs[i]["call_url"],
                analysis_url:lessonPack.lessonPairs[i]["analysis_url"],
                
            })
            firebase.database().ref('lesson_packs/lesson_pack' + lessonPack.index + '/lesson_pairs/lesson_pair' + i.toString() + "/calls").update({
                false_call0:lessonPack.lessonPairs[i].calls["false_call0"],
                false_call1:lessonPack.lessonPairs[i].calls["false_call1"],
                true_call:lessonPack.lessonPairs[i].calls["true_call"],
            })
        }
        if(firebaseLength > lessonPack.lessonPairs.length){
            for(let i = lessonPack.lessonPairs.length; i < firebaseLength; i++){
                firebase.database().ref('lesson_packs/lesson_pack' + lessonPack.index + '/lesson_pairs/lesson_pair' + i.toString()).remove()
            }
        }
    }

    const deleteLessonData = (lessonPackIndex) => {
        firebase.database().ref('lesson_packs/lesson_pack' + lessonPackIndex).remove()
    }

    const setEditedForPack = (lessonPack) => {
        lessonPack.edited = true;
    }

    useEffect(() => {
        createLessonList();
    }, []);

    return (
        <LessonDataContext.Provider value={{ lessonData, setLessonData, currentLessonPack, setCurrentLessonPack, setVideoLessonData, uploadCurrentLesson, setCallText, setNameText, addNewLessonPair, deleteLessonData, setEditedForPack }}>
            {props.children}
        </LessonDataContext.Provider>
    )
}

export default LessonContextProvider;