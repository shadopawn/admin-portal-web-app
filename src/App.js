import { Route, Switch, Redirect } from 'react-router-dom';
import Analytics from "./components/Analytics";
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import Home from './components/Home';
import NavBar from './components/NavBar';

import './css/App.css';
import LessonPacks from './components/LessonPacks';
import LessonCreation from './components/LessonCreation';
import LessonContextProvider from './contexts/LessonDataContext';
import VideoUploader from './components/VideoUploader';

function App() {
  
	return (
		<div className="App">
			
			<NavBar />

			<Switch>
				<PrivateRoute path="/analytics">
					<Analytics />
				</PrivateRoute>
				
				<Route path="/login" component={Login}></Route>
				<Route path="/admin-portal-web-app" component={Home}></Route>
				<Route exact path="/">
					<Redirect to="/admin-portal-web-app" />
				</Route>
			</Switch>
			
			<LessonContextProvider>
				<Switch>
					<PrivateRoute path="/lesson-packs">
						<LessonPacks />
					</PrivateRoute>
					<PrivateRoute path="/lesson-creation">
						<LessonCreation />
					</PrivateRoute>
					<PrivateRoute path="/video-uploader">
						<VideoUploader />
					</PrivateRoute>				
				</Switch>
			</LessonContextProvider>
		</div>
	);
}

export default App;
