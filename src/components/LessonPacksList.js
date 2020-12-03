import React, { useContext } from 'react'
import LessonPackItem from './LessonPackItem'
import { LessonDataContext } from '../contexts/LessonDataContext'

export default function LessonPacksList() {

    const { lessonData, setLessonData } = useContext(LessonDataContext)

    function handleRemove(name) {
        let choice = window.confirm("Are you sure you want to delete " + name)
        if(choice){
            const newList = lessonData.filter((lessonPack) => lessonPack.name !== name);
            setLessonData(newList);
        }
    }

    const lessonPackList = lessonData.map((lessonPack, index) =>
        <LessonPackItem key={index} packName={lessonPack.name} deleteItem={() => handleRemove(lessonPack.name)}/>
    );

    return (
        <div className="lessonPacks">
            <button className="createButton">Create Lesson Pack</button>
            <table>
                <tbody>
                    {lessonPackList}
                </tbody>
            </table>
        </div>
    )
}
