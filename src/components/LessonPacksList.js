import React, { useContext, useState } from 'react'
import LessonPackItem from './LessonPackItem'
import { LessonDataContext } from '../contexts/LessonDataContext'

export default function LessonPacksList() {

    const { lessonData, setLessonData, deleteLessonData } = useContext(LessonDataContext)
    const [rerender, setrerender] = useState(false)
    
    const handleRemove = (name, index) => {
        let choice = window.confirm("Are you sure you want to delete " + name)
        if(choice){
            deleteLessonData(index)
            const newList = lessonData.filter((lessonPack) => lessonPack.name !== name);
            setLessonData(newList);
        }
    }

    const createLessonPack = () => {
        lessonData.push({name:"No name", lessonPairs:[], calls:{}, index:lessonData.length})
        setrerender(!rerender)
    }

    let lessonPackList = lessonData.map((lessonPack, index) =>
        <LessonPackItem key={index} lessonPack={lessonPack} deleteItem={() => handleRemove(lessonPack.name, lessonPack.index)} />
    );

    return (
        <div className="lessonPacks">
            <button className="createButton" onClick={createLessonPack} >Create Lesson Pack</button>
            <table>
                <tbody>
                    {lessonPackList}
                </tbody>
            </table>
        </div>
    )
}
