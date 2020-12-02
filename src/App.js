import { Route, Switch, Redirect } from 'react-router-dom';
import Analytics from "./components/Analytics";
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import Home from './components/Home';
import NavBar from './components/NavBar';
import LessonCreationTool from './components/LessonCreationTool';

import './css/App.css';
import LessonPacks from './components/LessonPacks';
import LessonCreation from './components/LessonCreation';

function App() {
  
	return (
		<div className="App">
			
			<NavBar />
			
			<Switch>
				<PrivateRoute path="/lesson-packs">
					<LessonPacks />
				</PrivateRoute>

				<PrivateRoute path="/analytics">
					<Analytics />
				</PrivateRoute>

				<Route path="/lesson-packs" component={LessonPacks}></Route>
				
				<Route path="/lesson-creation" component={LessonCreation}></Route>

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
