import { Link, Route, Switch, Redirect } from 'react-router-dom';
import firebase from 'firebase';

import LessonEditor from "./components/LessonEditor";
import Analytics from "./components/Analytics";
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import Home from './components/Home';

import './App.css';

function App() {

  const LogoutEventListen = () =>{
    firebase.auth().signOut();
    window.location.reload(false);
  }

  return (
    <div className="App">


      <Link to="/lesson-editor">
        <p>Takes you to Lessons page </p>
      </Link>

      <Link to="/analytics">
        <p>Takes you to Analytics page </p>
      </Link>

      <Link to="/login">
        <p>Takes you to Log in page</p>
      </Link>

      <button id="btnLogout" className="hide" onClick={LogoutEventListen}>
        Log out
      </button>

      
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
