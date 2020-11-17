import { Link, Route, Switch } from 'react-router-dom';
import firebase from 'firebase';

import LessonEditor from "./components/LessonEditor";
import Analytics from "./components/Analytics";
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';

import './App.css';

function App() {

  const LogoutEventListen = () =>{
    firebase.auth().signOut();
  }

  return (
    <div className="App">


      <Link to="/lesson-editor">
        <p>Takes you to Lessons page </p>
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

        <Route path='/analytics' component={Analytics} />
        <Route path="/login" component={Login}></Route>
      </Switch>
    </div>
  );
}

export default App;
