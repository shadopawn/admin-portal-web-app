import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom';
import { LessonDataContext } from '../contexts/LessonDataContext'


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
                <button onClick={redirect} className="tableButton editButton" data-testid="btnEditPack">Edit</button>
            </td>
            <td>
                <button onClick={publishPack} className="tableButton publishButton" data-testid="btnPublishPack">Publish</button>
            </td>
            <td>
                <button className="tableButton deleteButton" onClick={() => deleteItem(lessonPack.name)} data-testid="btnPackDelete" >Delete</button>
            </td>
        </tr>
    )
}
