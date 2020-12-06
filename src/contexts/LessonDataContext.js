import React, {createContext, useState, useEffect} from 'react'
import firebase from 'firebase'

export const LessonDataContext = createContext();

function LessonContextProvider(props) {

    const [lessonData, setLessonData] = useState([]);

    const createLessonList = () => {
        let lessonList = []
        firebase.database().ref('/lesson_packs/').once('value').then((snapshot) => {
            snapshot.forEach(lesson => {
                let lessonPairList = []
                lesson.child("lesson_pairs").forEach(lessonPair => {
                    lessonPairList.push(lessonPair.val())
                })
                let tempLesson = {name:lesson.key, lessonPairs:lessonPairList}
                lessonList.push(tempLesson)
            })
            setLessonData(lessonList)
            
        });
    }

    const [currentLessonPack, setCurrentLessonPack] = useState()

    const setVideoFileName = (lessonPairIndex, videoType, videoName) => {
        lessonData.forEach(lessonPack => {
            if(lessonPack === currentLessonPack){
                lessonPack.lessonPairs[lessonPairIndex][videoType] = videoName
                console.log(lessonPack.lessonPairs[lessonPairIndex][videoType])
            }
        })

        currentLessonPack.lessonPairs[lessonPairIndex][videoType] = videoName
        setLessonData(lessonData)
        setCurrentLessonPack(currentLessonPack)
    }

    const uploadCurrentLesson = (lessonPack) => {
        console.log(lessonPack)
        for(let i = 0; i < lessonPack.lessonPairs.length; i++){
            firebase.database().ref('lesson_packs/' + lessonPack.name + '/lesson_pairs/lesson_pair' + i.toString()).update({
                call_video:lessonPack.lessonPairs[i]["call_video"],
                analysis_video:lessonPack.lessonPairs[i]["analysis_video"]
            })
        }
    }

    useEffect(() => {
        createLessonList();
    }, []);

    return (
        <LessonDataContext.Provider value={{ lessonData, setLessonData, currentLessonPack, setCurrentLessonPack, setVideoFileName, uploadCurrentLesson}}>
            {props.children}
        </LessonDataContext.Provider>
    )
}

export default LessonContextProvider;