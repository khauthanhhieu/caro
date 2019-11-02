/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import * as actions from '../actions';

class Logout extends React.Component {
  constructor(props) {
    super(props);
    Cookies.remove('access-token');
    localStorage.removeItem('user');
    this.props.onLogout();
  }

  render() {
    return <Redirect to="/login" />;
  }
}

const mapStateToProps = (state) => ({
  authed: state.auth.authed,
});

const mapDispatchToProps = (dispatch) => ({
  onLogout: () => dispatch(actions.logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
