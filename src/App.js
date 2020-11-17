import { Link, Route, Switch } from 'react-router-dom';
import firebase from 'firebase';

import Lessons from "./components/Lessons"
import Analytics from "./components/Analytics"
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';

import './App.css';

function App() {

  const LogoutEventListen = () =>{
    firebase.auth().signOut();
  }

  return (
    <div className="App">

      <Link to="/lessons">
        <a>Takes you to Lessons page </a><br />
      </Link>

      <Link to="/login">
        <a>Takes you to Log in page</a>
      </Link>

      <button id="btnLogout" className="hide" onClick={LogoutEventListen}>
        Log out
      </button>

      
      <Switch>
        <PrivateRoute path="/lessons">
          <Lessons />
        </PrivateRoute>
        <Route path='/analytics' component={Analytics} />
        <Route path="/login" component={Login}></Route>
      </Switch>
    </div>
  );
}

export default App;
