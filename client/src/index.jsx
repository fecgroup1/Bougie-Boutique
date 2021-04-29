import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.jsx';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/"  exact>
        {({history, location, match}) => (<App match={match} history={history} location={location}/>)}
      </Route>
      <Route path="/:pid">
        {({history, location, match}) => (<App match={match} history={history} location={location}/>)}
      </Route>
    </Switch>
  </Router>
, document.getElementById("app"));