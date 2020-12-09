import React from 'react'
import { Link } from 'react-router-dom';
import '../css/home.css'

export default function Home() {
    return (
        <div data-testid="home">
            <h1>Welcome to the Admin Portal</h1>
            <div className="linkContainer">
                
                <Link to="/lesson-packs" data-testid="lessonLink">
                    <div className="linkChoice" data-testid="linkLesson">
                        <h2>Lessons Editor</h2>
                        <img src='https://github.com/shadopawn/admin-portal-web-app/blob/master/public/lessons.png?raw=true'></img>
                    </div>
                </Link>

                <Link to="/analytics" data-testid="analyticsLink">
                    <div className="linkChoice">
                        <h2>Analytics Dashboard</h2>
                        <img src='https://github.com/shadopawn/admin-portal-web-app/blob/master/public/analytics.png?raw=true'></img>
                    </div>
                </Link>
                
            </div>
        </div>
    )
}
