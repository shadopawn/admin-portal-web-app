import { Route, Switch, Redirect } from 'react-router-dom';
import LessonEditor from "./components/LessonEditor";
import Analytics from "./components/Analytics";
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import Home from './components/Home';
import NavBar from './components/NavBar';

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
