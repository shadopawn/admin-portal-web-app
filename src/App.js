import { Link, Route, Switch, Redirect } from 'react-router-dom';
import firebase from 'firebase';

import LessonEditor from "./components/LessonEditor";
import Analytics from "./components/Analytics";
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import Home from './components/Home';

import './css/App.css';

function App() {

  const LogoutEventListen = () =>{
    firebase.auth().signOut();
    window.location.reload(false);
  }
  
  return (
    <div className="App">

      {/* We should make this a nav component */}
      <div className="navBar">
        <Link to="/lesson-editor" className="link">
          <h3>Lessons Editor</h3>
        </Link>

        <Link to="/analytics" className="link">
          <h3>Analytics Dashboard</h3>
        </Link>

        <Link to="/login" className="link">
          <h3>Log in window</h3>
        </Link>

        <button id="btnLogout" className="hide logout" onClick={LogoutEventListen}>
          Log out
        </button>
      </div>
      
      <Switch>
        <PrivateRoute path="/lesson-editor">
          <LessonEditor />
        </PrivateRoute>

        <PrivateRoute path="/analytics">
          <Analytics />
        </PrivateRoute>

        <Route path="/login" component={Login}></Route>
        <Route path="/home" component={Home}></Route>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
