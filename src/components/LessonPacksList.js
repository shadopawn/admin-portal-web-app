import React, { useContext, useState } from 'react'
import LessonPackItem from './LessonPackItem'
import { LessonDataContext } from '../contexts/LessonDataContext'

export default function LessonPacksList() {

    const { lessonData, setLessonData } = useContext(LessonDataContext)
    const [rerender, setrerender] = useState(false)

    const handleRemove = (name) => {
        let choice = window.confirm("Are you sure you want to delete " + name)
        if(choice){
            const newList = lessonData.filter((lessonPack) => lessonPack.name !== name);
            setLessonData(newList);
        }
    }

    const createLessonPack = () => {
        lessonData.push({name:"No name", lessonPairs:[], calls:{}})
        setrerender(!rerender)
    }

    let lessonPackList = lessonData.map((lessonPack, index) =>
        <LessonPackItem key={index} lessonPack={lessonPack} deleteItem={() => handleRemove(lessonPack.name)} />
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
