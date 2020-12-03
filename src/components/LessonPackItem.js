import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom';
import { LessonDataContext } from '../contexts/LessonDataContext'


export default function LessonPackItem({lessonPack, deleteItem}) {
    let history = useHistory();

    const { setCurrentLessonPack } = useContext(LessonDataContext)

    const redirect = () => {
        setCurrentLessonPack(lessonPack)
        history.push('/lesson-creation')
    }

    return (
        <tr>
            <td className="packName">{lessonPack.name}</td>
            <td>
                <button onClick={redirect} className="tableButton editButton">Edit</button>
            </td>
            <td>
                <button className="tableButton publishButton">Publish</button>
            </td>
            <td>
                <button className="tableButton deleteButton" onClick={() => deleteItem(lessonPack.name)} >Delete</button>
            </td>
        </tr>
    )
}
