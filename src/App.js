import './App.css';
import { Link, Route, Switch } from 'react-router-dom';

import Lessons from "./components/Lessons"
import Analytics from "./components/Analytics"
import Login from './components/Login';

function App() {
  return (
    <div className="App">

      <Link to="/lessons">
        <a>Takes you to Lessons page </a><br />
      </Link>

      <Link to="/login">
        <a>Takes you to Log in page</a>
      </Link>

      {/* This will switch to different React components while keeping us in this component. If you run this, you'll notice the Links will stay in the window */}
      {/* This will help us keep a header if we need one or if we don't want anything to persist we could put this in index */}
      <Switch>
        <Route path='/lessons' component={Lessons} />
        <Route path='/analytics' component={Analytics} />
        <Route path="/login" component={Login}></Route>
      </Switch>
    </div>
  );
}

export default App;
