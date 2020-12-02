import React from 'react'
import { useHistory } from 'react-router-dom';

export default function LessonPackItem({packName, deleteItem}) {
    let history = useHistory();

    const redirect = () => {
      history.push('/lesson-creation')
    }

    return (
        <tr>
            <td className="packName">{packName}</td>
            <td>
                <button onClick={redirect} className="tableButton editButton">Edit</button>
            </td>
            <td>
                <button className="tableButton publishButton">Publish</button>
            </td>
            <td>
                <button className="tableButton deleteButton" onClick={() => deleteItem(packName)} >Delete</button>
            </td>
        </tr>
    )
}
