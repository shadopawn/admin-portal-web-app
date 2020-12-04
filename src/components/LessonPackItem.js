import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { LessonDataContext } from '../contexts/LessonDataContext'
import firebase from 'firebase'


export default function LessonPackItem({lessonPack, deleteItem}) {
    let history = useHistory();

    const { setCurrentLessonPack, uploadCurrentLesson } = useContext(LessonDataContext)

    const redirect = () => {
        setCurrentLessonPack(lessonPack)
        history.push('/lesson-creation')
    }

    const publishPack = () => {
        uploadCurrentLesson(lessonPack)
    }

    return (
        <tr>
            <td className="packName">{lessonPack.name}</td>
            <td>
                <button onClick={redirect} className="tableButton editButton">Edit</button>
            </td>
            <td>
                <button onClick={publishPack} className="tableButton publishButton">Publish</button>
            </td>
            <td>
                <button className="tableButton deleteButton" onClick={() => deleteItem(lessonPack.name)} >Delete</button>
            </td>
        </tr>
    )
}
