import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import './App.css';
import Navigation from './components/Navigation';
import TaskList from './components/tasklist';
import EditTask from './components/listEdit';
import CreateList from './components/listCreate';

class App extends Component {
  render() { 
    return (
      <Router>
        <div>
          <Navigation />
          <div className="container">
            <Route path="/" exact component={TaskList} />
            <Route path="/edit/:id" component={EditTask} />
            <Route path="/create" component={CreateList} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
