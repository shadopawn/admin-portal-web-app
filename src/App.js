import './App.css';
import { Link, Route, Switch } from 'react-router-dom';

import LessonEditor from "./components/LessonEditor";
import Analytics from "./components/Analytics";
import Login from './components/Login';

function App() {
  return (
    <div className="App">

      <Link to="/lesson-editor">
        <p>Takes you to Lessons page </p>
      </Link>

      <Link to="/login">
        <p>Takes you to Log in page</p>
      </Link>

      {/* This will switch to different React components while keeping us in this component. If you run this, you'll notice the Links will stay in the window */}
      {/* This will help us keep a header if we need one or if we don't want anything to persist we could put this in index */}
      <Switch>
        <Route path='/lesson-editor' component={LessonEditor} />
        <Route path='/analytics' component={Analytics} />
        <Route path="/login" component={Login}></Route>
      </Switch>
    </div>
  );
}

export default App;
