/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import { Game, Login, Register } from './components';
import PrivateRoute from './helper/PrivateRoute';

function About() {
  return <h2>About</h2>;
}

function Logout() {
  Cookies.remove('access_token');
  return <Redirect to="/login" />;
}

class App extends React.Component {
  render() {
    let sttHeader = '';
    if (this.props.authed === false) {
      sttHeader = 'hide';
    }
    return (
      <div>
        <Router>
          <ul className={sttHeader}>
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
            <PrivateRoute path="/" component={Game} />
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

const mapStateToProps = (state) => ({
  authed: state.auth.authed,
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(App);