import React, {createContext, useState} from 'react'

export const LessonDataContext = createContext();

function LessonContextProvider(props) {

    const [lessonData, setLessonData] = useState([
        {
            name: "Example Lesson Pack Name",
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
        }
    ]);

    return (
        <LessonDataContext.Provider value={{lessonData : lessonData, setLessonData: setLessonData}}>
            {props.children}
        </LessonDataContext.Provider>
    )
}

export default LessonContextProvider;