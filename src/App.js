import { Link, Route, Switch, Redirect } from 'react-router-dom';
import firebase from 'firebase';
import LessonEditor from "./components/LessonEditor";
import Analytics from "./components/Analytics";
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import Home from './components/Home';
import NavBar from './components/NavBar';

import './css/App.css';

function App() {

	const LogoutEventListen = () =>{
	firebase.auth().signOut();
	window.location.href="/admin-portal-web-app";
	}
  
	return (
		<div className="App">

			{/*
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
			*/}
			
			<NavBar />
			
			<Switch>
				<PrivateRoute path="/lesson-editor">
					<LessonEditor />
				</PrivateRoute>

				<PrivateRoute path="/analytics">
					<Analytics />
				</PrivateRoute>

				<Route path="/login" component={Login}></Route>
				<Route path="/admin-portal-web-app" component={Home}></Route>
				<Route exact path="/">
					<Redirect to="/admin-portal-web-app" />
				</Route>
			</Switch>
		</div>
	);
}

export default App;
