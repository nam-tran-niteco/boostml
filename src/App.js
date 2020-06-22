import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './containers/dashboard';
import Detail from './containers/detail';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h1>Images Library</h1>
        <Router>
          <Switch>
            <Route exact path="/" component={Dashboard}></Route>
            <Route path="/detail/:id" component={Detail}></Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
