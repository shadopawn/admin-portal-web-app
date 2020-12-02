import React, { useState } from 'react'
import LessonPackItem from './LessonPackItem'

import '../css/LessonPacks.css';


export default function LessonPacks() {

    const [packNames, setPackNames] = useState(["Lesson Pack Name", "Pack 2", "Pack 3"])

    function handleRemove(name) {
        const newList = packNames.filter((packName) => packName !== name);
        setPackNames(newList);
    }

    const lessonPackList = packNames.map((name) =>
        <LessonPackItem packName={name} deleteItem={() => handleRemove(name)}/>
    );

    return (
        <div>
            <h1 className="lessonPackHeading">Lesson Packs</h1>
            <div className="lessonPacks">
                <button className="createButton">Create Lesson Pack</button>
                <table>
                    {lessonPackList}
                </table>
            </div>
        </div>
    )
}
