import React, { useState } from 'react'
import LessonPair from './LessonPair';

export default function LessonCreationTool() { 
    
    return (
        <div>
            <p>Lesson Creation</p>
            <LessonPair videoType="Call" />
            <LessonPair videoType="Analysis" />
        </div>
    )
}
