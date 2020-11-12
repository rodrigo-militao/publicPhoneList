import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import AdminPage from './pages/AdminPage';
import HomePage from './pages/HomePage';
import UpdatePerson from './pages/UpdatePerson';
import CreatePerson from './pages/CreatePerson';
import './index.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ HomePage } />
        <Route path="/admin" component={ AdminPage } />
        <Route path="/new" component={ CreatePerson } />
        <Route path="/edit/:id" component={ UpdatePerson } />
        <Route path="/delete/:id" component={ UpdatePerson } />
      </Switch>
    </Router>
  );
}

export default App;
