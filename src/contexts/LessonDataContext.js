import React, {createContext, useState, useEffect, useReducer} from 'react'
import firebase from 'firebase'

export const LessonDataContext = createContext();

function LessonContextProvider(props) {

    const [lessonData, setLessonData] = useState([]);
    const [currentLessonPack, setCurrentLessonPack] = useState();
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

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
        setEditedForPack(currentLessonPack, true)
    }

    const setCallText = (lessonPairIndex, callType, callText) => {
        lessonData.forEach(lessonPack => {
            if(lessonPack === currentLessonPack)
                lessonPack.lessonPairs[lessonPairIndex].calls[callType] = callText
        })
        setLessonData(lessonData)
        currentLessonPack.lessonPairs[lessonPairIndex].calls[callType] = callText
        setCurrentLessonPack(currentLessonPack)
        setEditedForPack(currentLessonPack, true)
    }

    const setNameText = (nameText) => {
        lessonData.forEach(lessonPack => {
            if(lessonPack === currentLessonPack)
                lessonPack.name = nameText
        })
        setLessonData(lessonData)
        currentLessonPack.name = nameText
        setCurrentLessonPack(currentLessonPack)
        setEditedForPack(currentLessonPack, true)
    }

    const setPairNameText = (pairNameText, index) => {
        lessonData.forEach(lessonPack => {
            if(lessonPack === currentLessonPack) {
                lessonPack.lessonPairs[index]["name"] = pairNameText
            }
        })
        setLessonData(lessonData)
        currentLessonPack.lessonPairs[index]["name"] = pairNameText
        setCurrentLessonPack(currentLessonPack)
        setEditedForPack(currentLessonPack, true)
    }

    const addNewLessonPair = () => {
        currentLessonPack["lessonPairs"].push({
            call_video: "Placeholder",
            call_url: "Placeholder",
            analysis_video: "Placeholder",
            analysis_url: "Placeholder",
            name:"Placeholder",
            calls: {
                "false_call0":"Placeholder",
                "false_call1":"Placeholder",
                "true_call":"Placeholder"
            }
        })
        setEditedForPack(currentLessonPack, true)
    }

    const uploadCurrentLesson = (lessonPack) => {
        if (checkLessonForPlaceholders(lessonPack)) {
            alert('This lesson pack has placeholders and is not complete')
        }
        else {
            publishCurrentLesson(lessonPack);
        }
    }

    const checkLessonForPlaceholders = (lessonPack) => {
        var placeholder = false
        lessonPack["lessonPairs"].forEach(lessonPair => {
            if (lessonPair["call_video"] === "Placeholder" || lessonPair["analysis_video"] === "Placeholder" || lessonPair["name"] === "Placeholder") {
                placeholder = true
            } else if (lessonPair["calls"]["false_call0"] === "Placeholder" || lessonPair["calls"]["false_call1"] === "Placeholder" || lessonPair["calls"]["true_call"] === "Placeholder") {
                placeholder = true
            }
        })
        return placeholder
    }

    const publishCurrentLesson = (lessonPack) => {
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
        setEditedForPack(lessonPack, false)       
    }

    const updateLessonPairs = (lessonPack, firebaseLength) => {
        for(let i = 0; i < lessonPack.lessonPairs.length; i++){
            firebase.database().ref('lesson_packs/lesson_pack' + lessonPack.index + '/lesson_pairs/lesson_pair' + i.toString()).update({
                call_video:lessonPack.lessonPairs[i]["call_video"],
                analysis_video:lessonPack.lessonPairs[i]["analysis_video"],
                call_url:lessonPack.lessonPairs[i]["call_url"],
                analysis_url:lessonPack.lessonPairs[i]["analysis_url"],
                name:lessonPack.lessonPairs[i]["name"]
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

    const setEditedForPack = (lessonPack, edited) => {
        lessonPack.edited = edited;
        console.log(ignored)
        forceUpdate();
    }

    useEffect(() => {
        createLessonList();
    }, []);

    return (
        <LessonDataContext.Provider value={{ lessonData, setLessonData, currentLessonPack, setCurrentLessonPack, setVideoLessonData, uploadCurrentLesson, setCallText, setNameText, addNewLessonPair, deleteLessonData, setEditedForPack, setPairNameText }}>
            {props.children}
        </LessonDataContext.Provider>
    )
}

export default LessonContextProvider;