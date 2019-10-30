/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Game, Login, Logout, Register, Header,
} from './components';
import PrivateRoute from './helper/PrivateRoute';
import * as actions from './actions';

function About() {
  return <h2>About</h2>;
}

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Router>
          <hr />
          <div className="main-route-place">
            <PrivateRoute exact path="/" component={Game} />
            <Route path="/about" component={About} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/register" component={Register} />
            {/* <PrivateRoute path="/info" component={Info} /> */}
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
  onLogout: () => dispatch(actions.logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
