import './App.css';
import { Link, Route, Switch } from 'react-router-dom';

import Database from "./components/Database"
import Analytics from "./components/Analytics"

function App() {
  return (
    <div className="App">

      <Link to="/database">
        <a>Takes you to Data page </a><br />
      </Link>

      <Link to="/analytics">
        <a>Takes you to Analytics page</a>
      </Link>

      {/* This will switch to different React components while keeping us in this component. If you run this, you'll notice the Links will stay in the window */}
      {/* This will help us keep a header if we need one or if we don't want anything to persist we could put this in index */}
      <Switch>
        <Route path='/database' component={Database} />
        <Route path='/analytics' component={Analytics} />
      </Switch>
    </div>
  );
}

export default App;
