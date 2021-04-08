import React from 'react'
import { Link } from 'react-router-dom';
import '../css/home.css'

export default function Home() {
    return (
        <div data-testid="home">
            <h1>Welcome to the Admin Portal</h1>
            <div className="linkContainer">
                
                <Link to="/lesson-packs" data-testid="lessonLink">
                    <div className="linkChoice">
                        <h2>Lessons Editor</h2>
                        <img src='https://github.com/shadopawn/admin-portal-web-app/blob/master/public/lessons.png?raw=true' alt='editor'></img>
                    </div>
                </Link>

                <a href="https://analytics.cloud.unity3d.com/projects/" target="_blank" data-testid="analyticsLink">
                    <div className="linkChoice">
                        <h2>Analytics Dashboard</h2>
                        <img src='https://github.com/shadopawn/admin-portal-web-app/blob/master/public/analytics.png?raw=true' alt='graph'></img>
                    </div>
                </a>
                
            </div>
        </div>
    )
}
