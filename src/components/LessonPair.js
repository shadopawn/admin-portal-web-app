import React, { useState, useEffect } from 'react'
import VideoSelectionTool from './VideoSelectionTool';

export default function LessonPair({index, lessonPair}) {
    
    return (
        <div>
            <dt>Lesson Pair {index} <button>Delete</button></dt>
                <dd>{lessonPair.callVideo}</dd>
                <dd>analysisVideo</dd>
        </div>
    )
}