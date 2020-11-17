import React from 'react'
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div data-testid="home">
            <h1>Welcome to the Admin Portal</h1>
            <div className="linkContainer">
                
                <Link to="/lesson-editor">
                    <div className="linkChoice">
                        <h2>Lessons page </h2>
                    </div>
                </Link>

                <Link to="/analytics">
                    <div className="linkChoice">
                        <h2>Analytics page </h2>
                    </div>
                </Link>
                
            </div>
        </div>
    )
}
