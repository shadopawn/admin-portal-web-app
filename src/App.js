import { Route, Switch, Redirect } from 'react-router-dom';
import LessonEditor from "./components/LessonEditor";
import Analytics from "./components/Analytics";
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import Home from './components/Home';
import NavBar from './components/NavBar';
import LessonCreationTool from './components/LessonCreationTool';

import './css/App.css';

function App() {
  
	return (
		<div className="App">
			
			<NavBar />
			
			<Switch>
				<PrivateRoute path="/lesson-editor">
					<LessonEditor />
				</PrivateRoute>

				<PrivateRoute path="/analytics">
					<Analytics />
				</PrivateRoute>

				<Route path="/lesson-creation" component={LessonCreationTool}></Route>

				<Route path="/login" component={Login}></Route>
				<Route path="/admin-portal-web-app" component={Home}></Route>
				<Route exact path="/">
					<Redirect to="/admin-portal-web-app" />
				</Route>
			</Switch>

			<video
				controls
				width="250"
				src="https://firebasestorage.googleapis.com/v0/b/admin-portal-firebase.appspot.com/o/training_videos%2Ftest.mp4?alt=media&token=2f9a77ee-5a68-455b-8440-acc47550a8bd">

      		</video>
		</div>
	);
}

export default App;
