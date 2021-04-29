import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.jsx';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/"  exact render={({history, location, match}) => (<App match={match} history={history} location={location}/>)} />
      <Route path="/:pid"  render={({history, location, match}) => (<App match={match} history={history} location={location}/>)} />
    </Switch>
  </Router>
, document.getElementById("app"));