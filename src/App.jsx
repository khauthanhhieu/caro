/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';
import store from './store';
import { Game, Login, Register } from './components';

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
      <div>
        <Router>
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
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/register" component={Register} />
          </div>
        </Router>
        <hr />
        <footer className="footer py-3 bg-dark text-white">
          <div className="container">
            <div className="col-sm">
              <h4>Đồ án giữa kì Web</h4>
              <p>1612197 - Khâu Thanh Hiếu</p>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
