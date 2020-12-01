import React from 'react'

export default function LessonPackItem({packName}) {
    return (
        <tr>
            <td>{packName}</td>
            <td><button>Edit</button></td>
            <td><button>Publish</button></td>
            <td><button>Delete</button></td>
        </tr>
    )
}
