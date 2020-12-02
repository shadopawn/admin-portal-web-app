import React, { useState } from 'react'
import LessonPackItem from './LessonPackItem'

export default function LessonPacksList() {

    const [packNames, setPackNames] = useState(["Lesson Pack Name", "Pack 2", "Pack 3"])

    function handleRemove(name) {
        const newList = packNames.filter((packName) => packName !== name);
        setPackNames(newList);
    }

    const lessonPackList = packNames.map((name, index) =>
        <LessonPackItem key={index} packName={name} deleteItem={() => handleRemove(name)}/>
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
