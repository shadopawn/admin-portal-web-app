import React from 'react'

export default function LessonPackItem({packName, deleteItem}) {
    return (
        <tr>
            <td>{packName}</td>
            <td><button>Edit</button></td>
            <td><button>Publish</button></td>
            <td><button onClick={() => deleteItem(packName)} >Delete</button></td>
        </tr>
    )
}
