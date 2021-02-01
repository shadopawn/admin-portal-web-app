import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom';
import { LessonDataContext } from '../contexts/LessonDataContext'


export default function LessonPackItem({lessonPack, deleteItem}) {

    let history = useHistory();
    const { setCurrentLessonPack, uploadCurrentLesson } = useContext(LessonDataContext)

    const redirectToCreation = () => {
        setCurrentLessonPack(lessonPack)
        history.push('/lesson-creation')
    }

    return (
        <tr>
            <td className="packNameList">{lessonPack.name}</td>
            <td>
                <button onClick={redirectToCreation} className="tableButton editButton" data-testid="btnEditPack">Edit</button>
            </td>
            <td>
                <button onClick={() => uploadCurrentLesson(lessonPack)} className="tableButton publishButton" data-testid="btnPublishPack">Publish</button>
            </td>
            <td>
                <button className="tableButton deleteButton" onClick={() => deleteItem(lessonPack.name, lessonPack.index)} data-testid="btnPackDelete" >Delete</button>
            </td>
        </tr>
    )
}
