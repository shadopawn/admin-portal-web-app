import React, {createContext, useState, useEffect} from 'react'
import firebase from 'firebase'

export const LessonDataContext = createContext();

function LessonContextProvider(props) {

    const [lessonData, setLessonData] = useState([
        {
            name: "Example Lesson Pack Name",
            lessonPairs: [
                {
                    callVideo: "Random Example url 1",
                    analysisVideo: "analysisVideoURL"
                },
                {
                    callVideo: "andom Example url 2",
                    analysisVideo: "analysisVideoURL"
                },
                {
                    callVideo: "andom Example url 3",
                    analysisVideo: "analysisVideoURL"
                }
            ]
        },
        {
            name: "Example Lesson Pack 2",
            lessonPairs: [
                {
                    callVideo: "callVideoURL",
                    analysisVideo: "analysisVideoURL"
                },
                {
                    callVideo: "callVideoURL",
                    analysisVideo: "analysisVideoURL"
                }
            ]
        },
        {
            name: "Football Lesson Pack",
            lessonPairs: [
                {
                    callVideo: "callVideoURL",
                    analysisVideo: "analysisVideoURL"
                }
            ]
        }
    ]);

    // const createLessonList = () => {
    //     firebase.database().ref('/lesson_packs/').once('value').then((snapshot) => {
    //         var lessons = snapshot.val()
    //         setLessonData([lessons])
    //         console.log(lessons)
            
    //     });
    // }

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
            firebase.database().ref('lesson_packs/' + lessonPack.name + '/lesson_pair' + i.toString()).update({
                call_video:lessonPack.lessonPairs[i]["callVideo"],
                analysis_video:lessonPack.lessonPairs[i]["analysisVideo"]
            })
        }
    }

    // useEffect(() => {
    //     createLessonList();
    // }, []);

    return (
        <LessonDataContext.Provider value={{ lessonData, setLessonData, currentLessonPack, setCurrentLessonPack, setVideoFileName, uploadCurrentLesson}}>
            {props.children}
        </LessonDataContext.Provider>
    )
}

export default LessonContextProvider;