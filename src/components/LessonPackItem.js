import React from 'react'

export default function LessonPackItem({packName, deleteItem}) {
    return (
        <tr>
            <td className="packName">{packName}</td>
            <td>
                <button className="tableButton editButton">Edit</button>
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
