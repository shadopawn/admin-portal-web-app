import React, { useState } from 'react'
import LessonPackItem from './LessonPackItem'

export default function LessonPacks() {

    const [packNames, setPackNames] = useState(["Pack 1", "Pack 2", "Pack 3"])

    function handleRemove(name) {
        const newList = packNames.filter((packName) => packName !== name);
        setPackNames(newList);
    }

    const lessonPackList = packNames.map((name) =>
        <LessonPackItem packName={name} deleteItem={() => handleRemove(name)}/>
    );

    return (
        <div>
            <h3>Lesson Packs</h3>
            <button>Create Lesson Pack</button>
            <table>
                {lessonPackList}
            </table>
        </div>
    )
}
