import React from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import store from '../store';
import Game from './Game';

function Home() {
  return (
    <Provider store={store}> 
      <Game /> 
    </Provider>
  );
}

function About() {
  return <h2>About</h2>;
}

function Logout() {
  return <h2>Logout</h2>;
}

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/logout">Logout</Link>
            </li>
          </ul>

          <hr />
          <div className="main-route-place">
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/logout" component={Logout} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
