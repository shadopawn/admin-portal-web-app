import React from 'react'
import { Link } from 'react-router-dom';
import '../css/home.css'

export default function Home() {
    return (
        <div data-testid="home">
            <h1>Welcome to the Admin Portal</h1>
            <div className="linkContainer">
                
                <Link to="/lesson-editor" data-testid="lessonLink">
                    <div className="linkChoice">
                        <h2>Lessons Editor</h2>
                        <img src='../../lessons.png'></img>
                    </div>
                </Link>

                <Link to="/analytics">
                    <div className="linkChoice">
                        <h2>Analytics Dashboard</h2>
                        <img src='../../analytics.png'></img>
                    </div>
                </Link>
                
            </div>
        </div>
    )
}
