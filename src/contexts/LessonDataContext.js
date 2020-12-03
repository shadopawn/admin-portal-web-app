import React, {createContext, useState} from 'react'

export const LessonDataContext = createContext();

function LessonContextProvider(props) {

    const [lessonData, setLessonData] = useState([
        {
            name: "Example Lesson Pack Name",
            lessonPairs: [
                {
                    callVideo: "Random Example url",
                    analysisVideo: "analysisVideoURL"
                },
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

    const [currentLessonPack, setCurrentLessonPack] = useState()

    return (
        <LessonDataContext.Provider value={{ lessonData, setLessonData, currentLessonPack, setCurrentLessonPack}}>
            {props.children}
        </LessonDataContext.Provider>
    )
}

export default LessonContextProvider;