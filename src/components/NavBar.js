import React from 'react'

export default function RenameMe() {
    return (
        <div className="navBar">
			<Link to="/lesson-editor" className="link" data-testid="lessonLink">
				<h3>Lessons Editor</h3>
			</Link>

			<Link to="/analytics" className="link">
				<h3>Analytics Dashboard</h3>
			</Link>

			<Link to="/login" className="link" id="loginLink">
				<h3>Login Page</h3>
			</Link>

			<button id="btnLogout" className="hide logout" onClick={LogoutEventListen}>
				Log out
			</button>
		</div>
    )
}