import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './containers/Home/Home';
import SignIn from './containers/SignIn/SignIn';
import SignUp from './containers/SignUp/SignUp';
import PrivateRoute from './components/HOC/PrivateRoute';

function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route exact path='/signIn' component={SignIn} />
          <Route exact path='/signUp' component={SignUp} />
          <PrivateRoute exact path='/' component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
